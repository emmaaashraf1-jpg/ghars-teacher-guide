#!/usr/bin/perl
# يضيف «ورقة اليوم للطباعة» إلى درسٍ:
#   • زرٌّ في رأس الصفحة (قبل شريط التبويبات) يستدعي window.print()
#   • كتلة <style>@media print</style> قبل </body> تُظهر ثلاثة أقسامٍ فقط على A4:
#     بوصلة اللقاء (سؤال التركيز + المعيار) · ورقة التدريس السريعة · التغذية الراجعة بالإجابات
# لا يمسّ أيَّ لوحةٍ قائمة، وآمنٌ للتكرار (يتخطّى إن وُجد الوسم).
# الاستعمال: perl add-dayprint.pl <lesson.html>   (يعدّل في مكانه)
use strict; use warnings;
binmode STDOUT, ':raw';
my $src = shift or die "الاستعمال: perl add-dayprint.pl <lesson.html>\n";
open my $x,'<:raw',$src or die "open $src: $!"; local $/; my $h=<$x>; close $x;

if ($h =~ /ورقة اليوم للطباعة/){ print "$src: مضافةٌ سلفًا — تُخطّى\n"; exit }

my $btn = <<'BTN';
  <!-- ورقة اليوم للطباعة (الطبقة الثانية) -->
  <div class="dayprint-bar" style="text-align:center;margin:10px 0 0"><button type="button" class="linkbtn" onclick="window.print()" style="cursor:pointer">ورقة اليوم للطباعة</button></div>

BTN

my $css = <<'CSS';
<style>
/* ═══════════ ورقة اليوم للطباعة — الطبقة الثانية (المرحلة د) ═══════════ */
@media print{
  @page{size:A4 portrait;margin:12mm}
  body *{display:none!important}
  .wrap,#p1{display:block!important}
  body :has(.lhero),body :has(.quick-sheet),body :has(.card.feedback){display:block!important}
  .lhero,.quick-sheet,.card.feedback{display:block!important}
  .lhero *,.quick-sheet *,.card.feedback *{display:revert!important}
  .cover,.cover-main,.cover-l,.cover-l h1{display:block!important}
  .cover-photo,.cover-r,.c-badge,.c-meta{display:none!important}
  .cover{height:auto!important;min-height:0!important;background:none!important;box-shadow:none!important;padding:0!important;margin:0 0 10px!important;border:0!important;position:static!important}
  .cover-main{padding:0!important;background:none!important;box-shadow:none!important}
  .cover-l h1{font-family:var(--fd);font-size:16pt;line-height:1.45;color:#000;margin:0 0 10px}
  .lhero{margin:0 0 10px!important}
  .quick-sheet,.card.feedback,.lh{break-inside:avoid;box-shadow:none!important;border:1px solid #cbd5cc!important;margin:0 0 10px!important}
  .wrap{max-width:none!important;margin:0!important;padding:0!important}
  body{background:#fff!important;color:#000}
  a[href]:after{content:""!important}
}
</style>
CSS

# 1) زرّ الطباعة قبل شريط التبويبات
my $tabanchor = qr/(\n[ \t]*(?:<!-- =+ التبويبات =+ -->\n[ \t]*)?<div class="tabs">)/;
unless ($h =~ s/$tabanchor/\n$btn$1/){
  die "$src: لم أجد شريط التبويبات <div class=\"tabs\">\n";
}

# 2) كتلة الطباعة قبل </body>
unless ($h =~ s/(\n[ \t]*<\/body>)/\n$css$1/){
  die "$src: لم أجد </body>\n";
}

open my $o,'>:raw',$src or die "write $src: $!"; print $o $h; close $o;
my $p=()=($h=~/ورقة اليوم للطباعة/g);
print "$src: أُضيفت ورقة اليوم ✓ (وسم=$p)\n";
