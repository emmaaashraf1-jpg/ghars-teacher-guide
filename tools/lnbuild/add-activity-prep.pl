#!/usr/bin/perl
# يستخرج أدواتَ النشاط المصاحب وبطاقاتِه من متن الدرس، ويُدرجها في «قائمة تجهيز اللقاء» بالفراغمة.
# الاستعمال: perl add-activity-prep.pl <lesson.html> <fragment.ptahdir.html>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($lesson,$frag) = @ARGV;
die "الاستعمال: perl add-activity-prep.pl <lesson.html> <fragment>\n" unless $lesson && $frag;
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $html = slurp($lesson);
my $f    = slurp($frag);

# لا نُكرّر
if ($f =~ /موادُّ النشاط المصاحب/){ print "$frag: مُدرَجٌ سلفًا\n"; exit }

# استخرج كلّ كتل «<b>الأدوات</b>...» (النشاط) — بالضبط الأدوات، لا «الأدوات والوسائل»
my @tools;
while ($html =~ /<b>الأدوات<\/b>\s*(.*?)(?:<\/(?:div|p|li)>|<b>)/sg){
  my $t = $1;
  $t =~ s/<[^>]+>//g;         # جرّد الوسوم الداخليّة
  $t =~ s/&nbsp;/ /g; $t =~ s/\s+/ /g; $t =~ s/^\s+|\s+$//g;
  $t =~ s/\.\s*$//;
  push @tools, $t if length($t) > 1;
}
# أزل التكرار مع الحفاظ على الترتيب
my %seen; @tools = grep { !$seen{$_}++ } @tools;

my $hascards = ($html =~ /href="[^"]*cards[^"]*\.html"/) ? 1 : 0;

if (!@tools && !$hascards){ print "$frag: لا أدواتِ نشاطٍ ولا بطاقات — تُخطّى\n"; exit }

my $body = join(' · ', @tools);
my $line = '<li>موادُّ النشاط المصاحب وأدواتُه: ' . ($body || 'محسوسةٌ بحسب النشاط');
$line .= '؛ وبطاقاتُ النشاط تُطبَع وتُغلَّف' if $hascards;
$line .= '. <span class="src" style="display:inline">(مفصّلةٌ في تبويب «النشاط»)</span></li>';

# أدرِج بعد فتح قائمة التجهيز (بعد <ul class="steps"> التالي مباشرةً لتعليق/عنوان «قائمة تجهيز»)
my $anchor = '<div class="lbl">يُطبع ويُجهَّز</div><ul class="steps">';
if (index($f, $anchor) >= 0){
  $f =~ s/\Q$anchor\E/$anchor$line/;
} else {
  # قائمة تجهيز بعنوانٍ مختلف: أدرِج بعد أوّل <ul class="steps"> يلي «قائمة تجهيز اللقاء»
  $f =~ s/(قائمة تجهيز اللقاء.*?<ul class="steps">)/$1$line/s
    or die "$frag: لم أجد قائمة التجهيز\n";
}

open my $o,'>:raw',$frag or die "write $frag: $!"; print $o $f; close $o;
print "$frag: أُدرجت أدواتُ النشاط" . ($hascards?" + بطاقات":"") . " [".scalar(@tools)." أداة]\n";
