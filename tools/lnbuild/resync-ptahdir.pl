#!/usr/bin/perl
# يُزامن لوحة «التحضير» (ptahdir) من درسٍ حيٍّ (10 لوحات) إلى حقل P_PTAHDIR في ملفّ .dat
# الاستعمال: perl resync-ptahdir.pl <lesson.html> <data.dat>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($html,$dat) = @ARGV;
die "الاستعمال: perl resync-ptahdir.pl <lesson.html> <data.dat>\n" unless $html && $dat;
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $H = slurp($html);
my @L = ($H =~ /[^\n]*\n|[^\n]+/g);
my ($c0,$c1);
for my $i (0..$#L){
  if ($L[$i] =~ /<!--\s+\S+\s+0\)/){ $c0=$i; }
  elsif (defined($c0) && !defined($c1) && $L[$i] =~ /<!--\s+\S+\s+1\)/){ $c1=$i; last; }
}
die "لم أجد لوحة ptahdir (تعليقا 0) و1))\n" unless defined($c0) && defined($c1);
my $block = join('', @L[$c0 .. $c1-1]);   # يشمل تعليق 0) حتى ما قبل 1)

my $D = slurp($dat);
# استبدل محتوى P_PTAHDIR (من بعد سطر العلامة حتى @@P_P1)
$D =~ s/(\@\@P_PTAHDIR\r?\n).*?(\@\@P_P1\r?\n)/$1.$block."\n".$2/se
  or die "لم أجد حقل P_PTAHDIR/P_P1 في $dat\n";
open my $o,'>:raw',$dat or die; print $o $D; close $o;
print "زُومِن ptahdir → $dat (".length($block)." بايت)\n";
