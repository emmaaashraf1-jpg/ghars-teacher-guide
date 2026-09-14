#!/usr/bin/perl
use strict; use warnings; use utf8;
use open ':std', ':encoding(UTF-8)';

# ==== بيانات المؤشرات لكل فصل ====
my %terms = (
  1 => {
    title => 'الفصل الدراسيّ الأوّل',
    domains => [
      ['المجال المعرفيّ', [
        'يردّد مع المعلّمة (القرآن – الأذكار – الأحاديث – المنظومة)',
        'يحفظ مع المعلّمة (القرآن)',
        'يذكر اسمًا من أسماء الله الحسنى التي تعلّمها',
        'القدرة على التحدّث عن أعمالٍ قام بها أو شاهدها',
        'يذكر المفاهيم الأساسيّة عن دينه وخالقه',
        'يربط بين الكلمة والمفهوم',
      ]],
      ['المجال اللغويّ', [
        'مخارج حروفه سليمة',
        'يتحدّث بطلاقة',
        'يعبّر عن نفسه بكلماتٍ وجملٍ واضحة',
        'يجيد استخدام الكلمات في أماكنها',
        'يستخدم الجمع والمفرد بطريقةٍ صحيحة',
        'يتعرّف ويسمّي اسم الحرف',
        'يتتبّع بإصبعه على الحرف بطريقةٍ صحيحة',
        'يربط بين شكل الحرف وصوته',
        'يميّز أشكال الأحرف في مواقعها المختلفة',
        'يكتب الأحرف بطريقةٍ صحيحة',
        'ينسخ الأحرف بطريقةٍ صحيحة',
      ]],
      ['المجال الحركيّ', [
        'يستطيع القفز',
        'ينزل الدرج بتتالي القدمين',
        'يصعد الدرج بتتالي القدمين',
        'يستطيع التوازن والدوران',
        'يمسك القلم بطريقةٍ صحيحة',
        'الجري باعتدالٍ بما يناسب عمره',
        'يجيد التسلّق بين الألعاب',
      ]],
      ['المجال الاجتماعيّ', [
        'يعبّر عن مشاعره بوضوح',
        'يتشارك مع أقرانه اللعب',
        'يُصغي للغير',
        'يتحاور مع أقرانه',
        'يستخدم آداب الكلام (شكرًا، من فضلك..)',
        'المواظبة على الحضور',
        'يستخدم مهارات الاعتماد على النفس (تناول الطعام – دخول الحمّام – ربط الحذاء)',
        'الصحّة العامّة وتناول الوجبة',
        'الاهتمام بالنظافة والمظهر العامّ',
        'يستجيب لتوجيهات المعلّمة',
        'يذكر المعلومات الأساسيّة عن نفسه',
        'يشارك ويتفاعل في الصفّ',
        'يضبط انفعالاته',
        'يتعامل برفقٍ مع أقرانه',
        'يبدي رغبةً وقابليّةً للتعلّم',
        'مدى الالتزام بالقوانين',
      ]],
      ['المجال الإدراكيّ', [
        'القدرة على التركيز والإنصات لمدةٍ تتناسب مع عمره',
        'القدرة على ملاحظة عنصرٍ أو أكثر',
        'القدرة على إيجاد حلولٍ لمشكلةٍ ما',
        'القدرة على التصنيف حسب صفةٍ أو أكثر',
        'القدرة على المقارنة بالتشابه والاختلاف حسب صفتين أو أكثر (الشكل، اللون، الوزن)',
        'معرفة العلاقات الزمنيّة (صباحًا، ظهرًا، قبل، بعد، غدًا..)',
        'معرفة العلاقات المكانيّة (أمام، خلف، فوق، تحت، قريب، بعيد..)',
        'القدرة على التذكّر (أحداث – أشياء ..)',
        'يربط بين العدد والمعدود',
        'يكتب العدد بطريقةٍ صحيحة',
        'يعدّ من ( ) – ( )',
      ]],
    ],
  },
  2 => {
    title => 'الفصل الدراسيّ الثاني',
    domains => [
      ['المجال المعرفيّ', [
        'يردّد مع المعلّمة (القرآن – الأذكار – الأحاديث – المنظومة)',
        'يحفظ مع المعلّمة (القرآن)',
        'يذكر اسمًا من أسماء الله الحسنى التي تعلّمها',
        'القدرة على التحدّث عن أعمالٍ قام بها أو شاهدها',
        'يذكر المفاهيم الأساسيّة عن دينه وخالقه',
        'يربط بين الكلمة والمفهوم',
      ]],
      ['المجال اللغويّ', [
        'مخارج حروفه سليمة',
        'يتحدّث بطلاقة',
        'يعبّر عن نفسه بكلماتٍ وجملٍ واضحة',
        'يجيد استخدام الكلمات في أماكنها',
        'يسأل ويجيب على الأسئلة البسيطة بجملةٍ كاملة',
        'يستخدم الجمع والمفرد بطريقةٍ صحيحة',
        'يتعرّف ويسمّي اسم الحرف',
        'يتتبّع بإصبعه على الحرف بطريقةٍ صحيحة',
        'يربط بين شكل الحرف وصوته',
        'يميّز أشكال الأحرف في مواقعها المختلفة',
        'يكتب الأحرف بطريقةٍ صحيحة',
        'ينسخ الأحرف بطريقةٍ صحيحة',
        'يكتب الأعداد بطريقةٍ صحيحة',
        'ينسخ الأعداد بطريقةٍ صحيحة',
        'يتهجّى كلماتٍ (بالحركات الثلاثة، السكون، التنوين، الشدّة)',
      ]],
      ['المجال الحركيّ', [
        'يستطيع القفز',
        'ينزل الدرج بتتالي القدمين',
        'يصعد الدرج بتتالي القدمين',
        'يستطيع التوازن والدوران',
        'يمسك القلم بطريقةٍ صحيحة',
        'الجري باعتدالٍ بما يناسب عمره',
        'يجيد التسلّق بين الألعاب',
      ]],
      ['المجال الاجتماعيّ', [
        'يعبّر عن مشاعره بوضوح',
        'يتشارك مع أقرانه اللعب',
        'يُصغي للغير',
        'يتحاور مع أقرانه',
        'يُظهر استقلالًا وتوجيهًا لنفسه (يُنهي الأنشطة المختارة دون مساعدةٍ من الآخرين)',
        'يستخدم آداب الكلام (شكرًا، من فضلك..)',
        'المواظبة على الحضور',
        'يستخدم مهارات الاعتماد على النفس (تناول الطعام – دخول الحمّام – ربط الحذاء)',
        'الصحّة العامّة وتناول الوجبة',
        'الاهتمام بالنظافة والمظهر العامّ',
        'يستجيب لتوجيهات المعلّمة',
        'يذكر المعلومات الأساسيّة عن نفسه',
        'يشارك ويتفاعل في الصفّ',
        'يضبط انفعالاته',
        'يتعامل برفقٍ مع أقرانه',
        'يبدي رغبةً وقابليّةً للتعلّم',
        'مدى الالتزام بالقوانين',
      ]],
      ['المجال الإدراكيّ', [
        'القدرة على التركيز والإنصات لمدةٍ تتناسب مع عمره',
        'القدرة على ملاحظة عنصرٍ أو أكثر',
        'القدرة على إيجاد حلولٍ لمشكلةٍ ما',
        'القدرة على التصنيف حسب صفةٍ أو أكثر',
        'القدرة على المقارنة بالتشابه والاختلاف حسب صفتين أو أكثر (الشكل، اللون، الوزن)',
        'معرفة العلاقات الزمنيّة (صباحًا، ظهرًا، قبل، بعد، غدًا..)',
        'يرتّب الأشياء بتسلسلٍ واحد (اللون – الحجم – الشكل)',
        'معرفة العلاقات المكانيّة (أمام، خلف، فوق، تحت، قريب، بعيد..)',
        'القدرة على التذكّر (أحداث – أشياء ..)',
        'يربط بين العدد والمعدود',
        'يتحكّم بالأشياء بيديه مستخدمًا تآزر حركة اليد والعين (القصّ – اللصق – العجن – الفرد)',
        'يعدّ من (١) – (٣٠)',
        'يجمع ويطرح الأعداد ١–١٠',
      ]],
    ],
  },
);

my $domain_icons = { 'المجال المعرفيّ'=>'٠١','المجال اللغويّ'=>'٠٢','المجال الحركيّ'=>'٠٣','المجال الاجتماعيّ'=>'٠٤','المجال الإدراكيّ'=>'٠٥' };

sub sheet {
  my ($n) = @_;
  my $t = $terms{$n};
  my $out = qq{<section class="sheet">\n};
  # header
  $out .= qq{<header class="masthead">
  <div class="mast-brand"><img src="brand/logo-ghars.webp" alt="غرس القيم"><div><b>نادي غرس القيم للطفولة</b><span>المرحلة التمهيديّة · ٥–٦ سنوات</span></div></div>
  <div class="mast-title"><span class="mast-eyebrow">سجلّ قياس مهارات الطفل</span><h1>$t->{title}</h1></div>
</header>
<div class="pupil">
  <label>اسم الطفل / الطفلة<i></i></label>
  <label>مقدّمة الرعاية<i></i></label>
  <label class="pupil-sm">التاريخ<i></i></label>
</div>
<div class="legend"><span class="leg-t">مفتاح التقويم</span><em class="l-1">دائمًا</em><em class="l-2">أحيانًا</em><em class="l-3">إطلاقًا</em><span class="leg-note">ضعي علامة (✓) عند التقدير المناسب لكلّ مؤشّر.</span></div>
};
  for my $d (@{$t->{domains}}) {
    my ($name, $items) = @$d;
    my $num = $domain_icons->{$name} // '';
    $out .= qq{<table class="grid">
<thead><tr><th class="th-dom"><span class="dom-n">$num</span>$name</th><th class="th-r">دائمًا</th><th class="th-r">أحيانًا</th><th class="th-r">إطلاقًا</th></tr></thead>
<tbody>
};
    for my $it (@$items) {
      $out .= qq{<tr><td class="c-ind">$it</td><td class="c-r"><i></i></td><td class="c-r"><i></i></td><td class="c-r"><i></i></td></tr>\n};
    }
    $out .= qq{</tbody></table>\n};
  }
  $out .= qq{<div class="reco"><span class="reco-h">التوصيات والملاحظات</span><div class="reco-lines"></div></div>
<div class="signs"><div class="sign"><i></i><span>توقيع المعلّمة</span></div><div class="sign"><i></i><span>توقيع المديرة</span></div></div>
<footer class="sheet-foot"><span>نادي غرس القيم للطفولة</span><b>سجلّ قياس المهارات · $t->{title}</b></footer>
};
  $out .= qq{</section>\n};
  return $out;
}

# ==== الفصل الثالث: مسوّدة مقترحة (اجتهادٌ للمراجعة، لا مصدرٌ رسميّ) ====
# = مؤشّرات الفصل الثاني التراكميّة + إضافات إتقانِ نهاية العام لكلّ مجال
my %t3_add = (
  'المجال المعرفيّ' => [
    'يستظهر ما حفظه (القرآن – الأذكار – الأحاديث) بثقةٍ وإتقان',
    'يربط القيمة التي تعلّمها بسلوكه اليوميّ',
  ],
  'المجال اللغويّ' => [
    'يمزج أصوات الحروف لتكوين كلمة (القراءة التركيبيّة)',
    'يقرأ كلماتٍ ثلاثيّة بسيطة',
    'يكتب اسمه بطريقةٍ صحيحة',
    'يميّز بين الحركات القصيرة والمدود',
  ],
  'المجال الحركيّ' => [
    'يمسك المقصّ ويقصّ على خطٍّ بدقّة',
    'يؤدّي حركاتٍ متتابعة بتناسق (وثب – حجل – توازن)',
  ],
  'المجال الاجتماعيّ' => [
    'يتحمّل مسؤوليّة أدواته وترتيب مكانه',
    'يحلّ خلافًا بسيطًا مع أقرانه بالحوار',
    'يبادر بمساعدة غيره دون طلب',
  ],
  'المجال الإدراكيّ' => [
    'يعدّ من (١) – (٥٠)',
    'يكتب الأعداد من (١) – (٢٠)',
    'يتعرّف الأشكال الهندسيّة (دائرة – مربّع – مثلّث – مستطيل)',
    'يُكمل نمطًا متكرّرًا (لون – شكل – حجم)',
    'يقارن الكميّات (أكبر – أصغر – يساوي)',
  ],
);
my @t3_domains;
for my $d (@{$terms{2}{domains}}) {
  my ($name, $items) = @$d;
  my @newitems = (@$items, @{ $t3_add{$name} || [] });
  push @t3_domains, [$name, \@newitems];
}
$terms{3} = { title => 'الفصل الدراسيّ الثالث', domains => \@t3_domains };

my $css = <<'CSS';
:root{--forest:#1F4A39;--forest2:#2C6A4D;--teal:#0E6E6B;--gold:#C79A3B;--ochre:#8a5d12;--ivory:#FBF9F2;--cream:#F4EDDE;--warm:#F6F1E4;--line:#E9E1D2;--line2:#F0E9DB;--ink:#26302B;--gray:#6C776F;--display:'AlAwwal','Amiri',serif;--body:'Noto Naskh Arabic','Segoe UI',Tahoma,sans-serif;}
@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Bold.woff2') format('woff2');font-weight:700;font-display:swap}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--body);color:var(--ink);background:var(--warm);direction:rtl;line-height:1.7;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.toolbar{position:sticky;top:0;z-index:9;display:flex;gap:10px;justify-content:center;align-items:center;padding:12px;background:rgba(31,74,57,.96);color:#fff;font-family:var(--display);box-shadow:0 6px 18px -10px rgba(0,0,0,.4)}
.toolbar b{font-size:15px}
.toolbar button{font-family:var(--display);font-weight:700;font-size:14px;background:var(--gold);color:#3a2a06;border:0;border-radius:999px;padding:8px 20px;cursor:pointer}
.toolbar button:hover{background:#d8ab4a}
.wrap{max-width:820px;margin:22px auto;padding:0 14px}
.sheet{background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 20px 50px -34px rgba(31,74,57,.4);padding:clamp(20px,3.4vw,34px);margin:0 auto 26px}
/* masthead */
.masthead{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:2px solid var(--forest);margin-bottom:18px}
.mast-brand{display:flex;align-items:center;gap:12px}
.mast-brand img{width:52px;height:52px;border-radius:50%;background:#fff;padding:3px;box-shadow:0 3px 10px rgba(31,74,57,.14)}
.mast-brand b{font-family:var(--display);font-size:18px;color:var(--forest);display:block;line-height:1.2}
.mast-brand span{font-size:11.5px;color:var(--gray)}
.mast-title{text-align:left}
.mast-eyebrow{font-family:var(--display);font-weight:700;font-size:12px;color:var(--ochre);letter-spacing:.02em;display:block}
.mast-title h1{font-family:var(--display);font-weight:700;font-size:clamp(22px,3vw,30px);color:var(--forest);line-height:1.15;margin-top:3px}
/* pupil fields */
.pupil{display:grid;grid-template-columns:1.4fr 1.4fr .8fr;gap:14px;margin-bottom:16px}
.pupil label{font-family:var(--display);font-weight:700;font-size:13px;color:var(--forest);display:flex;flex-direction:column;gap:7px}
.pupil label i{display:block;height:1px;border-bottom:1.5px dotted #b9ad8f;margin-top:auto}
/* legend */
.legend{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:var(--warm);border:1px solid var(--line);border-radius:10px;padding:9px 14px;margin-bottom:18px}
.legend .leg-t{font-family:var(--display);font-weight:700;color:var(--forest);font-size:13px}
.legend em{font-style:normal;font-weight:700;font-size:12px;padding:3px 12px;border-radius:999px;color:#fff}
.legend .l-1{background:var(--forest2)}.legend .l-2{background:var(--gold);color:#3a2a06}.legend .l-3{background:#b06a4e}
.legend .leg-note{font-size:11.5px;color:var(--gray);margin-inline-start:auto}
/* grid tables */
.grid{width:100%;border-collapse:separate;border-spacing:0;margin-bottom:14px;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.grid thead th{background:linear-gradient(180deg,var(--forest2),var(--forest));color:#fff;font-family:var(--display);font-weight:700;padding:9px 12px;font-size:13.5px;text-align:center}
.grid thead .th-dom{text-align:start;font-size:15px;letter-spacing:.01em}
.grid .dom-n{display:inline-block;font-size:11px;color:var(--gold);border:1px solid rgba(255,255,255,.35);border-radius:6px;padding:1px 6px;margin-inline-end:9px;vertical-align:middle}
.grid .th-r{width:74px}
.grid tbody td{border-bottom:1px solid var(--line2);padding:7px 12px;font-size:12.7px;vertical-align:middle}
.grid tbody tr:last-child td{border-bottom:0}
.grid tbody tr:nth-child(even){background:#FBF9F2}
.grid .c-ind{color:#33403a;line-height:1.55}
.grid .c-r{text-align:center;border-inline-start:1px solid var(--line2)}
.grid .c-r i{display:inline-block;width:16px;height:16px;border:1.4px solid #c7bfa8;border-radius:4px}
/* recommendations + signatures */
.reco{margin-top:18px;border:1px solid var(--line);border-radius:12px;padding:12px 14px 14px;background:var(--warm)}
.reco-h{font-family:var(--display);font-weight:700;color:var(--forest);font-size:14px;display:inline-flex;align-items:center;gap:8px}
.reco-h::before{content:"";width:16px;height:2px;background:var(--gold);border-radius:2px}
.reco-lines{margin-top:10px;height:74px;background:repeating-linear-gradient(180deg,transparent 0,transparent 23px,#d9cfb8 23px,#d9cfb8 24px)}
.signs{display:flex;gap:40px;margin-top:22px;padding-top:6px}
.sign{flex:1;text-align:center}
.sign i{display:block;border-bottom:1.5px dotted #b9ad8f;height:30px;margin-bottom:6px}
.sign span{font-family:var(--display);font-weight:700;font-size:12.5px;color:var(--forest)}
.sheet-foot{display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:10px;border-top:1px solid var(--line);font-size:11px;color:var(--gray)}
.sheet-foot b{font-family:var(--display);color:var(--forest2)}
@media print{
  body{background:#fff}
  .toolbar{display:none}
  .wrap{margin:0;max-width:none;padding:0}
  .sheet{box-shadow:none;border:0;border-radius:0;margin:0;padding:12mm 12mm 10mm;page-break-after:always}
  .sheet:last-child{page-break-after:auto}
  .grid,.reco,.signs{page-break-inside:avoid}
  @page{size:A4;margin:0}
}
@media(max-width:640px){.pupil{grid-template-columns:1fr}.mast-title{text-align:start}.signs{flex-direction:column;gap:18px}}
CSS

binmode STDERR, ':encoding(UTF-8)';
for my $n (1,2,3){
  my $t = $terms{$n};
  my $body = sheet($n);
  my $html = qq{<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>سجلّ قياس مهارات الطفل ٥–٦ · $t->{title} — غرس القيم</title>
<style>
$css
</style>
</head>
<body>
<div class="toolbar"><b>سجلّ قياس مهارات الطفل · ٥–٦ سنوات · $t->{title}</b><button onclick="window.print()">طباعة / حفظ PDF</button></div>
<div class="wrap">
$body
</div>
</body>
</html>
};
  my $file = "child-assessment-5-6-term$n.html";
  open my $fh, '>:encoding(UTF-8)', $file or die "$file: $!";
  print $fh $html; close $fh;
  print STDERR "wrote $file\n";
}
