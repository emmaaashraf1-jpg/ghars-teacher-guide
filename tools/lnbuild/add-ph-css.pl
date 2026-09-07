#!/usr/bin/perl
# يُدرج CSS «موضع الصورة» (.ph) بعد سطر .foot في حزمة الطباعة. آمنٌ للتكرار.
use strict; use warnings;
binmode STDOUT, ':raw';
my $f = shift or die "usage: perl add-ph-css.pl <file.html>\n";
open my $x,'<:raw',$f or die "open $f: $!"; local $/; my $h=<$x>; close $x;
if ($h =~ /\.ph \.ph-lbl/){ print "$f: موجودٌ سلفًا\n"; exit }
my $anchor = '.foot{margin-top:12px;text-align:center;font-size:12px;color:var(--muted)}';
my $css = $anchor."\n"
 .'.ph{width:100%;height:92px;border-radius:9px;background:#f5f1e8;border:1px solid #e2d7bf;box-shadow:inset 0 0 0 2px #fff;position:relative;overflow:hidden}'."\n"
 .'.ph .ph-lbl{position:absolute;inset:0;z-index:1;display:none;place-items:center;font-size:10.5px;color:#b9ab8c;font-family:var(--fb);text-align:center;padding:2px}'."\n"
 .'.ph.noimg .ph-lbl{display:grid}'."\n"
 .'.ph img{position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover;display:block;background:#f5f1e8}'."\n"
 .'@media print{.ph{-webkit-print-color-adjust:exact;print-color-adjust:exact}}';
my $n = ($h =~ s/\Q$anchor\E/$css/);
die "$f: لم أجد مرسى .foot\n" unless $n;
open my $o,'>:raw',$f or die; print $o $h; close $o;
print "$f: أُدرج .ph CSS ✓\n";
