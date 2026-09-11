#!/usr/bin/perl
# inject-sijil.pl — يحوّل عبارةَ «سجلّ ملاحظة الوحدة» في جملة .info تحت «سلّم الحكم»
# إلى رابطٍ نحو sijil-<unit>.html. لا يمسّ حرفًا غيرها. مُعادُ التشغيل بلا أثر.
# الاستعمال: perl tools/lnbuild/inject-sijil.pl   (يقرأ lessons.txt)
use strict; use warnings;
use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ":encoding(UTF-8)";

my %SLUG = (am=>"makhluq", ln=>"layl-nahar", mk=>"maskan", family=>"family");
my $PHRASE = "سجلّ ملاحظة الوحدة";
my $LEAD   = "تُملأ بعلامةٍ سريعة في ";       # سياقُ الجملة الوحيد المستهدَف

open my $L, "<:raw", "lessons.txt" or die "افتح lessons.txt: $!";
my @lessons = map { chomp; $_ } grep { /\S/ } <$L>; close $L;

my ($done, $already, @missing, @bad) = (0, 0);
for my $file (@lessons) {
  my ($prefix) = $file =~ /^(am|ln|mk|family)-/;
  my $slug = $prefix ? $SLUG{$prefix} : undef;
  unless ($slug) { push @bad, "بادئةٌ مجهولة: $file"; next; }

  open my $F, "<:raw", $file or do { push @bad, "تعذّر فتح $file"; next; };
  local $/; my $h = decode_utf8(scalar <$F>); close $F;

  if ($h =~ /href="sijil-/) { $already++; next; }              # مُنجَزٌ سلفًا — بلا أثر

  my $target = $LEAD . $PHRASE;                                  # الجملة المستهدفة كاملةً
  unless (index($h, $target) >= 0) { push @missing, $file; next; }

  my $anchor = qq{<a class="reflink" href="sijil-$slug.html" target="_blank" rel="noopener">$PHRASE</a>};
  my $n = ($h =~ s/\Q$LEAD$PHRASE\E/$LEAD$anchor/);
  if ($n != 1) { push @bad, "$file: عددُ الاستبدالات=$n (المتوقّع ١)"; next; }

  open my $O, ">:raw", $file or do { push @bad, "تعذّرت الكتابة $file"; next; };
  print $O encode_utf8($h); close $O;
  $done++;
}

print "حُقِن: $done · مُنجَزٌ سلفًا (تُخطّي): $already · إجماليّ: ".scalar(@lessons)."\n";
if (@missing) { print "⚠ الجملةُ المستهدفةُ غيرُ موجودة في ".scalar(@missing)." ملفّ:\n"; print "  · $_\n" for @missing; }
if (@bad)     { print "⚠ مشكلات:\n"; print "  · $_\n" for @bad; }
