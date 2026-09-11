#!/usr/bin/perl
# gen-khizana.pl — يجمع روابطَ المطبوعات (*print*/*cards*) الموجودةَ فعلًا في صفحات الدليل،
# ويبني «خزانة المعلمة» khizanat-almuallima.html: مفهرسةً الوحدة ← المادّة ← اليوم، بتصفيةٍ فوريّة.
# لا يخترع اسمًا: اسمُ المورد = <title> ملفّه؛ ما لا عنوانَ له يُدرَج باسم ملفّه ويُسجَّل.
# الاستعمال:
#   perl tools/lnbuild/gen-khizana.pl            # يبني الخزانة
#   perl tools/lnbuild/gen-khizana.pl --diff     # لا يكتب؛ يقارن المجموعة الحاليّة بالمولّدة
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';
my $diff = (@ARGV && $ARGV[0] eq '--diff');

my %UP = (am=>['makhluq','أنا مخلوق كرّمني الله'], ln=>['layl-nahar','الليل والنهار'],
          mk=>['maskan','المسكن'], fam=>['family','العائلة'], family=>['family','العائلة']);
my %MAT = (kitabi=>'كتابي المنير', allamni=>'علّمني ربي', rasuli=>'قال رسولي', qal=>'قال رسولي',
           adab=>'أدب واقتداء', lisani=>'لساني عربي', maharati=>'مهاراتي', ohb=>'أحبك ربي', surah=>'كتابي المنير');
my @ORD = qw(الأول الثاني الثالث الرابع الخامس السادس السابع الثامن التاسع العاشر);
push @ORD, ('الحادي عشر','الثاني عشر','الثالث عشر','الرابع عشر');
my %ORDNUM; $ORDNUM{$ORD[$_]} = $_+1 for 0..$#ORD;
my $ORDRE = join('|', map { quotemeta } @ORD);

# 1) اجمع الأهداف ومصادرها من كلّ صفحة (عدا المطبوعات نفسها والخزانة)
my (%src, %ref);   # target => {sources=>{...}}
for my $page (glob '*.html') {
  next if $page =~ /(print|cards)/ || $page eq 'khizanat-almuallima.html';
  open my $f,'<:raw',$page or next; local $/; my $h=decode_utf8(scalar <$f>); close $f;
  while ($h =~ /href="([^"]*(?:print|cards)[^"]*\.html)"/g) {
    (my $t = $1) =~ s{.*/}{};
    next unless -e $t;
    $ref{$t}{sources}{$page} = 1;
  }
}
my @targets = sort keys %ref;

# 2) صفة كلّ مورد
my %R;
for my $t (@targets) {
  open my $f,'<:raw',$t or next; local $/; my $h=decode_utf8(scalar <$f>); close $f;
  my ($title) = $h =~ m{<title>(.*?)</title>}s; $title = $t unless defined $title && $title =~ /\S/;
  $title =~ s/^\s+|\s+$//g;
  my ($prefix) = $t =~ /^([a-z]+)-/;
  my ($uslug,$uname);
  if ($prefix && $UP{$prefix}) { ($uslug,$uname) = @{$UP{$prefix}}; }
  elsif ($title =~ /المسكن/) { ($uslug,$uname)=('maskan','المسكن'); }
  elsif ($title =~ /الليل|النهار/) { ($uslug,$uname)=('layl-nahar','الليل والنهار'); }
  elsif ($title =~ /العائلة/) { ($uslug,$uname)=('family','العائلة'); }
  elsif ($title =~ /مخلوق|النبأ|الانفطار/) { ($uslug,$uname)=('makhluq','أنا مخلوق كرّمني الله'); }
  else { ($uslug,$uname)=('zz','غير مصنّف'); }
  my $mat = 'موادّ عامّة';
  for my $k (keys %MAT) { if ($t =~ /\b$k\b/ || $t =~ /-$k-/ || $t =~ /^$k-/) { $mat=$MAT{$k}; last; } }
  if ($mat eq 'موادّ عامّة') { for my $k (keys %MAT){ if($title =~ /\Q$MAT{$k}\E/){ $mat=$MAT{$k}; last; } } }
  if ($mat eq 'موادّ عامّة' && $t =~ /-print-d\d/) { $mat='أوراق الأركان اليوميّة'; }
  my $day = '';
  if ($t =~ /-d(\d+)\b/) { $day = $1; }
  elsif ($title =~ /اليوم\s+($ORDRE)/) { $day = $ORDNUM{$1} // ''; }
  elsif ($t =~ /lesson(\d+)/) { $day = ''; }   # اللقاء يُعرَض بالعنوان لا كيومٍ مستقل
  my $type = ($t =~ /cards/) ? 'بطاقات' : 'طباعة';
  $R{$t} = { title=>$title, uslug=>$uslug, uname=>$uname, mat=>$mat, day=>$day, type=>$type };
}

# 3) وضع --diff: قارن مجموعةَ الأهداف بما في الخزانة الحاليّة
if ($diff) {
  my %cur;
  if (-e 'khizanat-almuallima.html') {
    open my $k,'<:raw','khizanat-almuallima.html'; local $/; my $h=decode_utf8(scalar<$k>); close $k;
    while ($h =~ /data-file="([^"]+)"/g) { $cur{$1}=1; }
  }
  my %want = map { $_=>1 } @targets;
  my @added   = grep { !$cur{$_} } sort keys %want;
  my @removed = grep { !$want{$_} } sort keys %cur;
  if (!@added && !@removed) { print "لا فروق: الخزانة مطابقةٌ للروابط الموجودة (".scalar(@targets)." موردًا).\n"; exit 0; }
  print "فروق:\n"; print "  + مورد جديد غير مُدرَج: $_\n" for @added; print "  - مورد في الخزانة بلا رابط: $_\n" for @removed;
  exit 1;
}

# 4) ابنِ الشجرة unit -> mat -> day
my %tree;
for my $t (@targets) { my $r=$R{$t}; push @{ $tree{$r->{uslug}}{$r->{mat}}{ $r->{day} ne '' ? "يوم $r->{day}" : 'عامّ' } }, $t; }
my %UORDER = (makhluq=>1, 'layl-nahar'=>2, maskan=>3, family=>4, zz=>9);

sub esc { my $s=shift; $s//=''; $s=~s/&/&amp;/g; $s=~s/</&lt;/g; $s=~s/>/&gt;/g; $s=~s/"/&quot;/g; $s }

my @unlabeled;
my $body = '';
for my $us (sort { ($UORDER{$a}//5)<=>($UORDER{$b}//5) } keys %tree) {
  my $uname = $R{ (grep { $R{$_}{uslug} eq $us } @targets)[0] }{uname};
  $body .= qq{<section class="unit"><h2 class="uh">$uname</h2>\n};
  for my $mat (sort keys %{$tree{$us}}) {
    $body .= qq{<div class="mat"><h3 class="mh">}.esc($mat).qq{</h3>\n};
    for my $day (sort { my($x)=$a=~/(\d+)/; my($y)=$b=~/(\d+)/; ($x//999)<=>($y//999) } keys %{$tree{$us}{$mat}}) {
      my @items = sort @{$tree{$us}{$mat}{$day}};
      my $files = join(',', @items);
      $body .= qq{<div class="day"><div class="dh"><span>$day</span>};
      $body .= qq{<button class="pall" data-files="$files">طباعة موادّ }.esc($day).qq{</button></div>\n};
      for my $t (@items) {
        my $r=$R{$t}; my $nm = esc($r->{title});
        push @unlabeled, $t if $r->{title} eq $t;
        my @s = sort keys %{ $ref{$t}{sources} };
        my $used = esc(join(' · ', map { s/\.html$//r } @s[0..($#s<3?$#s:2)])) . ($#s>2 ? ' …' : '');
        $body .= qq{<div class="res" data-file="$t" data-name="$nm"><span class="tp tp-$r->{type}">$r->{type}</span>}
              . qq{<span class="rn">$nm</span>}
              . qq{<span class="acts"><a href="$t" target="_blank" rel="noopener">فتح</a><a href="$t" target="_blank" rel="noopener" class="pr">طباعة</a></span>}
              . qq{<span class="used">مستعمَل في: $used</span></div>\n};
      }
      $body .= qq{</div>\n};
    }
    $body .= qq{</div>\n};
  }
  $body .= qq{</section>\n};
}

my $count = scalar @targets;
my $doc = <<"DOC";
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>خزانة المعلمة · مطبوعات غرس القيم</title>
<style>
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Bold.woff2') format('woff2');font-weight:700;font-display:swap}
\@font-face{font-family:'Saudi';src:url('assets/fonts/Saudi-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
:root{--t1:#17352d;--t2:#2C6A4D;--gold:#C79A3B;--ink:#1E2E29;--muted:#6C776F;--line:#D9D0BE;--cream:#F7F2E6;--head:#EAF1EC}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Saudi','Amiri',serif;color:var(--ink);background:#eef1ec;padding:18px;line-height:1.5}
.wrap{max-width:1000px;margin:0 auto}
.top{display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--gold);padding-bottom:10px;margin-bottom:12px}
.top img{width:52px;height:52px;object-fit:contain}
.top h1{font-family:'AlAwwal',serif;font-size:22px;color:var(--t1)}
.top p{font-size:13px;color:var(--muted)}
.searchbar{position:sticky;top:0;background:#eef1ec;padding:8px 0 10px;z-index:5}
#q{width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:12px;font:inherit;font-size:15px;background:#fff}
.unit{margin-bottom:18px}
.uh{font-family:'AlAwwal',serif;font-size:19px;color:#fff;background:var(--t2);border-radius:10px;padding:7px 14px;margin-bottom:8px}
.mat{margin:0 4px 12px}
.mh{font-family:'AlAwwal',serif;font-size:15.5px;color:var(--t1);border-inline-start:4px solid var(--gold);padding-inline-start:9px;margin:10px 0 6px}
.day{margin:0 4px 8px}
.dh{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;color:var(--muted);margin:6px 0 4px}
.pall{font:inherit;font-size:12px;background:#fff;border:1px solid var(--t2);color:var(--t2);border-radius:20px;padding:3px 12px;cursor:pointer}
.pall:hover{background:var(--t2);color:#fff}
.res{display:grid;grid-template-columns:64px 1fr auto;grid-template-areas:"tp rn acts" "tp used used";gap:2px 10px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:10px;padding:8px 12px;margin-bottom:6px}
.tp{grid-area:tp;font-size:11px;text-align:center;border-radius:20px;padding:3px 6px;font-weight:700}
.tp-طباعة{background:#e7f0ec;color:var(--t2)}
.tp-بطاقات{background:#f6eede;color:#7a5a12}
.rn{grid-area:rn;font-size:13.5px;color:var(--ink)}
.acts{grid-area:acts;display:flex;gap:8px;white-space:nowrap}
.acts a{font-size:13px;color:var(--t2);font-weight:700;text-decoration:none;border:1px solid var(--line);border-radius:8px;padding:3px 10px}
.acts a:hover{background:var(--head)}
.used{grid-area:used;font-size:11px;color:var(--muted)}
.empty{display:none;color:var(--muted);text-align:center;padding:30px;font-size:14px}
.foot{margin-top:16px;color:var(--muted);font-size:12px;text-align:center}
</style>
</head>
<body>
<div class="wrap">
  <div class="top"><img src="brand/logo-ghars.webp" alt="نادي غرس القيم للطفولة"/>
    <div><h1>خزانة المعلمة</h1><p>كلُّ المطبوعات والبطاقات في بابٍ واحد ($count موردًا) — مفهرسةً بالوحدة ثمّ المادّة ثمّ اليوم. ابحثي بالاسم، أو اطبعي موادَّ يومٍ كاملةً.</p></div>
  </div>
  <div class="searchbar"><input id="q" type="search" placeholder="ابحثي باسم المورد… (مثال: بطاقات المواقف · أركان اليوم)" autocomplete="off"/></div>
  <div id="list">
$body  </div>
  <div class="empty" id="empty">لا مورد يطابق البحث.</div>
  <div class="foot">خزانة المعلمة · دليل معلمة غرس القيم · تُولَّد آليًّا من روابط الصفحات (gen-khizana.pl).</div>
</div>
<script>
(function(){
  var q=document.getElementById('q'), empty=document.getElementById('empty');
  var res=[].slice.call(document.querySelectorAll('.res'));
  q.addEventListener('input',function(){
    var v=q.value.trim(); var any=false;
    res.forEach(function(r){ var ok = !v || r.getAttribute('data-name').indexOf(v)>=0; r.style.display=ok?'':'none'; if(ok)any=true; });
    document.querySelectorAll('.day,.mat,.unit').forEach(function(g){
      var vis=g.querySelector('.res:not([style*="none"])'); g.style.display=vis?'':'none';
    });
    empty.style.display=any?'none':'block';
  });
  document.querySelectorAll('.pall').forEach(function(b){
    b.addEventListener('click',function(){
      (b.getAttribute('data-files')||'').split(',').filter(Boolean).forEach(function(f){ window.open(f,'_blank','noopener'); });
    });
  });
})();
</script>
</body>
</html>
DOC

open my $O,'>:raw','khizanat-almuallima.html' or die "write khizana: $!"; print $O encode_utf8($doc); close $O;
print "✓ khizanat-almuallima.html — $count موردًا في ".scalar(keys %tree)." وحدة\n";
if (@unlabeled) { print "⚠ موارد بلا عنوانٍ واضح (أُدرجت باسم الملفّ):\n"; print "  · $_\n" for @unlabeled; }
