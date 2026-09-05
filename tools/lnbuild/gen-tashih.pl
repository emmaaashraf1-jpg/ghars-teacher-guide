#!/usr/bin/perl
# يُدرج بند «تصحيح فهم الطفل» (خطوةٌ في سير الدرس) قبل الجملة الختاميّة.
# صيغة البيانات (بايت خام UTF-8، سطرٌ لكلّ درس):
#   @<basename>|<نصّ تصحيح الفهم>
# الاستعمال: perl gen-tashih.pl <data.txt>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($data) = @ARGV;
die "الاستعمال: perl gen-tashih.pl <data.txt>\n" unless $data;
open my $in,'<:raw',$data or die "open $data: $!";
my @lines=<$in>; close $in;
my ($ok,$skip,$err)=(0,0,0);
for my $ln (@lines){
  $ln =~ s/\x0D?\x0A\z//;
  next if $ln =~ /^\s*$/;
  unless ($ln =~ /^\@([^|]+)\|(.*)$/){ warn "line not understood: $ln\n"; next; }
  my ($name,$text)=($1,$2);
  die "بذرة غير مملوءة في $name\n" if $text =~ /\xE2\x9F\xA6/;
  my $file = "$name.html";
  unless (-f $file){ warn "MISSING $file\n"; $err++; next; }
  open my $x,'<:raw',$file or die "open $file: $!";
  local $/; my $h=<$x>; close $x;
  if ($h =~ /تصحيح فهم الطفل/){ print "$name: مضافٌ سلفًا — يُخطّى\n"; $skip++; next; }
  my $step = '          <div class="step"><b class="k"> تصحيح فهم الطفل:</b> '.$text.'</div>';
  my $anchor = qr/([ \t]*<div class="step"><b class="k">[^<]*(?:الجملة الختامية|جملة اللقاء الختامية)[^<]*<\/b>)/;
  unless ($h =~ s/$anchor/$step\n$1/){
    warn "$name: لم أجد مرسى الجملة الختاميّة — لم يُدرَج\n"; $err++; next;
  }
  open my $o,'>:raw',$file or die "write $file: $!"; print $o $h; close $o;
  print "$name: تصحيح فهم الطفل +\n"; $ok++;
}
print "OK=$ok skip=$skip err=$err\n";
