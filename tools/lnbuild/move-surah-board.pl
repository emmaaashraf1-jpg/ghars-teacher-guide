#!/usr/bin/perl
# ينقل كتلةَ «لوحة السورة» من رأس دليل الدرس (p1) إلى بداية «سير اللقاء» (موضع التلاوة والتدبّر).
# يُبقي نسخةَ المعرض («الوسائل والصور») كما هي (لا يمسّها). آمنٌ وعكسيُّ الكشف.
# الاستعمال: perl move-surah-board.pl <lesson.html> [out.html]
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$out) = @ARGV; $out //= $src;
die "الاستعمال: perl move-surah-board.pl <lesson.html> [out]\n" unless $src;
open my $x,'<:raw',$src or die "open $src: $!"; local $/; my $h=<$x>; close $x;

# فحص عكسيّ: إن كانت اللوحة قد نُقلت سلفًا (لا لوحةَ قبل الخطّة السريعة/التلاوة) تُخطّى
# نلتقط الكتلة العلويّة: من تعليق «لوحة السورة» حتى </div> الذي يليه تعليقُ التلاوة أو الخطّة السريعة.
my $board;
if ($h =~ s/([ \t]*<!-- لوحة السورة -->\s*<div style="border:1px solid var\(--line\);.*?<\/div>)\s*(?=[ \t]*(?:<!-- تلاوة السورة -->|<div class="quick-sheet">))//s){
  $board = $1;
} else {
  print "$src: لا لوحةَ في الرأس (رُبّما نُقلت) — تُخطّى\n"; exit;
}
$board =~ s/^\s+//; # قلّم البادئة

# أدرِج في بداية «سير اللقاء» (بعد <div class="flow"> الذي يلي عنوان سير اللقاء)
my $anchor_re = qr/(<h2>سير اللقاء<\/h2>.*?<div class="flow">)/s;
unless ($h =~ s/$anchor_re/$1\n          $board/s){
  die "$src: لم أجد «سير اللقاء / flow» — لم يُنقَل (أُعيدت اللوحةُ لمكانها بالفشل)\n";
}

open my $o,'>:raw',$out or die "write $out: $!"; print $o $h; close $o;
print "$src: نُقلت لوحةُ السورة إلى بداية «سير اللقاء» ✓\n";
