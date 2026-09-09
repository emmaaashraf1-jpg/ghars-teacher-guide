#!/usr/bin/perl
# يضيف قواعد CSS لموضع الصورة (.ph) قبل </style> إن كان الملفّ يحوي بطاقةَ صورة (class="ph")
# ولا يحوي القاعدة بعد. آمنٌ للتكرار (idempotent).
use strict; use warnings;
binmode STDOUT,':encoding(UTF-8)';
my $css = <<'CSS';
.ph{width:100%;height:82px;border-radius:9px;background:#f5f1e8;border:1px solid #e2d7bf;box-shadow:inset 0 0 0 2px #fff;position:relative;overflow:hidden;margin:0 auto}
.ph .ph-lbl{position:absolute;inset:0;z-index:1;display:none;place-items:center;font-size:10px;color:#b9ab8c;text-align:center;padding:2px}
.ph.noimg .ph-lbl{display:grid}
.ph img{position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover;display:block;background:#f5f1e8}
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
