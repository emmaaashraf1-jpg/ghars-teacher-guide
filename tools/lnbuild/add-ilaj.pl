#!/usr/bin/perl
# يحقن تبويبَ «العلاج والإثراء» في درسٍ مُحسَّنٍ سلفًا:
#   • زرُّ تبويبٍ مباشرةً بعد زرِّ «التقويم» (data-p="p3")
#   • لوحةٌ مستقلّة (id="pilaj") قبل تعليق القسم «4) الآداب الصفية»
# لا يمسّ أيَّ لوحةٍ قائمة، وآمنٌ للتكرار (يستبدل ولا يضاعف).
# الاستعمال: perl add-ilaj.pl <lesson.html> <ilaj-fragment.html> <out.html>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$frg,$out) = @ARGV;
die "الاستعمال: perl add-ilaj.pl <lesson.html> <ilaj.html> <out.html>\n" unless $src && $frg && $out;
sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $data = slurp($src);
my $pan  = slurp($frg);
die "بذورٌ غير مملوءة في $frg\n"                     if $pan  =~ /\xE2\x9F\xA6/;      # ⟦
die "الدرس غير مُحسَّن (لا لوحة ptahdir): $src\n"     unless $data =~ /id="ptahdir"/;
die "لا توجد لوحة التقويم (p3) في: $src\n"            unless $data =~ /id="p3"/;
die "الفراغمة لا تحوي لوحة pilaj\n"                   unless $pan  =~ /id="pilaj"/;
$pan =~ s/\s+\z//;

my @L = ($data =~ /[^\n]*\n|[^\n]+/g);

# ── 1) تنظيف: إزالةُ اللوحة والزرّ السابقَين إن وُجدا
@L = grep { $_ !~ /data-p="pilaj"/ } @L;
my ($pb,$pe);
for my $i (0..$#L){
  $pb = $i if !defined($pb) && $L[$i] =~ /<div class="panel" id="pilaj"/;
  if (defined($pb) && !defined($pe) && $i>$pb && $L[$i] =~ /<!--\s+\S+\s+4\)/){ $pe = $i; last }
}
if (defined($pb)) {
  my $s = $pb;
  $s-- while $s>0 && $L[$s-1] =~ /^\s*<!--.*-->\s*$/;          # ابتلاع تعليق العنوان فقط
  $pe = $pb+1 unless defined $pe;
  splice(@L, $s, $pe-$s);
}

# ── 2) حقنُ زرِّ التبويب بعد «التقويم»
my $tabline = '    <button class="tab" data-p="pilaj">العلاج والإثراء</button>' . "\n";
my $tabdone = 0;
for my $i (0..$#L){
  next unless $L[$i] =~ /<button[^>]*data-p="p3"/;
  splice(@L, $i+1, 0, $tabline); $tabdone = 1; last;
}
die "لم أجد زرَّ تبويب التقويم (data-p=\"p3\")\n" unless $tabdone;

# ── 3) حقنُ اللوحة قبل تعليق القسم «4)»
my $pandone = 0;
for my $i (0..$#L){
  next unless $L[$i] =~ /<!--\s+\S+\s+4\)/;
  splice(@L, $i, 0, "$pan\n\n"); $pandone = 1; last;
}
die "لم أجد تعليق القسم «4)»\n" unless $pandone;

my $res = join('', @L);

# ── فحوصٌ ختامية
my $pc = () = ($res =~ /id="pilaj"/g);
my $tc = () = ($res =~ /data-p="pilaj"/g);
die "بعد الحقن: لوحات pilaj=$pc (توقّعت 1)\n" unless $pc == 1;
die "بعد الحقن: أزرار pilaj=$tc (توقّعت 1)\n"  unless $tc == 1;
for my $id (qw(ptahdir p2 p3 p4 p5 p6 p7 p8 p9)) {
  my $n = () = ($res =~ /id="$id"/g);
  die "اختلّت لوحةٌ قائمة: $id عددها $n\n" unless $n == 1;
}
warn "تحذير: علامة ⟦ باقية!\n" if $res =~ /\xE2\x9F\xA6/;

open my $o,'>:raw',$out or die "write $out: $!"; print $o $res; close $o;
print "حُقن «العلاج والإثراء» في $src → $out  |  لوحات=$pc · أزرار=$tc · فرق=".(length($res)-length($data))." بايت\n";
