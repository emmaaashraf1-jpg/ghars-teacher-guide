#!/usr/bin/perl
# استخلاص قالب خطّ إنتاج «الليل والنهار» من الدرس النموذج + بيانات الدرس + فحصٌ ذاتيّ
use strict; use warnings;
binmode STDOUT, ':raw';
my $dir = $ARGV[0] // '.';
my $src = $ARGV[1] // "$dir/../../ln-allamni-lesson1.html";

open my $fh, '<:raw', $src or die "open $src: $!";
local $/; my $data = <$fh>; close $fh;
# احتفظ بالأسطر مع فواصلها
my @L = ($data =~ /[^\n]*\n|[^\n]+/g);

# اكتشاف الحدود بالأنماط لا بالأرقام
my (@cmt, $foot_i);
for my $i (0..$#L){
  push @cmt, $i if $L[$i] =~ /<!--\s+\S+\s+(\d+)\)/;
  $foot_i = $i if !defined($foot_i) && $L[$i] =~ /class="foot"/;
}
die "توقّعت ١٠ تعليقات أقسام، وجدت ".scalar(@cmt) unless @cmt == 10;
die "لم أجد سطر .foot" unless defined $foot_i;

my $head = join('', @L[0 .. $cmt[0]-1]);
my @blocks;
for my $k (0..9){
  my $start = $cmt[$k];
  my $end   = ($k < 9) ? $cmt[$k+1]-1 : $foot_i-1;
  push @blocks, join('', @L[$start .. $end]);
}
my $tail = join('', @L[$foot_i .. $#L]);

# استخلاص قيم الغلاف/الفوتر ووضع العلامات مكانها في القالب
my %F;
sub grab { my ($re,$name)=@_; if ($head =~ $re){ $F{$name}=$1; } elsif ($tail =~ $re){ $F{$name}=$1; } else { die "لم أجد $name"; } }
# الصورة (مربوطةٌ بسياق cover-photo لتجنّب url() في الـCSS)
$head =~ s/(cover-photo"\s+style="background-image:url\(')([^']*)('\))/${1}{{COVER_IMG}}${3}/ and $F{COVER_IMG}=$2;
# الشارة
$head =~ s/(<span class="c-badge">)(.*?)(<\/span>)/${1}{{COVER_BADGE}}${3}/s and $F{COVER_BADGE}=$2;
# العنوان
$head =~ s/(<h1>)(.*?)(<\/h1>)/${1}{{COVER_TITLE}}${3}/s and $F{COVER_TITLE}=$2;
# الميتا
$head =~ s/(<div class="c-meta">)(.*?)(<\/div>)/${1}{{COVER_META}}${3}/s and $F{COVER_META}=$2;
# الفوتر
$tail =~ s/(<div class="foot">)(.*?)(<\/div>)/${1}{{FOOT}}${3}/s and $F{FOOT}=$2;
for my $k (qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT)){ die "فشل استخلاص $k" unless defined $F{$k}; }

# كتابة القالب المشترك
mkdir $dir unless -d $dir;
open my $h,'>:raw',"$dir/_ln-head.tpl" or die; print $h $head; close $h;
open my $t,'>:raw',"$dir/_ln-tail.tpl" or die; print $t $tail; close $t;

# كتابة بيانات الدرس النموذج
my @pnames = qw(P_PTAHDIR P_P1 P_P2 P_P3 P_P4 P_P5 P_P6 P_P7 P_P8 P_P9);
mkdir "$dir/data" unless -d "$dir/data";
my $datf = "$dir/data/ln-allamni-lesson1.dat";
open my $d,'>:raw',$datf or die;
for my $k (qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT)){
  print $d "\@\@$k\n$F{$k}\n";
}
for my $i (0..9){ print $d "\@\@$pnames[$i]\n$blocks[$i]"; }
close $d;

# ===== فحصٌ ذاتيّ: أعِد البناء وقارن =====
my $rebuilt = do { local $/; open my $x,'<:raw',"$dir/_ln-head.tpl"; my $s=<$x>; $s };
my %inline = map {$_=>1} qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT);
# املأ الغلاف
$rebuilt =~ s/\{\{COVER_IMG\}\}/$F{COVER_IMG}/;
$rebuilt =~ s/\{\{COVER_BADGE\}\}/$F{COVER_BADGE}/s;
$rebuilt =~ s/\{\{COVER_TITLE\}\}/$F{COVER_TITLE}/s;
$rebuilt =~ s/\{\{COVER_META\}\}/$F{COVER_META}/s;
$rebuilt .= join('', @blocks);
my $tt = do { local $/; open my $x,'<:raw',"$dir/_ln-tail.tpl"; my $s=<$x>; $s };
$tt =~ s/\{\{FOOT\}\}/$F{FOOT}/s;
$rebuilt .= $tt;

if ($rebuilt eq $data){ print "SELFCHECK OK — طابق الأصل حرفًا بحرف (".length($data)." بايت)\n"; }
else {
  print "SELFCHECK FAIL — الطول أصل=".length($data)." معاد=".length($rebuilt)."\n";
  # أوّل موضع اختلاف
  my $min = length($data)<length($rebuilt)?length($data):length($rebuilt);
  my $p=0; $p++ while $p<$min && substr($data,$p,1) eq substr($rebuilt,$p,1);
  print "أوّل اختلاف عند البايت $p\n";
  print "أصل : ...".substr($data,$p-30,80)."\n";
  print "معاد: ...".substr($rebuilt,$p-30,80)."\n";
}
