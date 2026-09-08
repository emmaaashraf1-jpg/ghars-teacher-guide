#!/usr/bin/perl
# يستبدل الأيقونات الرمزية (svg 64×64) في أوراق العمل بمواضعِ صورٍ حقيقية.
# لا يمسّ إلّا العناصرَ المصوَّرة المذكورة في ملفّ البيانات (المفاهيم والمشاهد تبقى كما هي).
# صيغة البيانات (بايت خام UTF-8، سطرٌ لكلٍّ): <النصّ كما في .t أو بعد svg>|<اسم الملف>|<اسمٌ قصيرٌ للإطار>
# الاستعمال: perl ws-photos.pl <file.html> <data.txt> <img-dir-rel>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($file,$data,$dir,$vb) = @ARGV;
die "الاستعمال: perl ws-photos.pl <file.html> <data.txt> <img-dir-rel> [viewBox=\"64 64\"]\n" unless $file && $data && $dir;
$dir =~ s{/$}{};
$vb = '64 64' unless defined $vb && length $vb;
open my $d,'<:raw',$data or die "open $data: $!"; my @rows=<$d>; close $d;
open my $x,'<:raw',$file or die "open $file: $!"; local $/; my $h=<$x>; close $x;
my $done=0; my @miss;
for my $r (@rows){
  $r =~ s/\x0D?\x0A\z//; next if $r =~ /^\s*$/;
  my ($label,$fn,$short) = split /\|/, $r, 3;
  next unless defined $short;
  my $slot = qq{<div class="ph"><img src="$dir/$fn" alt="$label" onerror="this.style.display='none';this.closest('.ph').classList.add('noimg')"/><span class="ph-lbl">صورة: $short</span></div>};
  # يُستبدل svg الذي يليه مباشرةً هذا العنصرُ (في .pc عبر <div class="t"> أو في .mc بعد مسافة)
  my $n = ($h =~ s{<svg viewBox="0 0 \Q$vb\E">[^\n]*?</svg>(?=\s*(?:<div class="t">|\x20)\Q$label\E</div>)}{$slot}g);
  if($n){ $done+=$n; } else { push @miss,$label; }
}
open my $o,'>:raw',$file or die "write $file: $!"; print $o $h; close $o;
print "$file: مواضعُ صورٍ مُدرجة=$done";
print @miss ? " · لم تُطابَق: ".join(" · ",@miss)."\n" : "\n";
