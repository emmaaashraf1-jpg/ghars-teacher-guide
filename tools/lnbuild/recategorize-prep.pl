#!/usr/bin/perl
# يُرقّي «قائمة تجهيز اللقاء» من بطاقةٍ واحدة إلى تصنيفٍ أغنى (٤ فئات) بحسب نوع كلّ بند.
# الاستعمال: perl recategorize-prep.pl <fragment.ptahdir.html>  (يعدّل الفراغمة في مكانها)
use strict; use warnings;
binmode STDOUT, ':raw';
my $frag = shift or die "الاستعمال: perl recategorize-prep.pl <fragment>\n";
open my $x,'<:raw',$frag or die "open $frag: $!"; local $/; my $f=<$x>; close $x;

# عكسيّة: إن رُقّيت سلفًا تُخطّى
if ($f =~ /يُطبع ويُقصّ ويُغلَّف/){ print "$frag: مُرقّاةٌ سلفًا\n"; exit }

# التقط بطاقة التجهيز الواحدة (احفظ الالتقاط فورًا قبل أيّ مطابقةٍ لاحقة)
unless ($f =~ /(<div class="card"><div class="lbl">يُطبع ويُجهَّز<\/div><ul class="steps">)(.*?)(<\/ul><\/div>)/s){
  print "$frag: لا بطاقةَ تجهيزٍ نمطيّة — تُخطّى\n"; exit;
}
my ($pre,$inner,$post) = ($1,$2,$3);
my $orig = $pre.$inner.$post;

# اقسم إلى عناصر <li>...</li>
my @lis = ($inner =~ /(<li>.*?<\/li>)/gs);
unless (@lis){ print "$frag: لا عناصر — تُخطّى\n"; exit }

my (@print,@audio,@place,@activity);
for my $li (@lis){
  # سطرُ «موادّ النشاط» يُصنَّف أولًا مهما حوى من كلمات (لابتوب/عارض/تلاوة) لأنّه بندُ النشاط قطعًا
  if    ($li =~ /موادُّ النشاط المصاحب/){ push @activity, $li }
  elsif ($li =~ /مكبّرُ صوتٍ|تلاوة|تسجيل|نشيد|أنشودة/){ push @audio, $li }
  elsif ($li =~ /عارضٌ \(شاشة|بروجكتر| لابتوب/){ push @place, $li }
  else  { push @print, $li }
}

sub card { my ($lbl,@items)=@_; return '' unless @items; return '<div class="card"><div class="lbl">'.$lbl.'</div><ul class="steps">'.join('',@items).'</ul></div>'; }
my $rebuilt = '';
$rebuilt .= card('يُطبع ويُقصّ ويُغلَّف', @print);
$rebuilt .= "\n    " . card('يُهيَّأ صوتيًّا (سمّاعة/تلاوة)', @audio) if @audio;
$rebuilt .= "\n    " . card('يُجهَّز في المكان (العرض)', @place) if @place;
$rebuilt .= "\n    " . card('أدوات النشاط المصاحب', @activity) if @activity;

$f =~ s/\Q$orig\E/$rebuilt/s or die "$frag: تعذّر الاستبدال\n";

open my $o,'>:raw',$frag or die "write $frag: $!"; print $o $f; close $o;
printf "%s: طُبع=%d · صوت=%d · مكان=%d · نشاط=%d\n", $frag, scalar(@print), scalar(@audio), scalar(@place), scalar(@activity);
