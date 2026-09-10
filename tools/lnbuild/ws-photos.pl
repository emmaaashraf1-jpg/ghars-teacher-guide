#!/usr/bin/perl
# يستبدل الأيقونات الرمزية (svg) في أوراق العمل بمواضعِ صورٍ حقيقية.
# لا يمسّ إلّا العناصرَ المصوَّرة المذكورة في ملفّ البيانات (المفاهيم/السلوكيّات/الخطوات/المشاهد تبقى كما هي).
# صيغة البيانات (بايت خام UTF-8، سطرٌ لكلٍّ): <النصّ كما في .t/.nm أو بعد مسافة>|<اسم الملف>|<اسمٌ قصيرٌ للإطار>
# الاستعمال: perl ws-photos.pl <file.html> <data.txt> <img-dir-rel>
# المطابقة محصّنة: تلتقط svg واحدًا (أيّ viewBox، مهما امتدّ على أسطر) دون تجاوز </svg> فلا تعبر حدودَ البطاقة،
# وتُشترط أن يليَه مباشرةً نصُّ العنصر (بوّابة التسمية) فلا يُمسّ إلّا ما نريد.
use strict; use warnings;
binmode STDOUT, ':raw';
my ($file,$data,$dir) = @ARGV;
die "الاستعمال: perl ws-photos.pl <file.html> <data.txt> <img-dir-rel>\n" unless $file && $data && $dir;
$dir =~ s{/$}{};
open my $d,'<:raw',$data or die "open $data: $!"; my @rows=<$d>; close $d;
open my $x,'<:raw',$file or die "open $file: $!"; local $/; my $h=<$x>; close $x;
my $done=0; my @hit;
for my $r (@rows){
  $r =~ s/\x0D?\x0A\z//; next if $r =~ /^\s*$/; next if $r =~ /^\s*#/;
  my ($label,$fn,$short) = split /\|/, $r, 3;
  next unless defined $fn && length $fn;
  next unless -e "$dir/$fn";   # تخطَّ ما لم تصل صورتُه بعد (تسليمٌ تدريجيّ)
  $short = $label unless defined $short && length $short;
  my $slot = qq{<div class="ph"><img src="$dir/$fn" alt="$label" onerror="this.style.display='none';this.closest('.ph').classList.add('noimg')"/><span class="ph-lbl">صورة: $short</span></div>};
  my $n = ($h =~ s{<svg\b[^>]*viewBox="0 0 \d+ \d+"[^>]*>(?:(?!</svg>).)*?</svg>(?=\s*(?:<div class="(?:t|nm|w)">|\x20)\Q$label\E</div>)}{$slot}gs);
  if($n){ $done+=$n; push @hit,"$label\x{d7}$n"; }
}
open my $o,'>:raw',$file or die "write $file: $!"; print $o $h; close $o;
binmode STDOUT,':encoding(UTF-8)';
print "$file: مواضعُ مُدرجة=$done";
print @hit ? " · [".join(" · ",@hit)."]\n" : "\n";
