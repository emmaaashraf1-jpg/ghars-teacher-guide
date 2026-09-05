#!/usr/bin/perl
# يُدرج بطاقة «أسئلة التغذية الراجعة (مع الإجابات النموذجية)» في لوحة دليل الدرس (p1)
# قبل قسم «الوسائل والصور المعروضة في اللقاء». آمنٌ للتكرار (يتخطّى إن وُجدت).
# الاستعمال: perl add-feedback.pl <lesson.html> <fragment.fb.html>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$frg) = @ARGV;
die "الاستعمال: perl add-feedback.pl <lesson.html> <fragment.fb.html>\n" unless $src && $frg;
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }
my $h = slurp($src); my $fb = slurp($frg);
die "بذورٌ غير مملوءة في $frg\n" if $fb =~ /\xE2\x9F\xA6/;    # ⟦
$fb =~ s/\s+\z//;

if ($h =~ /أسئلة التغذية الراجعة \(مع الإجابات النموذجية\)/){ print "$src: مضافةٌ سلفًا — تُخطّى\n"; exit }

# المرسى: أوّلُ قسمٍ من «الوسائل ... المعروضة في اللقاء» أو «النشاط المصاحب» داخل p1
my $anchor = qr/([ \t]*<div class="sec-head"><div class="num[^"]*"><i class="gi" data-i="[^"]*"[^>]*><\/i><\/div><h2>(?:الوسائل[^<]*المعروضة[^<]*اللقاء|أدوات اللقاء المعروضة|النشاط المصاحب[^<]*)<\/h2>)/;
unless ($h =~ s/$anchor/$fb\n\n$1/){
  die "$src: لم أجد مرسى «الوسائل المعروضة/النشاط المصاحب» — لم يُدرَج شيء\n";
}
open my $o,'>:raw',$src or die "write $src: $!"; print $o $h; close $o;
my $q = () = ($h =~ /<span class="q">/g);
print "$src: أُدرجت التغذية الراجعة ✓ (أسئلة=$q)\n";
