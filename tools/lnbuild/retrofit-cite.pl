#!/usr/bin/perl
# يطبّق أزواج (بحث→استبدال) نصّيّة حرفيّة (UTF-8 بايتيّة) على ملفٍّ في مكانه.
# الأزواج تُقرأ من ملفٍّ tsv: كل سطر = بحث<TAB>استبدال (نصّ حرفيّ، بلا regex).
# الاستعمال: perl retrofit-cite.pl <pairs.tsv> <file1> [file2 ...]
use strict; use warnings;
binmode STDOUT, ':raw';
my $pf = shift @ARGV or die "الاستعمال: perl retrofit-cite.pl <pairs.tsv> <files...>\n";
open my $p,'<:raw',$pf or die "open $pf: $!";
my @pairs;
while(my $ln=<$p>){ chomp $ln; $ln=~s/\r$//; next if $ln eq '' || $ln=~/^#/; my ($a,$b)=split /\t/,$ln,2; $b//=''; push @pairs,[$a,$b]; }
close $p;
for my $f (@ARGV){
  open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x;
  my $n=0;
  for my $pr (@pairs){ my ($a,$b)=@$pr; my $c = ($s =~ s/\Q$a\E/$b/g); $n+=$c; }
  open my $o,'>:raw',$f or die "write $f: $!"; print $o $s; close $o;
  print "$f: $n استبدالًا\n";
}
