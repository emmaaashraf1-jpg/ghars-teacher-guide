#!/usr/bin/perl
# يَسِمُ أحدَ خيارَي الركن في p9 بشارة «الركن الموصى به» (والآخرَ «بديلٌ جاهز»).
# الاستعمال: perl add-arkan-badge.pl <lesson.html> <1|2>   (رقمُ الخيار الموصى به)
use strict; use warnings;
binmode STDOUT, ':raw';
my ($src,$rec) = @ARGV;
die "الاستعمال: perl add-arkan-badge.pl <lesson.html> <1|2>\n" unless $src && ($rec eq '1' || $rec eq '2');
open my $x,'<:raw',$src or die "open $src: $!"; local $/; my $h=<$x>; close $x;
if ($h =~ /الركن الموصى به/){ print "$src: مَوسومٌ سلفًا — يُخطّى\n"; exit }

my %ar = (1=>'١', 2=>'٢');
my $alt = $rec eq '1' ? '2' : '1';
my $recBadge = "\n          <div style=\"display:inline-block;margin-top:7px;background:#1F4A39;color:#fff;border-radius:8px 6px 9px 7px/7px 9px 6px 8px;padding:3px 10px;font-size:11px;font-weight:800\">الركن الموصى به</div>\n          <div style=\"margin-top:6px;font-size:11.5px;color:#3f5a4e;line-height:1.6\">الأقربُ إلى المعنى المركزيّ، وأبسطُ أدواتٍ، وأوضحُ مخرجًا في ثلاث دقائق.</div>";
my $altBadge = "\n          <div style=\"display:inline-block;margin-top:7px;background:#faf5e9;color:#8a6d2a;border:1px solid #e6d6ae;border-radius:8px 6px 9px 7px/7px 9px 6px 8px;padding:3px 10px;font-size:11px;font-weight:800\">بديلٌ جاهز</div>";

sub tag { my ($opt,$badge,$ref)=@_;
  my $re = qr/(<div style="font-weight:700;color:#1F4A39;font-size:14\.5px;line-height:1\.6">خيار $ar{$opt} ·.*?<\/div>)/s;
  $$ref =~ s/$re/$1$badge/ or die "$src: لم أجد صندوق خيار $ar{$opt}\n";
}
tag($rec,$recBadge,\$h);
tag($alt,$altBadge,\$h);

open my $o,'>:raw',$src or die "write $src: $!"; print $o $h; close $o;
print "$src: وُسِم الخيارُ $ar{$rec} موصًى به ✓\n";
