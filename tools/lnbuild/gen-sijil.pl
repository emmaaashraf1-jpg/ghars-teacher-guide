#!/usr/bin/perl
# gen-sijil.pl — يبني «سجلّ ملاحظة الوحدة» لكلّ وحدة من محتوى لوحة pilaj في لقاءاتها.
# لا يخترع شيئًا: يقرأ عنوانَ اللقاء ومادّته ويومه، والمؤشّراتِ الأربعةَ ووصفَ مستوياتها كما وردت.
# الاستعمال: perl tools/lnbuild/gen-sijil.pl            (يقرأ lessons.txt من جذر المستودع)
# المخرَج: sijil-makhluq.html · sijil-layl-nahar.html · sijil-maskan.html · sijil-family.html
use strict; use warnings;
use utf8;                       # حروف المصدر العربية تُعامَل كنصٍّ يونيكود لا بايتات
use Encode qw(decode_utf8 encode_utf8);

# جذر المستودع = مجلّدان فوق هذا السكربت (tools/lnbuild/..)؛ لكنّنا نُشغَّل من الجذر عادةً.
my $root = ".";
open my $L, "<:raw", "$root/lessons.txt" or die "افتح lessons.txt: $!";
my @lessons = map { chomp; $_ } grep { /\S/ } <$L>; close $L;

# البادئة → (المُعرّف، الاسم الافتراضيّ إن غاب من العنوان)
my %UNIT = (
  am     => { slug=>"makhluq",    name=>"أنا مخلوق كرّمني الله" },
  ln     => { slug=>"layl-nahar", name=>"الليل والنهار" },
  mk     => { slug=>"maskan",     name=>"المسكن" },
  family => { slug=>"family",     name=>"العائلة" },
);
# ترتيب عرض المواد داخل الوحدة
my %MAT_ORDER = (kitabi=>1, allamni=>2, rasuli=>3, adab=>4, ohb=>5, lisani=>6, maharati=>7);

my $MID = " · ";   # فاصل مكوّنات العنوان
my @ORD = qw(الأول الثاني الثالث الرابع الخامس السادس السابع الثامن التاسع العاشر);
push @ORD, ("الحادي عشر","الثاني عشر","الثالث عشر","الرابع عشر","الخامس عشر");
my $ORDRE = join("|", map { quotemeta } @ORD);

my (%by_unit, @errors);
for my $file (@lessons) {
  my ($prefix, $mat, $num) = $file =~ /^(am|ln|mk|family)-(?:([a-z]+)-)?lesson(\d+)\.html$/;
  unless ($prefix) { push @errors, "اسمٌ غير متوقّع: $file"; next; }
  open my $F, "<:raw", "$root/$file" or do { push @errors, "تعذّر فتح $file"; next; };
  local $/; my $h = decode_utf8(scalar <$F>); close $F;

  # العنوان → مكوّناته
  my ($title) = $h =~ m{<title>(.*?)</title>}s;
  $title = "" unless defined $title;
  my @parts = split /\Q$MID\E/, $title;
  my $unit_name = @parts ? $parts[-1] : $UNIT{$prefix}{name};
  $unit_name =~ s/^\s*وحدة\s+//;
  my $subject = @parts >= 2 ? $parts[-2] : "";
  my $lesson_title = @parts >= 3 ? join($MID, @parts[0 .. $#parts-2]) : ($parts[0] // $file);

  # اليوم من c-meta
  my ($cmeta) = $h =~ m{c-meta"[^>]*>([^<]*)}s; $cmeta //= "";
  my $day = "";
  if ($cmeta =~ /اليوم\s*:?\s*($ORDRE)/) { $day = $1; }

  # المؤشّرات الأربعة + وصف المستويات (بطاقات .cg وحدها)
  my @cards;
  # الاسمُ والمصطلحُ نصٌّ بلا وسوم ([^<]*) كي لا يعبر تعبيرٌ كسولٌ بطاقاتٍ ليست من الحكم
  my $ci = qr{<div class="ci"><div class="term">([^<]*)</div><div class="def">(.*?)</div></div>};
  while ($h =~ m{<div class="card"><div class="lbl">([^<]*)</div><div class="cg">\s*$ci\s*$ci\s*$ci}gs) {
    push @cards, { lbl=>$1, levels=>[ [$2,$3],[$4,$5],[$6,$7] ] };
  }
  if (@cards != 4) { push @errors, "$file: عدد بطاقات الحكم = ".scalar(@cards)." (المتوقّع ٤)"; next; }

  push @{ $by_unit{$prefix} }, {
    file=>$file, mat=>($mat//"zz"), num=>$num,
    unit_name=>$unit_name, subject=>$subject, lesson_title=>$lesson_title,
    day=>$day, cards=>\@cards,
  };
}

sub esc { my $s = shift; $s //= ""; $s =~ s/&/&amp;/g; $s =~ s/</&lt;/g; $s =~ s/>/&gt;/g; $s =~ s/"/&quot;/g; return $s; }

for my $prefix (sort keys %by_unit) {
  my @ls = sort {
    ($MAT_ORDER{$a->{mat}}//50) <=> ($MAT_ORDER{$b->{mat}}//50)
      || $a->{num} <=> $b->{num}
      || $a->{file} cmp $b->{file}
  } @{ $by_unit{$prefix} };
  my $slug = $UNIT{$prefix}{slug};
  my $uname = $ls[0]{unit_name} || $UNIT{$prefix}{name};

  my @sheets;
  for my $l (@ls) {
    my @cards = @{ $l->{cards} };
    my @terms = map { $_->[0] } @{ $cards[0]{levels} };   # مبتدئ · نامٍ · متمكّن

    # رأس الجدول: صفّان — أسماء المؤشّرات، ثمّ المستويات الثلاثة تحت كلٍّ
    my $head1 = '<th class="cName" rowspan="2">الطفل</th>';
    $head1 .= join("", map { '<th colspan="3" class="ind">'.esc($_->{lbl}).'</th>' } @cards);
    $head1 .= '<th class="cNote" rowspan="2">ملاحظة</th>';
    my $head2 = join("", map { my @t=@{$_->{levels}}; join("", map { '<th class="lv">'.esc($_->[0]).'</th>' } @t) } @cards);

    my $body = "";
    for (1..16) {   # صفوفٌ تسع فصلًا؛ تُبقي الجدولَ والوصفَ معًا في صفحةٍ واحدة عند الطباعة
      $body .= '<tr><td class="cName"></td>'.('<td class="lv"></td>' x 12).'<td class="cNote"></td></tr>'."\n";
    }

    my $dayline = $l->{day} ? "اليوم: ".esc($l->{day}) : 'اليوم: __________';
    my $sheet = <<"HTML";
<section class="sheet">
  <header class="brandbar">
    <img class="blogo" src="brand/logo-ghars.webp" alt="نادي غرس القيم للطفولة"/>
    <div class="bmid"><div class="bclub">نادي غرس القيم للطفولة</div><div class="beyebrow">سجلّ ملاحظة الوحدة — $uname</div></div>
    <div class="bdate">التاريخ: ____ / ____ / ٢٠__ هـ</div>
  </header>
  <div class="shead">
    <h2 class="sh-title">@{[ esc($l->{lesson_title}) ]}</h2>
    <div class="sh-meta"><span>المادّة: @{[ esc($l->{subject}) ]}</span><span>$dayline</span></div>
  </div>
  <table class="obs">
    <thead><tr>$head1</tr><tr>$head2</tr></thead>
    <tbody>
$body    </tbody>
  </table>
  <div class="sh-foot">
    <div>سجلّ ملاحظة الوحدة — $uname</div>
    <div>يُملأ أثناء اللقاء أو بعده مباشرةً · يُرجَع إليه في تقرير ختام الوحدة</div>
  </div>
  <section class="levels">
    <h3>وصفُ المستويات</h3>
    <div class="lvgrid">
HTML
    for my $c (@cards) {
      $sheet .= '    <div class="lvblock"><div class="lvind">'.esc($c->{lbl}).'</div>'."\n";
      for my $pair (@{ $c->{levels} }) {
        $sheet .= '      <div class="lvrow"><span class="lvt">'.esc($pair->[0]).'</span><span class="lvd">'.esc($pair->[1]).'</span></div>'."\n";
      }
      $sheet .= '    </div>'."\n";
    }
    $sheet .= "    </div>\n  </section>\n</section>\n";
    push @sheets, $sheet;
  }

  my $count = scalar @sheets;
  my $sheets_html = join("\n", @sheets);
  my $out = <<"DOC";
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>سجلّ ملاحظة الوحدة · $uname · غرس القيم</title>
<style>
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Bold.woff2') format('woff2');font-weight:700;font-display:swap}
\@font-face{font-family:'Saudi';src:url('assets/fonts/Saudi-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
\@font-face{font-family:'Saudi';src:url('assets/fonts/Saudi-Bold.woff2') format('woff2');font-weight:700;font-display:swap}
:root{--t1:#17352d;--t2:#2C6A4D;--gold:#C79A3B;--ink:#1E2E29;--muted:#6C776F;--line:#D9D0BE;--cream:#F7F2E6;--head:#EAF1EC}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Saudi','Amiri','Noto Naskh Arabic',serif;color:var(--ink);background:#eef1ec;padding:16px;line-height:1.5}
.intro{max-width:1000px;margin:0 auto 14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 18px}
.intro h1{font-family:'AlAwwal',serif;font-size:22px;color:var(--t1);margin-bottom:4px}
.intro p{font-size:13.5px;color:var(--muted)}
.sheet{max-width:1180px;margin:0 auto 22px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px 18px 12px}
.brandbar{display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--gold);padding-bottom:8px;margin-bottom:8px}
.blogo{width:52px;height:52px;object-fit:contain;flex:none}
.bmid{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}
.bclub{font-family:'AlAwwal',serif;color:var(--t1);font-size:17px;font-weight:700;line-height:1.2}
.beyebrow{font-family:'Saudi','Amiri',serif;color:var(--t2);font-size:12.5px;font-weight:700}
.bdate{font-size:12px;color:var(--muted);white-space:nowrap;align-self:flex-start}
.shead{padding-bottom:6px;margin-bottom:10px}
.sh-title{font-family:'AlAwwal',serif;font-size:18px;color:var(--t1);margin:0 0 4px}
.sh-meta{display:flex;flex-wrap:wrap;gap:6px 22px;font-size:13px;color:var(--ink)}
table.obs{width:100%;border-collapse:collapse;table-layout:fixed}
table.obs th,table.obs td{border:1px solid var(--line);text-align:center;font-size:11.5px;padding:2px}
table.obs thead th{background:var(--head);color:var(--t1);font-weight:700}
th.ind{font-size:12px}
th.lv,td.lv{width:26px}
th.cName,td.cName{width:150px;text-align:right;padding-inline:8px}
th.cNote,td.cNote{width:150px}
table.obs tbody td{height:24px}
td.cName{background:#fcfaf4}
.sh-foot{margin-top:8px;font-size:12px;color:var(--muted);display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px;border-top:1px dashed var(--line);padding-top:6px}
.levels{margin-top:14px;background:var(--cream);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.levels h3{font-family:'AlAwwal',serif;font-size:15px;color:var(--t1);margin-bottom:10px}
.lvgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px}
.lvblock{background:#fff;border:1px solid var(--line);border-radius:8px;padding:9px 12px}
.lvind{font-weight:700;color:var(--t2);font-size:13.5px;margin-bottom:5px;padding-bottom:4px;border-bottom:1px solid var(--line)}
.lvrow{display:grid;grid-template-columns:64px 1fr;gap:8px;font-size:13px;margin-bottom:3px;align-items:baseline}
.lvt{color:var(--gold);font-weight:700}
.lvd{color:var(--ink);line-height:1.45}
\@media print{
  body{background:#fff;padding:0}
  .intro{display:none}
  .sheet{max-width:none;margin:0;border:0;border-radius:0;padding:5mm 6mm 4mm;break-after:page;page-break-after:always;break-inside:avoid}
  .sheet:last-child{break-after:auto;page-break-after:auto}
  .brandbar{-webkit-print-color-adjust:exact;print-color-adjust:exact;break-inside:avoid;padding-bottom:4px;margin-bottom:5px}
  .blogo{width:40px;height:40px}
  .bclub{font-size:15px}.beyebrow{font-size:11px}.bdate{font-size:10.5px}
  .shead{margin-bottom:5px}.sh-title{font-size:15px}.sh-meta{font-size:11px;gap:3px 16px}
  table.obs th,table.obs td{font-size:10px;padding:1px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  table.obs tbody td{height:20px}
  table.obs tr,table.obs thead{break-inside:avoid}
  .sh-foot{font-size:9.5px;margin:5px 0;padding-top:4px}
  .levels{margin-top:6px;background:#fff;padding:6px 8px;break-inside:avoid}
  .levels h3{font-size:11.5px;margin-bottom:4px}
  .lvgrid{gap:5px 14px}
  .lvblock{padding:5px 8px;break-inside:avoid}
  .lvind{font-size:11px;margin-bottom:3px;padding-bottom:2px}
  .lvrow{grid-template-columns:52px 1fr;font-size:9.5px;margin-bottom:1px}
}
\@page{size:A4 landscape;margin:8mm}
</style>
</head>
<body>
<div class="intro">
  <h1>سجلّ ملاحظة الوحدة — $uname</h1>
  <p>ورقةُ ملاحظةٍ لكلّ لقاء ($count لقاءً): تُفرَّغ فيها مستوياتُ المؤشّرات الأربعة (مبتدئ · نامٍ · متمكّن) لكلّ طفل. اطبعي الأوراقَ التي تحتاجينها على A4 أفقيّ. «وصفُ المستويات» أسفلَ كلّ ورقةٍ للشاشة فقط ولا يُطبع.</p>
</div>
$sheets_html
</body>
</html>
DOC

  open my $O, ">:raw", "$root/sijil-$slug.html" or die "كتابة sijil-$slug.html: $!";
  print $O encode_utf8($out); close $O;
  print encode_utf8("✓ sijil-$slug.html — $count ورقة ($uname)\n");
}

if (@errors) {
  print encode_utf8("\n⚠ ملاحظاتٌ للتقرير:\n");
  print encode_utf8("  · $_\n") for @errors;
}
