$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
$doc = $ppt.Presentations.Open('C:\Users\USER2\mayelia-academy\Masque-Attestationdefindeformation.pptx')
$doc.SaveAs('C:\Users\USER2\mayelia-academy\laravel-api\public\certificates\attestation-bg', 18)
$doc.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
