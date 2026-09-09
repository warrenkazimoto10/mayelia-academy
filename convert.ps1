$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
$doc = $ppt.Presentations.Open('C:\Users\USER2\mayelia-academy\Masque-Attestationdefindeformation.pptx')
$doc.SaveAs('C:\Users\USER2\mayelia-academy\certificat\app\app\server\assets\attestation-bg.pdf', 32)
$doc.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
