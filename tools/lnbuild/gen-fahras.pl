#!/usr/bin/perl
# gen-fahras.pl — يبني الفهارس المولّدة من محتوى اللقاءات:
#   fahras-ahadith.html (و-١) · fahras-ayat.html (و-٢) · fahras-tarbawi.html (و-٣)
# لا يخترع عزوًا: كلُّ مدخلٍ مأخوذٌ ممّا هو منصوصٌ في اللقاء. ما لا مصدرَ له يُترك بذرةً ولا يُنشر.
# الاستعمال: perl tools/lnbuild/gen-fahras.pl [ahadith|ayat|tarbawi|all]  (افتراضيّ all)
#            perl tools/lnbuild/gen-fahras.pl --verify
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';
my $arg = $ARGV[0] // 'all';

my $MID = " · ";
sub esc { my $s=shift; $s//=''; $s=~s/&/&amp;/g; $s=~s/</&lt;/g; $s=~s/>/&gt;/g; $s=~s/"/&quot;/g; $s }
sub slurp { my $f=shift; open my $x,'<:raw',$f or return undef; local $/; my $s=decode_utf8(scalar<$x>); close $x; $s }
sub meta { # الوحدة/المادّة/عنوان اللقاء من <title>
  my $h=shift; my ($t)=$h=~m{<title>(.*?)</title>}s; $t//=''; $t=~s/^\s+|\s+$//g;
  my @p=split /\Q$MID\E/,$t;
  my $unit = @p ? $p[-1] : ''; $unit=~s/^\s*وحدة\s+//;
  my $subj = @p>=2 ? $p[-2] : '';
  my $les  = @p>=3 ? join($MID,@p[0..$#p-2]) : ($p[0]//'');
  my ($cm)=$h=~m{c-meta"[^>]*>([^<]*)}s; $cm//=''; my $day='';
  $day=$1 if $cm=~/اليوم\s*:?\s*(\S+?عشر|\S+)/;
  return ($unit,$subj,$les,$day);
}
my %UORD=('أنا مخلوق كرّمني الله'=>1,'الليل والنهار'=>2,'المسكن'=>3,'العائلة'=>4);

my @pages = grep { !/(print|cards|khizanat|fahras|namathij)/ && $_ ne 'intro-guide.html' && $_ ne 'guide.html' && $_ ne 'index.html' } glob '*.html';

# ───────── و-١ فهرس الأحاديث ─────────
sub build_ahadith {
  my @SRC = ('البخاري','مسلم','أبو داود','الترمذي','النسائي','ابن ماجه','أحمد','مالك','الدارمي','الحاكم','البيهقي','الطبراني','النووي');
  my %SORD; $SORD{$SRC[$_]}=$_ for 0..$#SRC;
  my (@rows,%seed);
  for my $pg (@pages){ my $h=slurp($pg)//next; my ($unit,$subj,$les,$day)=meta($h);
    while($h=~/<div class="hadith">(.*?)<\/div>/gs){ my $b=$1;
      my ($ref)= $b=~/<span class="ref">(.*?)<\/span>/s;
      my $matn=$b; $matn=~s/<span class="ref">.*?<\/span>//s; $matn=~s/<[^>]+>//g; $matn=~s/\s+/ /g; $matn=~s/^\s+|\s+$//g;
      unless(defined $ref && $ref=~/\S/){ $seed{$pg}++; next; }   # لا عزو ⟵ بذرة، لا تُنشر
      $ref=~s/\s+/ /g; $ref=~s/^\s+|\s+$//g;
      my ($src)= $ref=~/(البخاري|مسلم|أبو داود|الترمذي|النسائي|ابن ماجه|أحمد|مالك|الدارمي|الحاكم|البيهقي|الطبراني|النووي)/;
      $src//='غيرها';
      push @rows, { matn=>$matn, ref=>$ref, src=>$src, sord=>($SORD{$src}//99), unit=>$unit, subj=>$subj, les=>$les, day=>$day, pg=>$pg };
    }
  }
  @rows = sort { $a->{sord}<=>$b->{sord} || ($UORD{$a->{unit}}//9)<=>($UORD{$b->{unit}}//9) || $a->{pg} cmp $b->{pg} } @rows;
  my $body=''; my $cursrc='';
  for my $r (@rows){
    if($r->{src} ne $cursrc){ $cursrc=$r->{src}; $body.=qq{<h2 class="src-h">}.esc($cursrc).qq{</h2>\n}; }
    my $loc = esc(join(' · ', grep {$_ ne ''} $r->{unit}, $r->{subj}, ($r->{day}?"اليوم $r->{day}":''), $r->{les}));
    $body.=qq{<div class="entry"><div class="matn">}.esc($r->{matn}).qq{</div>}
        .qq{<div class="meta2"><span class="takhreej">}.esc($r->{ref}).qq{</span>}
        .qq{<a class="loc" href="$r->{pg}" target="_blank" rel="noopener">$loc</a></div></div>\n};
  }
  write_page('fahras-ahadith.html','فهرس الأحاديث', scalar(@rows).' حديثٍ مُخرَّج، مرتّبةً بالمصدر ثمّ الوحدة. لكلّ حديثٍ طرفُه وتخريجُه ورابطُ لقائه.', $body, 'ابحثي بطرف الحديث أو المصدر…');
  print "✓ fahras-ahadith.html — ".scalar(@rows)." مدخلًا\n";
  print "⚠ بذور بلا عزو: $_\n" for sort keys %seed;
  return scalar(@rows);
}

sub ar2en { my $s=shift//''; $s=~tr/٠١٢٣٤٥٦٧٨٩/0123456789/; return $s; }

# ───────── و-٢ فهرس الآيات (فهرس المقاطع) ─────────
sub build_ayat {
  my %SURA=(النبأ=>78, الانفطار=>82, الفجر=>89, يس=>36, فاطر=>35, الفرقان=>25, الإسراء=>17, الإنسان=>76, إبراهيم=>14, الحج=>22);
  my %U2S=('أنا مخلوق كرّمني الله'=>'النبأ','العائلة'=>'الانفطار','المسكن'=>'الانفطار','الليل والنهار'=>'الفجر');
  my @rows;
  for my $pg (@pages){ my $h=slurp($pg)//next; my ($unit,$subj,$les,$day)=meta($h);
    if($pg=~/kitabi.*lesson\d+\.html$/){
      my ($sura)= $les=~/سورة\s+(النبأ|الانفطار|الفجر)/; $sura//=$U2S{$unit};
      if($sura){ my ($a,$b);
        if   ($les=~/الآيات\s*([٠-٩0-9]+)\s*[–\-]\s*([٠-٩0-9]+)/){ ($a,$b)=($1,$2); }
        elsif($les=~/\(\s*([٠-٩0-9]+)\s*[–\-]\s*([٠-٩0-9]+)\s*\)/){ ($a,$b)=($1,$2); }
        elsif($les=~/الآية\s*([٠-٩0-9]+)/){ $a=$b=$1; }
        my ($range,$sortA);
        if(defined $a){ $range="الآيات $a–$b"; $sortA=ar2en($a)+0; } else { $range="السورة — علومٌ/عامّ"; $sortA=0; }
        push @rows,{sura=>$sura, sord=>($SURA{$sura}//999), range=>$range, sortA=>$sortA, kind=>'مقطع', unit=>$unit,subj=>$subj,les=>$les,day=>$day,pg=>$pg};
      }
    }
    while($h=~/[\(\[]\s*(النبأ|الانفطار|الفجر|يس|فاطر|الفرقان|الإسراء|الإنسان|إبراهيم|الحج)\s*[:\s]\s*([٠-٩0-9][٠-٩0-9\x{2013}\-–، ]*?)\s*[\)\]]/g){
      my ($sura,$ay)=($1,$2); my ($sa)= ar2en($ay)=~/(\d+)/;
      push @rows,{sura=>$sura, sord=>($SURA{$sura}//999), range=>"الآية $ay", sortA=>($sa//0)+0, kind=>'عزو', unit=>$unit,subj=>$subj,les=>$les,day=>$day,pg=>$pg};
    }
  }
  @rows = sort { $a->{sord}<=>$b->{sord} || $a->{sortA}<=>$b->{sortA} || $a->{kind} cmp $b->{kind} || $a->{pg} cmp $b->{pg} } @rows;
  my $body=''; my $cur='';
  for my $r (@rows){
    if($r->{sura} ne $cur){ $cur=$r->{sura}; $body.=qq{<h2 class="src-h">سورة }.esc($cur).qq{ <small style="opacity:.6;font-size:12px">(ترتيب المصحف: $r->{sord})</small></h2>\n}; }
    my $loc=esc(join(' · ', grep {$_ ne ''} $r->{unit}, $r->{subj}, ($r->{day}?"اليوم $r->{day}":''), $r->{les}));
    $body.=qq{<div class="entry"><div class="meta2"><span class="takhreej">}.esc($r->{range}).qq{</span>}
        .qq{<span class="kind">}.esc($r->{kind}).qq{</span>}
        .qq{<a class="loc" href="$r->{pg}" target="_blank" rel="noopener">$loc</a></div></div>\n};
  }
  write_page('fahras-ayat.html','فهرس الآيات','مقاطعُ القرآن المقرّرة مرتّبةً بترتيب المصحف — من السورة والآيات المُعلَنة في اللقاء (مقطع) ومن العزو الصريح (عزو). لا تخمينَ لرقم آيةٍ غير منصوص.',$body,'ابحثي بالسورة أو رقم الآية…');
  print "✓ fahras-ayat.html — ".scalar(@rows)." مدخلًا (مقاطع + عزو صريح)\n";
  return scalar(@rows);
}

# ───────── و-٣ الفهرس التربويّ (أنواع الدعم) ─────────
sub build_tarbawi {
  # facet => { value => [ {name,link}, ... ] }
  my %F; my @order = ('حسب المؤشّر','حسب المدّة','بلا أدوات (إن تعذّرت الوسيلة)','حسب نوع الطفل','حسب موضع التنفيذ');
  for my $pg (@pages){
    next unless $pg=~/lesson\d+\.html$/;
    my $h=slurp($pg)//next; my ($unit,$subj,$les,$day)=meta($h);
    my $nm = join(' · ', grep {$_ ne ''} $unit, $subj, $les);
    my $lnk = "$pg#pilaj"; my $rec = { name=>$nm, link=>$lnk };
    my %seen;
    # أنشطة العلاج: «<مؤشّر> · <ن> دقائق <موضع>»
    while($h=~/class="lbl">([^<]*دقائق[^<]*)</g){ my $l=$1;
      my ($ind) = $l=~/^\s*(ال\S+?يّ|ال\S+?ي)\s*·/; $ind//='';
      my ($du)  = $l=~/([٠-٩0-9]+)\s*دقائق/; $du=ar2en($du//'');
      my ($loc) = $l=~/دقائق\s+(.*?)\s*$/; $loc//='';
      push @{$F{'حسب المؤشّر'}{$ind}}, $rec if $ind && !$seen{"ind$ind"}++;
      push @{$F{'حسب المدّة'}{"$du دقائق"}}, $rec if $du && !$seen{"du$du"}++;
      push @{$F{'حسب موضع التنفيذ'}{$loc}}, $rec if $loc && !$seen{"loc$loc"}++;
    }
    push @{$F{'بلا أدوات (إن تعذّرت الوسيلة)'}{'نشاطٌ بلا أدوات'}}, $rec if $h=~/إن تعذّرت الوسيلة/;
    for my $ct ('الخجول','البطيء','النشيط'){ push @{$F{'حسب نوع الطفل'}{$ct}}, $rec if $h=~/\Q$ct\E/ && !$seen{"ct$ct"}++; }
  }
  my $body='';
  for my $fc (@order){ next unless $F{$fc};
    $body.=qq{<h2 class="src-h">$fc</h2>\n};
    for my $v (sort { my($x)=$a=~/(\d+)/; my($y)=$b=~/(\d+)/; defined $x&&defined $y ? $x<=>$y : $a cmp $b } keys %{$F{$fc}}){
      my @ls = @{$F{$fc}{$v}}; my $n=scalar @ls;
      $body.=qq{<div class="entry"><div class="matn"><span class="facet-v">}.esc($v).qq{</span> <span class="cnt">($n لقاءً)</span></div><div class="ls">};
      $body.= join('', map { qq{<a class="loc" href="$_->{link}" target="_blank" rel="noopener">}.esc($_->{name}).qq{</a>} } @ls);
      $body.=qq{</div></div>\n};
    }
  }
  write_page('fahras-tarbawi.html','الفهرس التربويّ','لا يفهرس الموضوعات بل أنواعَ الدعم: أين أجد علاجًا لمؤشّرٍ ما؟ نشاطًا بلا أدوات؟ معالجةً لطفلٍ خجول؟ كلُّ مدخلٍ يفتح اللقاء على لوحة العلاج.',$body,'ابحثي: وجدانيّ · ٣ دقائق · بلا أدوات · الخجول · الركن…');
  print "✓ fahras-tarbawi.html — ".scalar(keys %F)." أوجهٍ للدعم\n";
}

sub write_page {
  my ($file,$title,$sub,$body,$ph)=@_;
  my $doc = <<"DOC";
<!DOCTYPE html>
<html dir="rtl" lang="ar"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>$title · فهارس غرس القيم</title>
<style>
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
\@font-face{font-family:'AlAwwal';src:url('assets/fonts/AlAwwal-Bold.woff2') format('woff2');font-weight:700;font-display:swap}
\@font-face{font-family:'Saudi';src:url('assets/fonts/Saudi-Regular.woff2') format('woff2');font-weight:400;font-display:swap}
:root{--t1:#17352d;--t2:#2C6A4D;--gold:#C79A3B;--ink:#1E2E29;--muted:#6C776F;--line:#D9D0BE;--cream:#F7F2E6;--head:#EAF1EC}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Amiri','Saudi',serif;color:var(--ink);background:#eef1ec;padding:18px;line-height:1.7}
.wrap{max-width:940px;margin:0 auto}
.top{display:flex;align-items:center;gap:12px;border-bottom:2px solid var(--gold);padding-bottom:10px;margin-bottom:10px}
.top img{width:50px;height:50px;object-fit:contain}
.top h1{font-family:'AlAwwal',serif;font-size:22px;color:var(--t1)}
.top p{font-size:13px;color:var(--muted)}
.searchbar{position:sticky;top:0;background:#eef1ec;padding:8px 0 10px;z-index:5}
#q{width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:12px;font:inherit;font-size:15px;background:#fff}
.src-h{font-family:'AlAwwal',serif;font-size:17px;color:#fff;background:var(--t2);border-radius:9px;padding:5px 13px;margin:14px 0 8px}
.entry{background:#fff;border:1px solid var(--line);border-radius:10px;padding:10px 14px;margin-bottom:8px}
.matn{font-size:15.5px;color:var(--ink);margin-bottom:5px}
.meta2{display:flex;flex-wrap:wrap;gap:6px 16px;align-items:baseline;font-size:12.5px}
.takhreej{color:var(--gold);font-weight:700;font-family:'Saudi',serif}
.loc{color:var(--t2);text-decoration:none;font-family:'Saudi',serif}
.loc:hover{text-decoration:underline}
.kind{font-size:11px;color:var(--muted);border:1px solid var(--line);border-radius:12px;padding:1px 8px}
.facet-v{font-family:'AlAwwal',serif;font-size:15px;color:var(--t1);font-weight:700}
.cnt{font-size:12px;color:var(--muted)}
.ls{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.ls a{font-size:12px;background:var(--cream);border:1px solid var(--line);border-radius:8px;padding:3px 9px}
.empty{display:none;color:var(--muted);text-align:center;padding:30px}
.foot{margin-top:16px;color:var(--muted);font-size:12px;text-align:center}
</style></head><body>
<div class="wrap">
  <div class="top"><img src="brand/logo-ghars.webp" alt="نادي غرس القيم للطفولة"/><div><h1>$title</h1><p>$sub</p></div></div>
  <div class="searchbar"><input id="q" type="search" placeholder="$ph" autocomplete="off"/></div>
  <div id="list">
$body  </div>
  <div class="empty" id="empty">لا نتيجة.</div>
  <div class="foot">فهرسٌ مولَّدٌ آليًّا من محتوى اللقاءات · دليل معلمة غرس القيم.</div>
</div>
<script>
(function(){var q=document.getElementById('q'),e=document.getElementById('empty');
 var items=[].slice.call(document.querySelectorAll('.entry'));
 q.addEventListener('input',function(){var v=q.value.trim();var any=false;
  items.forEach(function(it){var ok=!v||it.textContent.indexOf(v)>=0;it.style.display=ok?'':'none';if(ok)any=true;});
  document.querySelectorAll('.src-h').forEach(function(h){var n=h.nextElementSibling,vis=false;
   while(n&&!n.classList.contains('src-h')){if(n.classList.contains('entry')&&n.style.display!=='none')vis=true;n=n.nextElementSibling;}h.style.display=vis?'':'none';});
  e.style.display=any?'none':'block';});})();
</script></body></html>
DOC
  open my $O,'>:raw',$file or die "write $file: $!"; print $O encode_utf8($doc); close $O;
}

if($arg eq '--verify'){
  my $bad=0;
  for my $pg (@pages){ my $h=slurp($pg)//next;
    while($h=~/<div class="hadith">(.*?)<\/div>/gs){ my $b=$1; unless($b=~/<span class="ref">.*?\S.*?<\/span>/s){ print "حديثٌ بلا عزو: $pg\n"; $bad=1; } }
  }
  for my $fx (glob 'fahras-*.html'){ my $h=slurp($fx)//next; if($h=~/⟦/){ print "بذرةٌ منشورة في $fx\n"; $bad=1; } }
  exit($bad?1:0);
}

build_ahadith() if $arg eq 'all' || $arg eq 'ahadith';
build_ayat()     if $arg eq 'all' || $arg eq 'ayat';
build_tarbawi()  if $arg eq 'all' || $arg eq 'tarbawi';
