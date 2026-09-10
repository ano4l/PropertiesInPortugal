[CmdletBinding()]
param(
  [string]$FirstInput = '.\artifacts\scrape-runs\listings-001-465.json',
  [string]$SecondInput = '.\artifacts\scrape-runs\listings-466-930.json',
  [string[]]$AdditionalInputs = @(),
  [string]$OutputPath = '.\src\scraped-listings.json',
  [string]$LogPath = '.\artifacts\scrape-runs\merge.log'
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$firstPath = Join-Path $projectRoot $FirstInput
$secondPath = Join-Path $projectRoot $SecondInput
$additionalPaths = @($AdditionalInputs | ForEach-Object { Join-Path $projectRoot $_ })
$outputPath = Join-Path $projectRoot $OutputPath
$logPath = Join-Path $projectRoot $LogPath
$logDirectory = Split-Path -Parent $logPath
if ($logDirectory -and !(Test-Path -LiteralPath $logDirectory)) {
  New-Item -ItemType Directory -Path $logDirectory -Force | Out-Null
}

while (!(Test-Path -LiteralPath $firstPath) -or !(Test-Path -LiteralPath $secondPath)) {
  "$(Get-Date -Format o) waiting for both range files" | Out-File -FilePath $logPath -Append -Encoding utf8
  Start-Sleep -Seconds 30
}

$inputPaths = @($firstPath, $secondPath) + $additionalPaths
$combined = foreach ($inputPath in $inputPaths) {
  $parsed = Get-Content -LiteralPath $inputPath -Raw | ConvertFrom-Json
  foreach ($record in $parsed) {
    $record
  }
}
$deduped = @($combined | Group-Object sourceUrl | ForEach-Object { $_.Group[0] })
$outputDirectory = Split-Path -Parent $outputPath
if ($outputDirectory -and !(Test-Path -LiteralPath $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}
$deduped | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $outputPath -Encoding UTF8

"$(Get-Date -Format o) merged inputs=$($inputPaths.Count) combined=$($combined.Count) deduped=$($deduped.Count)" | Out-File -FilePath $logPath -Append -Encoding utf8
Write-Output "merged $($deduped.Count) records"
