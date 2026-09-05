#!/usr/bin/perl
# يولّد فراغمات «التغذية الراجعة» من ملفّ بيانات مضغوط.
# صيغة البيانات (بايت خام UTF-8):
#   @<basename>|<المعيار>
#   <السؤال>::<الإجابة>
#   ... (أسطر أسئلة حتى الرأس التالي @ أو نهاية الملفّ)
# الاستعمال: perl gen-fb.pl <data.txt> <out-dir>
use strict; use warnings;
binmode STDOUT, ':raw';
my ($data,$dir) = @ARGV;
die "الاستعمال: perl gen-fb.pl <data.txt> <out-dir>\n" unless $data && $dir;
open my $in,'<:raw',$data or die "open $data: $!";
my @lines = <$in>; close $in;
my ($name,$meiar,@qa,$count)=(undef,undef);
$count=0;
sub emit {
  return unless defined $name;
  die "لا أسئلة لـ$name\n" unless @qa;
  my $ol = join("\n", map {
    my ($q,$a)=@$_;
    qq{        <li><span class="q">$q</span><span class="a">$a</span></li>}
  } @qa);
  my $head = '    <div class="sec-head"><div class="num grn"><i class="gi" data-i="التغذية الراجعة" data-size="22"></i></div><h2>الإغلاق — التغذية الراجعة</h2><span class="stage s3">③ إغلاق</span><div class="rule"></div></div>';
  my $h3   = '      <h3><i class="gi" data-i="التغذية الراجعة" data-size="20"></i> أسئلة التغذية الراجعة (مع الإجابات النموذجية)</h3>';
  my $note = '      <div class="note">تختار المعلمة سؤالين أو ثلاثة بحسب وقت الأطفال، وتُرشد الطفلَ إلى الإجابة برفق. المعيار: '.$meiar.'.</div>';
  my $out = "$head\n    <div class=\"card feedback\">\n$h3\n      <ol class=\"qa\">\n$ol\n      </ol>\n$note\n    </div>\n";
  open my $o,'>:raw',"$dir/$name.fb.html" or die "write $name: $!";
  print $o $out; close $o;
  $count++;
  print "$name.fb.html  Q=".scalar(@qa)."\n";
  @qa=();
}
for my $ln (@lines){
  $ln =~ s/\x0D?\x0A\z//;
  next if $ln =~ /^\s*$/;
  if ($ln =~ /^\@([^|]+)\|(.*)$/){
    emit();
    $name=$1; $meiar=$2; @qa=();
  } elsif ($ln =~ /^(.*?)::(.*)$/){
    push @qa, [$1,$2];
  } else { die "line not understood: $ln\n"; }
}
emit();
print "total: $count fragments\n";
