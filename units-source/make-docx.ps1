param([string]$md, [string]$out)
$ErrorActionPreference = 'Stop'

$lines = Get-Content -LiteralPath $md -Encoding UTF8

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$doc.Content.Font.Name = 'Arial'
$doc.Content.Font.Size = 12
$sel = $word.Selection

function Set-Para([int]$styleEnum, [double]$size, [bool]$bold) {
  try { $sel.Style = $styleEnum } catch {}
  $sel.ParagraphFormat.ReadingOrder = 1
  $sel.ParagraphFormat.Alignment = 2
  $sel.Font.Name = 'Arial'
  if ($size -gt 0) { $sel.Font.Size = $size }
  $sel.Font.Bold = [int]$bold
}
function GoEnd() { $sel.EndKey(6) | Out-Null }   # wdStory = end of document

function Parse-Row([string]$line) {
  $t = $line.Trim()
  if ($t.StartsWith('|')) { $t = $t.Substring(1) }
  if ($t.EndsWith('|'))   { $t = $t.Substring(0, $t.Length - 1) }
  return @($t -split '\|' | ForEach-Object { ($_.Trim() -replace '\*\*','' -replace '`','') })
}
function Is-Separator($cells) {
  foreach ($c in $cells) { if ($c -notmatch '^:?-{2,}:?$') { return $false } }
  return $true
}

$i = 0
while ($i -lt $lines.Count) {
  $raw = $lines[$i]
  $line = $raw.TrimEnd()
  $txt = $line -replace '\*\*','' -replace '`',''

  # ---- markdown table block ----
  if ($line.Trim().StartsWith('|')) {
    $rows = @()
    while ($i -lt $lines.Count -and $lines[$i].Trim().StartsWith('|')) {
      $cells = Parse-Row $lines[$i]
      if (-not (Is-Separator $cells)) { $rows += ,$cells }
      $i++
    }
    if ($rows.Count -gt 0) {
      $cols = ($rows | ForEach-Object { $_.Count } | Measure-Object -Maximum).Maximum
      GoEnd
      $table = $doc.Tables.Add($sel.Range, $rows.Count, $cols)
      $table.Borders.Enable = 1
      try { $table.TableDirection = 1 } catch {}   # wdTableDirectionRtl
      $table.Range.Font.Name = 'Arial'
      $table.Range.Font.Size = 11
      for ($r = 0; $r -lt $rows.Count; $r++) {
        for ($c = 0; $c -lt $cols; $c++) {
          $val = ''
          if ($c -lt $rows[$r].Count) { $val = $rows[$r][$c] }
          $cell = $table.Cell($r + 1, $c + 1)
          $cell.Range.ParagraphFormat.ReadingOrder = 1
          $cell.Range.ParagraphFormat.Alignment = 2
          if ($r -eq 0) { $cell.Range.Font.Bold = 1 } else { $cell.Range.Font.Bold = 0 }
          $cell.Range.Text = $val
        }
      }
      GoEnd
      $sel.TypeParagraph()
    }
    continue
  }

  if ($txt -match '^\s*$') { Set-Para (-1) 12 $false; $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^---+$') { Set-Para (-1) 12 $false; $sel.TypeText(([string][char]0x2500) * 30); $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^#\s+(.*)')    { Set-Para (-2) 20 $true; $sel.TypeText($matches[1]); $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^##\s+(.*)')   { Set-Para (-3) 16 $true; $sel.TypeText($matches[1]); $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^###\s+(.*)')  { Set-Para (-4) 14 $true; $sel.TypeText($matches[1]); $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^####\s+(.*)') { Set-Para (-5) 13 $true; $sel.TypeText($matches[1]); $sel.TypeParagraph(); $i++; continue }
  if ($txt -match '^>\s?(.*)')    { Set-Para (-1) 11 $false; $sel.Font.Italic = 1; $sel.TypeText(([char]0x2039) + ' ' + $matches[1]); $sel.Font.Italic = 0; $sel.TypeParagraph(); $i++; continue }

  $m = [regex]::Match($txt, '^(\s*)([-*])\s+(\[[ xX]\]\s+)?(.*)$')
  if ($m.Success) {
    $indent = [int]($m.Groups[1].Value.Length / 2)
    $check  = $m.Groups[3].Value
    $body   = $m.Groups[4].Value
    if ($check) { $bullet = ([char]0x2610).ToString() + ' ' } else { $bullet = ([char]0x2022).ToString() + ' ' }
    Set-Para (-1) 12 $false
    $sel.ParagraphFormat.RightIndent = 18 + ($indent * 18)
    $sel.TypeText($bullet + $body)
    $sel.ParagraphFormat.RightIndent = 0
    $sel.TypeParagraph()
    $i++; continue
  }

  Set-Para (-1) 12 $false
  $sel.TypeText($txt)
  $sel.TypeParagraph()
  $i++
}

$doc.SaveAs2($out, 16)
$doc.Close()
$word.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
Write-Output ('SAVED: ' + $out)
Write-Output ('SIZE : ' + ((Get-Item -LiteralPath $out).Length) + ' bytes')
