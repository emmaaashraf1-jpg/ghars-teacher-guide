#!/usr/bin/perl
# يضيف قواعد CSS لموضع الصورة (.ph) قبل </style> إن كان الملفّ يحوي بطاقةَ صورة (class="ph")
# ولا يحوي القاعدة بعد. آمنٌ للتكرار (idempotent).
use strict; use warnings;
binmode STDOUT,':encoding(UTF-8)';
my $css = <<'CSS';
.ph{width:fit-content;max-width:100%;margin:0 auto;border-radius:9px;overflow:hidden;line-height:0;background:#fff;border:1px solid #e2d7bf}
.ph .ph-lbl{display:none}
.ph.noimg{width:100%;height:90px;background:#f5f1e8}
.ph.noimg .ph-lbl{display:grid;place-items:center;height:100%;font-size:10px;color:#b9ab8c;text-align:center;padding:3px;line-height:1.3}
.ph img{display:block;height:90px;width:auto;max-width:100%;object-fit:contain;background:#fff}
@media print{.ph{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
CSS
for my $file (@ARGV){
  open my $x,'<:raw',$file or die "open $file: $!"; local $/; my $h=<$x>; close $x;
  next unless $h =~ /class="ph"/;            # لا يحوي مواضعَ صور
  next if $h =~ /\.ph\{[^}]*position:relative/; # القاعدة موجودة
  unless($h =~ s{(\n\s*)</style>}{$1$css$1</style>}){ print "$file: لم يُعثر على </style>\n"; next; }
  open my $o,'>:raw',$file or die "write $file: $!"; print $o $h; close $o;
  print "$file: أُضيفت قواعد .ph\n";
}
