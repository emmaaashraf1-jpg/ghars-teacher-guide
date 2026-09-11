#!/usr/bin/perl
# extract-ptahdir.pl — يستخرج لوحةَ «التحضير» (ptahdir) من درسٍ حيٍّ إلى فراغمةٍ مستقلّة
# تطابق بقيّةَ فراغمات ptahdir/ في الشكل، فيصير المستودع على خطِّ إنتاجٍ واحد.
# الحدود نفسها التي يعتمدها replace-ptahdir.pl: من تعليق «0) التحضير» حتى ما قبل تعليق القسم «1)».
# الاستعمال: perl tools/lnbuild/extract-ptahdir.pl <lesson.html> <out-fragment.html>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src, $out) = @ARGV;
die "الاستعمال: perl extract-ptahdir.pl <lesson.html> <out-fragment.html>\n" unless $src && $out;
open my $x, '<:raw', $src or die "open $src: $!"; local $/; my $data = <$x>; close $x;

my @L = ($data =~ /[^\n]*\n|[^\n]+/g);
my ($beg, $sec1);
for my $i (0..$#L){
  $beg  = $i if !defined($beg)  && $L[$i] =~ /<!--[^\n]*\s0\)[^\n]*التحضير/;
  if (defined($beg) && !defined($sec1) && $i>$beg && $L[$i] =~ /<!--\s+\S+\s+1\)/){ $sec1 = $i; }
}
die "لم أجد تعليق «0) التحضير» في $src\n" unless defined $beg;
die "لم أجد تعليق القسم «1)» بعده في $src\n"   unless defined $sec1;

my $block = join('', @L[$beg .. $sec1-1]);
my $pc = () = ($block =~ /id="ptahdir"/g);
die "توقّعت لوحةَ ptahdir واحدة، وجدت $pc في $src\n" unless $pc == 1;
die "بذورٌ غير مملوءة ⟦ في لوحة $src\n" if $block =~ /⟦/;
$block =~ s/\s+\z//;   # قصُّ الفراغ الذيليّ ليطابق شكلَ الفراغمات الأخرى

open my $o, '>:raw', $out or die "write $out: $!"; print $o $block."\n"; close $o;
print "استُخرجت ptahdir: $src → $out (".length($block)." بايت)\n";
