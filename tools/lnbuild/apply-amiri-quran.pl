#!/usr/bin/perl
# apply-amiri-quran.pl — كلماتُ القرآن بخطّ الأميري (أقربُ لرسم المصحف):
#   ١) يغلّف كلَّ ﴿…﴾ في <span class="qv"> (نصٌّ خالصٌ لا وسمَ فيه، فآمن)
#   ٢) يحمّل خطّ الأميري (Google Fonts، كالرئيسيّة)
#   ٣) يضبط .qv/.ayah/.ayah-cell/.lafz على 'Amiri'
# مُعادُ التشغيل بلا أثر (حارس id="qv-amiri").
# الاستعمال: perl tools/lnbuild/apply-amiri-quran.pl <files...>
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';
my $O = chr(0xFD3F); my $C = chr(0xFD3E);   # ﴿ ﴾
my ($done,$skip,$wraps)=(0,0,0);
for my $file (@ARGV){
  my $h; { open my $F,'<:raw',$file or do{warn "open $file\n";next}; local $/; $h=decode_utf8(scalar<$F>); }
  if($h =~ /id="qv-amiri"/){ $skip++; next; }   # مُطبَّقٌ سلفًا

  # ١) غلاف الآيات (لا تُغلَّف ما هو داخل قوسٍ سلفًا)
  my $n = ($h =~ s{(?<!<span class="qv">)(\Q$O\E(?:(?!\Q$O\E).)*?\Q$C\E)}{<span class="qv">$1</span>}gs);
  $wraps += $n;

  # ٢) رابط خطّ الأميري (إن غاب)
  unless($h =~ /fonts\.googleapis\.com[^"']*family=Amiri/){
    $h =~ s{(</head>)}{<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght\@400;700&display=swap"/>\n$1}s;
  }

  # ٣) قاعدةُ الأميري لكلمات القرآن
  my $css = q{<style id="qv-amiri">.qv,.ayah,.ayah-cell,.lafz,.aya{font-family:'Amiri','Noto Naskh Arabic',serif!important}}
           . q{.wcard,.wcard.g,.wcard.a,.wcard.p{background:#fff!important;box-shadow:none!important}}
           . q{.mcard2.aya,.aya.mcard2{background:#fff!important;box-shadow:none!important}</style>};
  $h =~ s{(</head>)}{$css\n$1}s or do{ warn "$file: لا </head>\n"; next; };

  open my $Oo,'>:raw',$file or do{warn "write $file\n";next}; print $Oo encode_utf8($h); close $Oo;
  $done++; print "✓ $file — آيات مُغلَّفة=$n\n";
}
print "المجموع: عُولِج=$done · تُخطّي=$skip · إجماليّ الآيات المُغلَّفة=$wraps\n";
