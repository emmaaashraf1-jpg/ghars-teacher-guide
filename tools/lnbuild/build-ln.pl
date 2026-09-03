#!/usr/bin/perl
# بناء درسٍ من قالب «الليل والنهار» المشترك + ملفّ بياناته .dat
# الاستعمال: perl build-ln.pl <data.dat> <out.html> [tpl_dir]
use strict; use warnings;
binmode STDOUT, ':raw';
my ($datf,$out,$dir) = @ARGV;
die "الاستعمال: perl build-ln.pl <data.dat> <out.html> [tpl_dir]\n" unless $datf && $out;
$dir //= '.';

sub slurp { my $f=shift; open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $s=<$x>; close $x; $s }

my $head = slurp("$dir/_ln-head.tpl");
my $tail = slurp("$dir/_ln-tail.tpl");

# تحليل .dat: علامةٌ @@NAME في سطرٍ مستقلّ، والقيمة كلُّ ما يليها حتى العلامة التالية
my $raw = slurp($datf);
my @lines = ($raw =~ /[^\n]*\n|[^\n]+/g);
my (%F,$cur);
for my $ln (@lines){
  if ($ln =~ /^\@\@(\w+)\r?\n?$/){ $cur=$1; $F{$cur}//=''; }
  elsif (defined $cur){ $F{$cur} .= $ln; }
}
my %inline = map {$_=>1} qw(PAGE_TITLE COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT);
for my $k (keys %F){ if($inline{$k}){ $F{$k} =~ s/\r?\n\z//; } }

# تحقّقٌ من الحقول المطلوبة
my @need = qw(COVER_IMG COVER_BADGE COVER_TITLE COVER_META FOOT
              P_PTAHDIR P_P1 P_P2 P_P3 P_P4 P_P5 P_P6 P_P7 P_P8 P_P9);
my @miss = grep { !defined $F{$_} } @need;
die "حقولٌ ناقصة في $datf: @miss\n" if @miss;

# ملء الغلاف
$head =~ s/\{\{PAGE_TITLE\}\}/$F{PAGE_TITLE}/ if defined $F{PAGE_TITLE};
$head =~ s/\{\{COVER_IMG\}\}/$F{COVER_IMG}/;
$head =~ s/\{\{COVER_BADGE\}\}/$F{COVER_BADGE}/s;
$head =~ s/\{\{COVER_TITLE\}\}/$F{COVER_TITLE}/s;
$head =~ s/\{\{COVER_META\}\}/$F{COVER_META}/s;
$tail =~ s/\{\{FOOT\}\}/$F{FOOT}/s;

my $body = join('', map { $F{$_} } qw(P_PTAHDIR P_P1 P_P2 P_P3 P_P4 P_P5 P_P6 P_P7 P_P8 P_P9));

# تحذيرٌ من علاماتٍ غير محلولة
my $full = $head.$body.$tail;
my @un = ($full =~ /\{\{(\w+)\}\}/g);
warn "تحذير: علاماتٌ غير محلولة: @un\n" if @un;
my $todo = () = ($full =~ /⟦/g);
warn "تحذير: تبويب «التحضير» غير مكتمل — $todo موضعَ تأليفٍ (علامة ⟦⟧) لا يزال قائمًا\n" if $todo;

open my $o,'>:raw',$out or die "write $out: $!"; print $o $full; close $o;
print "بُني $out (".length($full)." بايت)\n";
