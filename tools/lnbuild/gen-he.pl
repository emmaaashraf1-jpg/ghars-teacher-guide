#!/usr/bin/perl
# المرحلة هـ: يُدرج وسمَ «الركن الموصى به»/«بديلٌ جاهز» + سطرَ التعليل + «بطاقة العودة من البيت».
# صيغة البيانات (بايت خام UTF-8):
#   @<basename>|<recIndex 1|2>
#   R|<سطر التعليل>
#   T|<بند العودة ١>
#   T|<بند العودة ٢>
#   T|<بند العودة ٣>
# الاستعمال: perl gen-he.pl <data.txt>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($data)=@ARGV;
die "الاستعمال: perl gen-he.pl <data.txt>\n" unless $data;
open my $in,'<:raw',$data or die "open $data: $!"; my @lines=<$in>; close $in;
my $REC='<span style="display:inline-block;margin-inline-start:8px;background:#EEF4F1;color:#1F4A39;border-radius:999px;padding:2px 11px;font-size:12.5px;font-weight:700;vertical-align:middle">الركن الموصى به</span>';
my $ALT='<span style="display:inline-block;margin-inline-start:8px;background:rgba(255,255,255,.20);color:#fff;border:1px solid rgba(255,255,255,.55);border-radius:999px;padding:2px 11px;font-size:12.5px;font-weight:700;vertical-align:middle">بديلٌ جاهز</span>';
my ($name,$rec,$rat,@ret,@blocks);
sub flush { push @blocks,{name=>$name,rec=>$rec,rat=>$rat,ret=>[@ret]} if defined $name; }
for my $ln (@lines){
  $ln=~s/\x0D?\x0A\z//; next if $ln=~/^\s*$/;
  if($ln=~/^\@([^|]+)\|([12])\s*$/){ flush(); $name=$1;$rec=$2;$rat=undef;@ret=(); }
  elsif($ln=~/^R\|(.*)$/){ $rat=$1; }
  elsif($ln=~/^T\|(.*)$/){ push @ret,$1; }
  else { die "line not understood: $ln\n"; }
}
flush();
my ($ok,$err)=(0,0);
for my $b (@blocks){
  my $file="$b->{name}.html";
  unless(-f $file){ warn "MISSING $file\n"; $err++; next; }
  die "بذرة غير مملوءة في $b->{name}\n" if join('',($b->{rat}//''),@{$b->{ret}}) =~ /\xE2\x9F\xA6/;
  open my $x,'<:raw',$file or die; local $/; my $h=<$x>; close $x;
  if($h=~/بطاقة العودة من البيت/){ print "$b->{name}: مضافٌ سلفًا — يُخطّى\n"; next; }
  my $bul=join("\n",map{"        <li>$_</li>"}@{$b->{ret}});
  my $card='    <div class="sec-head"><div class="num"><i class="gi" data-i="تحضيرات ولي الأمر" data-size="22"></i></div><h2>بطاقة العودة من البيت</h2><div class="rule"></div></div>'."\n"
          .'    <div class="card">'."\n"
          .'      <div class="info">مهمّةٌ صغيرةٌ تخرج مع الطفل إلى البيت وتعود معه في اللقاء التالي، فتصل تعلّمَ اليوم بالغد وتُشرك الأسرة.</div>'."\n"
          .'      <ul class="steps">'."\n".$bul."\n".'      </ul>'."\n".'    </div>';
  unless($h=~s/(\n[ \t]*)(<div class="wa-wrap">)/$1$card$1$2/){ warn "$b->{name}: لا مرسى wa-wrap\n"; $err++; next; }
  my $rc='    <div class="info" style="margin-top:8px"><b>الموصى به اليوم:</b> '.$b->{rat}.'</div>';
  unless($h=~s/([ \t]*<div class="corner">)/$rc\n$1/){ warn "$b->{name}: لا مرسى corner\n"; $err++; next; }
  my $cnt=0;
  my $n=($h=~s{(<div class="h" style="background:linear-gradient[^"]*"><h4>[^<]*</h4><span class="k">[^<]*</span>)</div>}{
      $cnt++; my $badge=($cnt==$b->{rec})?$REC:$ALT; "$1$badge</div>";
  }ge);
  unless($n==2){ warn "$b->{name}: عدد الرؤوس $n != 2 — تراجع يدويّ\n"; $err++; next; }
  open my $o,'>:raw',$file or die; print $o $h; close $o;
  print "$b->{name}: هـ + (موصى=corner$b->{rec})\n"; $ok++;
}
print "OK=$ok err=$err\n";
