#!/usr/bin/perl
# demoji.pl — يستبدل رموزَ الواجهة التصويريّة بنظام الأيقونات (data-i) وفق EMOJI-MAP.tsv،
# داخل صفحات اللقاءات، **خارج كتل رسائل ولي الأمر (wa-wrap) وحدها** (س-٢: تُترك).
# مُعادُ التشغيل بلا أثر. الاستعمال:
#   perl tools/lnbuild/demoji.pl            # يطبّق ويطبع تقريرًا
#   perl tools/lnbuild/demoji.pl --check    # لا يكتب؛ يخرج بصفرٍ إن لم يبقَ رمزٌ واجهةٍ، وإلّا يطبع ويخرج بـ1
use strict; use warnings; use utf8;
use Encode qw(decode_utf8 encode_utf8);
binmode STDOUT, ':encoding(UTF-8)';
my $check = (@ARGV && $ARGV[0] eq '--check');

# اقرأ الخريطة
my (%ACT);   # emoji => name | '' (حذف)
open my $M, '<:encoding(UTF-8)', 'tools/lnbuild/EMOJI-MAP.tsv' or die "افتح EMOJI-MAP.tsv: $!";
while (my $l = <$M>) {
  chomp $l; next if $l =~ /^\s*#/ || $l !~ /\S/;
  my ($e, $name) = split /\t/, $l, 2;
  next unless defined $e && length $e;
  $name = '' if !defined $name || $name eq '—';
  $ACT{$e} = $name;
}
close $M;

# قائمة اللقاءات
open my $L, '<:raw', 'lessons.txt' or die "افتح lessons.txt: $!";
my @lessons = map { s/\s+\z//r } grep { /\S/ } <$L>; close $L;

# مواضع كتل wa-wrap (بعدّ العمق)
sub wa_spans {
  my $h = shift; my @sp; my $from = 0;
  while ((my $s = index($h, '<div class="wa-wrap"', $from)) >= 0) {
    my $gt = index($h, '>', $s); my $d = 1; my $p = $gt + 1;
    while ($d > 0 && $p < length($h)) {
      my $o = index($h, '<div', $p); my $c = index($h, '</div>', $p);
      last if $c < 0;
      if ($o >= 0 && $o < $c) { $d++; $p = $o + 4 } else { $d--; $p = $c + 6 }
    }
    push @sp, [$s, $p]; $from = $p;
  }
  return @sp;
}

my ($files_changed, %tally, @remain) = (0);
for my $file (@lessons) {
  open my $F, '<:raw', $file or do { warn "تعذّر فتح $file\n"; next; };
  local $/; my $h = decode_utf8(scalar <$F>); close $F;

  my @sp = wa_spans($h);
  # اجمع القطعَ الخارجيّة (خارج wa-wrap) ومواضعها
  my @out_ranges; my $cur = 0;
  for my $span (@sp) { push @out_ranges, [$cur, $span->[0]]; $cur = $span->[1]; }
  push @out_ranges, [$cur, length($h)];

  if ($check) {
    for my $r (@out_ranges) {
      my $seg = substr($h, $r->[0], $r->[1]-$r->[0]);
      for my $e (keys %ACT) { my $n = () = ($seg =~ /\Q$e\E\x{FE0F}?/g); push @remain, "$file: $e ×$n" if $n; }
    }
    next;
  }

  # طبّق على القطع الخارجيّة فقط، وأعِد التركيب
  my $res = ''; $cur = 0;
  for my $span (@sp) {
    my $seg = substr($h, $cur, $span->[0]-$cur);
    $res .= apply(\$seg, \%tally);
    $res .= substr($h, $span->[0], $span->[1]-$span->[0]);   # wa-wrap كما هو
    $cur = $span->[1];
  }
  my $tail = substr($h, $cur);
  $res .= apply(\$tail, \%tally);

  if ($res ne $h) {
    open my $O, '>:raw', $file or do { warn "تعذّرت الكتابة $file\n"; next; };
    print $O encode_utf8($res); close $O; $files_changed++;
  }
}

sub apply {
  my ($ref, $tally) = @_; my $s = $$ref;
  for my $e (keys %ACT) {
    my $name = $ACT{$e};
    if (length $name) {
      my $icon = qq{<i class="gi" data-i="$name" data-size="20"></i>};
      my $n = ($s =~ s/\Q$e\E\x{FE0F}?/$icon/g);
      $tally->{$e} += $n if $n;
    } else {
      my $n = ($s =~ s/\Q$e\E\x{FE0F}?\x20?//g);   # حذفٌ مع مسافةٍ تالية إن وُجدت
      $tally->{"$e(حذف)"} += $n if $n;
    }
  }
  return $s;
}

if ($check) {
  if (@remain) { print "⚠ بقيت رموزُ واجهةٍ:\n"; print "  $_\n" for @remain; exit 1; }
  else { exit 0; }
}
print "ملفّاتٌ عُدِّلت: $files_changed\n";
print "الاستبدالات:\n";
for my $k (sort { ($tally{$b}||0) <=> ($tally{$a}||0) } keys %tally) { print "  $k → $tally{$k}\n"; }
