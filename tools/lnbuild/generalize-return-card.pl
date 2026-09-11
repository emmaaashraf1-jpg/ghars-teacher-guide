#!/usr/bin/perl
# generalize-return-card.pl — (س-٤) يعمّم «بطاقة العودة من البيت» على دروس الليل والنهار:
# يحوّل صندوقَ ln المدمج (.card.par > .h/.hs/.after) إلى صيغة القياس القائمة في الـ٧٩ درسًا الأخرى
# (sec-head بأيقونة «تحضيرات ولي الأمر» + h2 + card بـinfo قياسيّة + steps)، مع **حفظ محتوى ln**
# (المهمّة البيتيّة + استثمارها) حرفيًّا. لا يخترع نصًّا. مُعادُ التشغيل بلا أثر.
# الاستعمال: perl tools/lnbuild/generalize-return-card.pl ln-*.html
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';

my $INFO = 'مهمّةٌ صغيرةٌ تخرج مع الطفل إلى البيت وتعود معه في اللقاء التالي، فتصل تعلّمَ اليوم بالغد وتُشرك الأسرة.';
my ($done,$skip)=(0,0);
for my $file (@ARGV){
  next if $file =~ /(print|cards)/;
  my $h; { open my $F,'<:raw',$file or do{warn "open $file\n";next}; local $/; $h=decode_utf8(scalar<$F>); }
  next unless $h =~ /<div class="h">\s*بطاقةُ العودة من البيت<\/div>/;   # لا صندوق ln ⟵ تخطٍّ
  my $n = ($h =~ s{
      <div\ class="[^"]*par[^"]*"[^>]*>\s*
      <div\ class="h">\s*بطاقةُ\ العودة\ من\ البيت</div>\s*
      <div\ class="hs">(.*?)</div>\s*
      <div\ class="after">(.*?)</div>\s*
      </div>
    }{
      build_std($1,$2)
    }gexs);
  if($n){
    open my $O,'>:raw',$file or do{warn "write $file\n";next}; print $O encode_utf8($h); close $O;
    $done++; print "✓ $file — عُمّمت البطاقة ($n)\n";
  } else { $skip++; warn "⚠ $file: وُجد صندوقُ ln لكن لم يُطابق البناءُ المتوقّع\n"; }
}
print "المجموع: عُمّم=$done · تُخطّي/سليم=$skip\n";

sub build_std {
  my ($hs,$after) = @_;
  # المهمّة: مضمونُ الـspan الثاني في .hs (يُبقي <b>…</b>)
  my $task = $hs; $task =~ s{<span class="n">.*?</span>\s*}{}s; $task =~ s{^\s*<span[^>]*>}{}s; $task =~ s{</span>\s*$}{}s;
  $task =~ s/^\s+|\s+$//g;
  # الاستثمار: من .after بعد إزالة السهم والتصدير
  my $inv = $after; $inv =~ s/^\s*←\s*//; $inv =~ s/^تُستثمَر في افتتاح لقاء الغد:\s*//; $inv =~ s/^\s+|\s+$//g;
  return
    qq{<div class="sec-head"><div class="num"><i class="gi" data-i="تحضيرات ولي الأمر" data-size="22"></i></div><h2>بطاقة العودة من البيت</h2><div class="rule"></div></div>\n}
   .qq{    <div class="card">\n}
   .qq{      <div class="info">$INFO</div>\n}
   .qq{      <ul class="steps">\n}
   .qq{        <li><b>ما يفعله في البيت:</b> $task</li>\n}
   .qq{        <li><b>استثمارها في افتتاح الغد:</b> $inv</li>\n}
   .qq{      </ul>\n}
   .qq{    </div>};
}
