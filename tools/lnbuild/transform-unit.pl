#!/usr/bin/perl
# transform-unit.pl — (ح) يعيد تجميع تبويبات الوحدة ١١←٨ في أربع مجموعات،
#   و(ز) يضيف ٣ تبويبات/لوحات: «قبل أن تبدئي» · «مخرَج الوحدة» · «تقرير إلى البيت».
# لا يكسر مفاتيح data-u ولا جافاسكربت الملاحة (تعمل بـ.utab/id=u-KEY). مُعادُ التشغيل بلا أثر.
# الاستعمال: perl tools/lnbuild/transform-unit.pl <unit-file.html> <slug> "<اسم الوحدة>"
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';
my ($file,$slug,$uname) = @ARGV;
die "الاستعمال: transform-unit.pl <file> <slug> <name>\n" unless $file && $slug && $uname;
my $h; { open my $F,'<:raw',$file or die "open $file: $!"; local $/; $h=decode_utf8(scalar<$F>); close $F; }

if($h=~/data-u="before"/){ print "$file: مُطبَّقٌ سلفًا — تخطٍّ\n"; exit 0; }   # idempotent

# لقاءات الوحدة (لبطاقة «قبل أن تبدئي»)
my %P2=(makhluq=>'am','layl-nahar'=>'ln',maskan=>'mk',family=>'family');
my @les;
if(open my $L,'<:raw','lessons.txt'){ @les=map{s/\s+\z//r} grep{/\S/} <$L>; close $L; }
my $pfx=$P2{$slug}//'';
my @ul = grep { /^\Q$pfx\E-?(?:[a-z]+-)?lesson\d+\.html$/ } @les;
sub lestitle { my $f=shift; open my $x,'<:raw',$f or return $f; local $/; my $t=decode_utf8(scalar<$x>); close $x;
  ($t)=$t=~m{<title>(.*?)</title>}s; $t//=$f; $t=~s/ *·.*//; $t=~s/^\s+|\s+$//g; return $t; }
my $preplist = join('', map { qq{<a class="prep-link" href="$_#ptahdir" target="_blank" rel="noopener">}.lestitle($_).qq{</a>} } @ul);

# ── (ح) شريطُ تبويباتٍ جديدٌ بأربع مجموعات + التبويبات الثلاثة الجديدة ──
my $nav = <<"NAV";
<nav class="unitnav" aria-label="تبويبات الوحدة">
    <div class="unitnav-row"><span class="unitnav-label">ابدئي هنا</span>
      <button class="utab" data-u="usage">دليل الاستخدام</button>
      <button class="utab" data-u="before">قبل أن تبدئي</button>
    </div>
    <div class="unitnav-row"><span class="unitnav-label">افهمي الوحدة</span>
      <button class="utab" data-u="unit">الوحدة</button>
      <button class="utab" data-u="theme">الفكرة الناظمة والتكامل</button>
      <button class="utab" data-u="manzooma">منظومة الوحدة</button>
    </div>
    <div class="unitnav-row"><span class="unitnav-label">نفِّذي الأيام</span>
      <button class="utab" data-u="week">خريطة الأسبوع</button>
      <button class="utab days-tab active" data-u="days">دروس الوحدة</button>
      <button class="utab" data-u="values">القيم والتقييم</button>
      <button class="utab" data-u="outcome">مخرَج الوحدة</button>
      <button class="utab" data-u="report">تقرير إلى البيت</button>
    </div>
    <div class="unitnav-row"><span class="unitnav-label">جهِّزي البيئة</span>
      <button class="utab" data-u="corners">خريطة الأركان</button>
      <button class="utab" data-u="lang">الحصيلة اللغوية</button>
      <button class="utab" data-u="songs">أناشيد حركية</button>
      <button class="utab" data-u="fitness">اللياقة البدنية</button>
    </div>
  </nav>
NAV
$h =~ s{<nav class="unitnav".*?</nav>}{$nav}s or die "$file: لم أجد unitnav\n";

# ── (ز) اللوحات الثلاث ──
my $panels = <<"PANELS";
<div class="upanel" id="u-before">
    <div class="u-sec"><h2 class="u-h2">قبل أن تبدئي — تجهيزُ الوحدة</h2>
    <p class="u-p">اقرئي هذا قبل أوّل يومٍ من الوحدة. تجهيزُ الأدوات يحوّل التخطيطَ من مهارةٍ إلى استمارةٍ تُملأ.</p>
    <div class="u-cards3">
      <a class="u-card-link" href="namathij-almuallima.html" target="_blank" rel="noopener"><b>ورقة تجهيز الأسبوع</b><span>استمارةٌ تُطبع وتُملأ: اللقاء · الأدوات · جاهز ☐ (نموذج ١).</span></a>
      <a class="u-card-link" href="khizanat-almuallima.html" target="_blank" rel="noopener"><b>خزانة المطبوعات</b><span>كلُّ مطبوعات الوحدة وبطاقاتها في بابٍ واحد — اطبعيها مسبقًا.</span></a>
      <a class="u-card-link" href="namathij-almuallima.html" target="_blank" rel="noopener"><b>موارد البيئة المحيطة</b><span>جردُ ما يُجلَب من محيط الروضة بديلًا عن المشترى (نموذج ٨).</span></a>
    </div>
    <h3 class="u-h3">تحضيرُ كلّ لقاء (قوائمُ الأدوات فيه)</h3>
    <p class="u-note">أدواتُ كلّ لقاءٍ مفصّلةٌ في تبويب «التحضير» داخله؛ افتحيها لتجمعي ما يلزم:</p>
    <div class="prep-links">$preplist</div>
    </div>
  </div>
  <div class="upanel" id="u-outcome">
    <div class="u-sec"><h2 class="u-h2">مخرَجُ الوحدة</h2>
    <p class="u-p">عملٌ واحدٌ يمتدّ عبر أيّام الوحدة ويجمع ما تعلّمه الطفل.</p>
    <div class="u-frame">
      <div class="u-row"><b>الفكرة:</b> <span class="seed">⟦المضمونُ التربويّ لمخرَج الوحدة — بانتظار اعتماد صاحبة المنهج (س-٣)⟧</span></div>
      <div class="u-row"><b>يمتدّ عبر:</b> <span class="u-fill"></span></div>
      <div class="u-row"><b>ما يجمعه من الوحدة:</b> <span class="u-fill"></span></div>
      <div class="u-row"><b>صورةُ العمل النهائيّ:</b> <span class="u-fill"></span></div>
    </div>
    <p class="u-note">الهيكلُ جاهز؛ يُملأ مضمونُه التربويّ باعتماد صاحبة المنهج.</p>
    </div>
  </div>
  <div class="upanel" id="u-report">
    <div class="u-sec"><h2 class="u-h2">تقرير إلى البيت — ختامُ الوحدة</h2>
    <p class="u-p">يُطبع ويُرسَل إلى الأسرة نهايةَ وحدة «$uname». تُفرَّغ حقولُه من <a href="sijil-$slug.html" target="_blank" rel="noopener">سجلّ ملاحظة الوحدة</a>.</p>
    <table class="u-rep"><tr><td class="rk">الطفل</td><td></td><td class="rk">التاريخ</td><td></td></tr></table>
    <table class="u-rep">
      <thead><tr><th>المؤشّر</th><th>مبتدئ</th><th>نامٍ</th><th>متمكّن</th></tr></thead>
      <tbody>
      <tr><td>المؤشّر المعرفيّ</td><td class="ck"></td><td class="ck"></td><td class="ck"></td></tr>
      <tr><td>المؤشّر المهاريّ</td><td class="ck"></td><td class="ck"></td><td class="ck"></td></tr>
      <tr><td>المؤشّر الوجدانيّ</td><td class="ck"></td><td class="ck"></td><td class="ck"></td></tr>
      <tr><td>المؤشّر التطبيقيّ</td><td class="ck"></td><td class="ck"></td><td class="ck"></td></tr>
      </tbody>
    </table>
    <div class="u-lvkey"><b>معنى المستويات:</b> <span>مبتدئ: يظهر الأثرَ بمساعدة.</span> <span>نامٍ: يظهره عند التذكير.</span> <span>متمكّن: يظهره مستقلًّا ويستعين بالله.</span></div>
    <table class="u-rep"><tr><td class="rk" style="vertical-align:top">كلمةٌ إلى الأسرة</td><td style="height:60px"></td></tr></table>
    <p class="u-note">وصفُ المستويات التفصيليُّ لكلّ لقاءٍ في سجلّ الوحدة (يُفتح أعلاه).</p>
    </div>
  </div>
  <div class="upanel active" id="u-days">
PANELS
$h =~ s{<div class="upanel active" id="u-days">}{$panels}s
  or die "$file: لم أجد لوحة u-days\n";

# ── أنماطٌ بسيطةٌ للوحات الجديدة (idempotent، تُحقن مرّة) ──
unless($h=~/id="u3-css"/){
  my $css = q{<style id="u3-css">
.u-sec{max-width:900px;margin:0 auto;padding:6px 2px}
.u-h2{font-family:'AlAwwal',serif;color:#17352d;font-size:22px;margin:6px 0 6px}
.u-h3{font-family:'AlAwwal',serif;color:#2C6A4D;font-size:16px;margin:16px 0 6px}
.u-p{color:#3a4a44;font-size:14.5px;margin-bottom:12px}
.u-note{color:#6C776F;font-size:12.5px;margin-top:8px}
.u-cards3{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.u-card-link{display:block;background:#fff;border:1px solid #E9E1D2;border-radius:12px;padding:12px 14px;text-decoration:none}
.u-card-link b{display:block;color:#17352d;font-size:15px;margin-bottom:3px}
.u-card-link span{color:#6C776F;font-size:12.5px}
.prep-links{display:flex;flex-wrap:wrap;gap:7px}
.prep-link{background:#F7F2E6;border:1px solid #E9E1D2;border-radius:8px;padding:5px 11px;font-size:12.5px;color:#2C6A4D;text-decoration:none}
.u-frame{background:#fff;border:1px solid #E9E1D2;border-radius:12px;padding:14px 16px}
.u-row{padding:7px 0;border-bottom:1px dashed #E9E1D2;font-size:14px}
.u-row:last-child{border-bottom:0}
.u-row b{color:#2C6A4D}
.u-fill{display:inline-block;min-width:60%;border-bottom:1px dotted #9aa39a}
.seed{color:#7a5a12;background:#faf3df;border:1px dashed #C79A3B;border-radius:6px;padding:1px 7px;font-size:13px}
.u-rep{width:100%;max-width:860px;border-collapse:collapse;margin:8px 0}
.u-rep th,.u-rep td{border:1px solid #D9D0BE;padding:7px 9px;font-size:13.5px;text-align:right}
.u-rep thead th{background:#EAF1EC;color:#17352d;text-align:center}
.u-rep td.rk{background:#fcfaf4;font-weight:700;color:#2C6A4D;width:110px}
.u-rep td.ck{width:70px;text-align:center}
.u-rep td.ck::before{content:"";display:inline-block;width:15px;height:15px;border:1.6px solid #2C6A4D;border-radius:3px}
.u-lvkey{background:#F7F2E6;border:1px solid #E9E1D2;border-radius:10px;padding:9px 13px;font-size:12.5px;margin:8px 0;display:flex;flex-wrap:wrap;gap:4px 16px}
.u-lvkey b{color:#17352d}
</style>};
  $h =~ s{(</head>)}{$css\n$1}s;
}

open my $O,'>:raw',$file or die "write $file: $!"; print $O encode_utf8($h); close $O;
my $tabs = () = ($h=~/class="utab"/g);
print "$file: ✓ ح+ز — تبويبات=$tabs · لقاءات في «قبل أن تبدئي»=".scalar(@ul)."\n";
