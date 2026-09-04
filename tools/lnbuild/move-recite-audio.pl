#!/usr/bin/perl
# ينقل مشغّلَ التلاوة (المصحف المعلّم) من أعلى «دليل الدرس» إلى ما تحت «لوحة السورة» في سير اللقاء.
# آمنٌ وعكسيّ: لا يعمل إلّا حين يكون الصوت في الأعلى واللوحةُ في سير اللقاء.
# الاستعمال: perl move-recite-audio.pl <lesson.html> [out.html]
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$out) = @ARGV; $out //= $src;
die "الاستعمال: perl move-recite-audio.pl <lesson.html> [out]\n" unless $src;
open my $x,'<:raw',$src or die "open $src: $!"; local $/; my $h=<$x>; close $x;

# لا بدّ من وجود لوحةٍ في سير اللقاء نُدرِج تحتها
unless ($h =~ /<!-- لوحة السورة -->/){ print "$src: لا لوحةَ سورةٍ — تُخطّى\n"; exit }

# اقطع كتلة الصوت من الأعلى (التعليق + div الصوت حتى </audio></div>)
my $audio;
if ($h =~ s/[ \t]*<!-- تلاوة السورة -->\s*(<div class="gq-surah-audio.*?<\/audio><\/div>)\s*//s){
  $audio = $1;
} else {
  print "$src: لم أجد كتلةَ الصوت في الأعلى (رُبّما نُقلت) — تُخطّى\n"; exit;
}

# عكسيّة: إن كان الصوت قد أُدرِج تحت اللوحة سلفًا (يسبقه تعليق «تلاوة تحت اللوحة») تُخطّى
# أدرِج مباشرةً بعد كتلة اللوحة وقبل أوّل <div class="step"> في سير اللقاء
my $ins = "\n          <!-- تلاوة تحت اللوحة -->\n          $audio\n";
unless ($h =~ s/(<!-- لوحة السورة -->.*?)(\s*<div class="step">)/$1$ins$2/s){
  die "$src: لم أجد «خطوة» بعد اللوحة — أُعيدت الكتلة بالفشل، لم يُكتب شيء\n";
}

open my $o,'>:raw',$out or die "write $out: $!"; print $o $h; close $o;
print "$src: نُقلت التلاوةُ إلى ما تحت لوحة السورة ✓\n";
