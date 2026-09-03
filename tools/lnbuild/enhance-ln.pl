#!/usr/bin/perl
# حاقنٌ جراحيّ: يُبقي رأسَ الدرس ومكوّناتِه الخاصّة، ويحقن فقط:
#   (١) طبقة التصميم المعمّمة (_enh-layer.html)  (٢) تبويب «التحضير» زرًّا ولوحةً.
# مناسبٌ للمواد ذات CSS الخاصّ (كتابي/لساني/…) حيث لا يصحّ استبدال الرأس.
# الاستعمال: perl enhance-ln.pl <lesson.html> <ptahdir-fragment.html> <out.html> [tpl_dir]
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$ptf,$out,$dir) = @ARGV;
die "الاستعمال: perl enhance-ln.pl <lesson.html> <ptahdir.html> <out.html> [tpl_dir]\n" unless $src && $ptf && $out;
$dir //= '.';
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $data = slurp($src);
die "الدرس مُحسَّنٌ سلفًا (توجد --gp): $src\n" if $data =~ /--gp:#2C6A4D/;
my $enh  = slurp("$dir/_enh-layer.html");
my $pt   = slurp($ptf);
die "بذورٌ غير مملوءة في $ptf\n" if $pt =~ /⟦/;
$enh =~ s/\s+\z//; $pt =~ s/\s+\z//;

my @L = ($data =~ /[^\n]*\n|[^\n]+/g);
my ($tabs_i, $sec1_i);
for my $i (0..$#L){
  $tabs_i = $i if !defined($tabs_i) && $L[$i] =~ /<div class="tabs">/;
  $sec1_i = $i if !defined($sec1_i) && $L[$i] =~ /<!--\s+\S+\s+1\)/;
}
die "لم أجد <div class=\"tabs\">\n" unless defined $tabs_i;
die "لم أجد تعليق القسم 1)\n" unless defined $sec1_i;

# احقن لوحة «التحضير» + الطبقة قبل تعليق القسم 1) ، والزرّ بعد فتح التبويبات
my @out;
for my $i (0..$#L){
  if ($i == $sec1_i){ push @out, "$enh\n\n", "$pt\n\n"; }
  push @out, $L[$i];
  if ($i == $tabs_i){ push @out, "    <button class=\"tab\" data-p=\"ptahdir\">التحضير والخلفية</button>\n"; }
}
my $res = join('', @out);

# فحوصٌ سريعة
my $ptabs = () = ($res =~ /data-p="ptahdir"/g);
my $ppanel = () = ($res =~ /id="ptahdir"/g);
open my $o,'>:raw',$out or die "write $out: $!"; print $o $res; close $o;
print "حُقِن $src → $out  |  زرّ ptahdir=$ptabs · لوحة ptahdir=$ppanel · +".length($res)."-".length($data)." بايت\n";
warn "تحذير: علامة ⟦ باقية!\n" if $res =~ /⟦/;
