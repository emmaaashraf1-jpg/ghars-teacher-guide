#!/usr/bin/perl
# يستبدل لوحةَ «التحضير» داخل درسٍ مُحسَّنٍ سلفًا بلوحةٍ محدَّثة (بلا لمس _enh-layer ولا بقيّة الدرس).
# يستبدل الأسطر من تعليق «0) التحضير» حتى ما قبل تعليق القسم «1)» — وهي بالضبط جسم الفراغمة.
# الاستعمال: perl replace-ptahdir.pl <lesson.html> <ptahdir-fragment.html> <out.html>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$ptf,$out) = @ARGV;
die "الاستعمال: perl replace-ptahdir.pl <lesson.html> <ptahdir.html> <out.html>\n" unless $src && $ptf && $out;
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $data = slurp($src);
my $pt   = slurp($ptf);
die "بذورٌ غير مملوءة في $ptf\n" if $pt =~ /⟦/;
die "الدرس غير مُحسَّن (لا توجد لوحة ptahdir): $src\n" unless $data =~ /id="ptahdir"/;
$pt =~ s/\s+\z//;

my @L = ($data =~ /[^\n]*\n|[^\n]+/g);
my ($beg,$sec1);
for my $i (0..$#L){
  $beg  = $i if !defined($beg)  && $L[$i] =~ /<!--[^\n]*\s0\)[^\n]*التحضير/;
  if (defined($beg) && !defined($sec1) && $i>$beg && $L[$i] =~ /<!--\s+\S+\s+1\)/){ $sec1 = $i; }
}
die "لم أجد تعليق «0) التحضير»\n" unless defined $beg;
die "لم أجد تعليق القسم «1)» بعده\n" unless defined $sec1;

# تحقّق: يجب أن تكون لوحةُ ptahdir واحدةً في المنطقة المستبدَلة
my $region = join('', @L[$beg..$sec1-1]);
my $rc = () = ($region =~ /id="ptahdir"/g);
die "توقّعت لوحةَ ptahdir واحدة في المنطقة، وجدت $rc\n" unless $rc == 1;

my @outL = (@L[0..$beg-1], "$pt\n\n", @L[$sec1..$#L]);
my $res = join('', @outL);

# فحوصٌ سريعة: بقيت لوحةٌ واحدة، ولا بذور
my $pc = () = ($res =~ /id="ptahdir"/g);
die "بعد الاستبدال: عدد لوحات ptahdir=$pc (توقّعت 1)\n" unless $pc == 1;
warn "تحذير: علامة ⟦ باقية!\n" if $res =~ /⟦/;

open my $o,'>:raw',$out or die "write $out: $!"; print $o $res; close $o;
print "استُبدلت لوحةُ التحضير في $src → $out  |  ptahdir=$pc · +".(length($res)-length($data))." بايت\n";
