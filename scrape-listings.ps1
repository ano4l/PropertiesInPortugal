[CmdletBinding()]
param(
  [int]$StartPage = 1,
  [int]$EndPage = 8,
  [string]$OutputPath = '.\src\scraped-listings.json'
)

if ($StartPage -lt 1 -or $EndPage -lt $StartPage) {
  throw "Invalid page range: $StartPage-$EndPage"
}

$all=@()
$StartPage..$EndPage | ForEach-Object {
  $page=$_
  $url="https://www.propertiesinportugal.com/properties/for-sale?sort=latest&page=$page"
  try {
    $c=(Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30).Content
    $chunks=$c -split '<div class="property h-100">'
    foreach($b in ($chunks | Select-Object -Skip 1)) {
      $link=[regex]::Match($b,'href="(/property/[^"]+)"').Groups[1].Value
      if(!$link){continue}
      $name=[regex]::Match($b,'class="property-name">\s*(.*?)\s*</h4>','Singleline').Groups[1].Value.Trim()
      $loc=[regex]::Match($b,'class="property-location[^>]*>.*?</em>\s*(.*?)\s*</div>','Singleline').Groups[1].Value.Trim()
      $desc=[regex]::Match($b,'class="property-description">\s*(.*?)\s*</p>','Singleline').Groups[1].Value.Trim()
      $img=[regex]::Match($b,'class="property-img".*?data-src="([^"]+)"','Singleline').Groups[1].Value
      $area=[regex]::Match($b,'data-original-title="(\d+)m²"').Groups[1].Value
      $beds=[regex]::Match($b,'data-original-title="(\d+) Bedrooms"').Groups[1].Value
      $baths=[regex]::Match($b,'data-original-title="(\d+) Bathrooms"').Groups[1].Value
      $ref=[regex]::Match($b,'Ref\.\s*([^<]+)').Groups[1].Value.Trim()
      $price=[regex]::Match($b,'class="property-price"><span>\s*([^<]+)').Groups[1].Value.Trim()
      $agency=[regex]::Match($b,'class="property-agent.*?alt="([^"]+)"','Singleline').Groups[1].Value
      $all += [pscustomobject]@{name=$name;location=$loc;description=$desc;image=$img;area=$area;beds=$beds;baths=$baths;ref=$ref;price=$price;agency=$agency;sourceUrl=('https://www.propertiesinportugal.com'+$link)}
    }
    Write-Output "page $page total $($all.Count)"
  } catch { Write-Output "page $page error $($_.Exception.Message)" }
  Start-Sleep -Milliseconds 500
}
$all=$all | Group-Object sourceUrl | ForEach-Object {$_.Group[0]}
$outputDirectory = Split-Path -Parent $OutputPath
if ($outputDirectory -and !(Test-Path $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
}
$all | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 $OutputPath
Write-Output "saved $($all.Count)"
