#!/usr/bin/perl
# مُهاجِر: يستخلص من درسٍ قائمٍ (بنية ٩ لوحات، بلا تبويب التحضير) بياناتِه إلى .dat
# ويُبذر تبويب «التحضير» هيكلًا جاهزًا للتأليف. الاستعمال:
#   perl migrate-ln.pl <old-lesson.html> <out.dat>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$out) = @ARGV;
die "الاستعمال: perl migrate-ln.pl <old-lesson.html> <out.dat>\n" unless $src && $out;

open my $fh,'<:raw',$src or die "open $src: $!";
local $/; my $data=<$fh>; close $fh;
my @L = ($data =~ /[^\n]*\n|[^\n]+/g);

my (@cmt,$foot_i);
for my $i (0..$#L){
  push @cmt, $i if $L[$i] =~ /<!--\s+\S+\s+(\d+)\)/;
  $foot_i = $i if !defined($foot_i) && $L[$i] =~ /class="foot"/;
}
die "توقّعت ٩ تعليقات أقسام (p1..p9)، وجدت ".scalar(@cmt)."\n" unless @cmt == 9;
die "لم أجد سطر .foot\n" unless defined $foot_i;

# لوحات p1..p9
my @blocks;
for my $k (0..8){
  my $start=$cmt[$k];
  my $end = ($k<8)? $cmt[$k+1]-1 : $foot_i-1;
  push @blocks, join('', @L[$start..$end]);
}

# حقول الغلاف/الفوتر
my %F;
$data =~ /cover-photo"\s+style="background-image:url\('([^']*)'\)/ and $F{COVER_IMG}=$1;
$data =~ /<span class="c-badge">(.*?)<\/span>/s and $F{COVER_BADGE}=$1;
$data =~ /<h1>(.*?)<\/h1>/s and $F{COVER_TITLE}=$1;
$data =~ /<div class="c-meta">(.*?)<\/div>/s and $F{COVER_META}=$1;
$data =~ /<div class="foot">(.*?)<\/div>/s and $F{FOOT}=$1;
for my $k (qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT)){
  die "فشل استخلاص $k من $src\n" unless defined $F{$k};
}

# هيكل تبويب «التحضير» (يُملأ لكلّ درس؛ العلامة ⟦ تمنع الشحن قبل الإكمال)
my $ptahdir = <<'PT';
  <!-- ══════════ 0) التحضير والخلفية ══════════ -->
  <div class="panel" id="ptahdir">
    <div class="info"> كلُّ ما تحتاجه المعلمة قبل أن تدخل الحلقة: ما تُجهّزه بيدها، وما تعرفه في رأسها. تُقرأ ليلةَ أمس — سبعُ دقائق تكفي.</div>

    <div class="sec-head first"><div class="num"><i class="gi" data-i="الوسائل والأدوات" data-size="22"></i></div><h2>قائمة تجهيز اللقاء</h2><div class="rule"></div></div>
    <div class="card"><div class="lbl">يُطبع ويُقصّ</div><ul class="steps"><li>⟦يُملأ: بطاقات/ملفّات هذا اللقاء⟧</li></ul></div>

    <div class="sec-head"><div class="num"><i class="gi" data-i="مراجع إثرائية للمعلمة" data-size="22"></i></div><h2>ما تحتاجين معرفته</h2><div class="rule"></div></div>
    <div class="card"><ul class="steps"><li>⟦يُملأ: الخلاصة المعرفيّة التي تحتاجها المعلمة⟧</li></ul></div>

    <div class="sec-head"><div class="num"><i class="gi" data-i="بناء المعنى" data-size="22"></i></div><h2>الخلفية العلمية المبسّطة</h2><div class="rule"></div></div>
    <div class="info">معرفةٌ للمعلمة حتى لا تُجيب عن سؤالٍ عارضٍ من طفلٍ بخطأ — لا مادّةٌ تُلقى في الحلقة.</div>
    <div class="card"><ul class="steps"><li>⟦يُملأ: أسئلةٌ علميّةٌ متوقّعة وإجاباتُها المضبوطة⟧</li></ul></div>

    <div class="sec-head"><div class="num"><i class="gi" data-i="ضابط عقدي وشرعي" data-size="22"></i></div><h2>الضابط العقديّ وحدُّ ما يُقال للطفل</h2><div class="rule"></div></div>
    <div class="card"><ul class="steps"><li>⟦يُملأ: الضوابط العقديّة وحدُّ ما يُقال⟧</li></ul></div>

    <div class="sec-head"><div class="num"><i class="gi" data-i="تنبيه للمعلمة" data-size="22"></i></div><h2>ثلاثة أخطاء شائعة في هذا اللقاء</h2><div class="rule"></div></div>
    <div class="card"><div class="lbl">١ · ⟦عنوان الخطأ⟧</div><ul class="steps"><li><b>الخطأ:</b> ⟦…⟧</li><li><b>العلاج:</b> ⟦…⟧</li></ul></div>
  </div>

PT

# كتابة .dat
open my $d,'>:raw',$out or die "write $out: $!";
for my $k (qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT)){ print $d "\@\@$k\n$F{$k}\n"; }
print $d "\@\@P_PTAHDIR\n$ptahdir";
my @pn = qw(P_P1 P_P2 P_P3 P_P4 P_P5 P_P6 P_P7 P_P8 P_P9);
for my $i (0..8){ print $d "\@\@$pn[$i]\n$blocks[$i]"; }
close $d;

my $todo = () = ($ptahdir =~ /⟦/g);
print "هُوجِر $src → $out  |  الغلاف: $F{COVER_TITLE}\n";
print "لوحات p1..p9 محفوظةٌ حرفيًّا. تبويب «التحضير» مبذورٌ بـ$todo موضعَ تأليفٍ (علامة ⟦⟧).\n";
