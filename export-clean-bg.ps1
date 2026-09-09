Add-Type -AssemblyName Microsoft.Office.Interop.PowerPoint

$pptApp = New-Object -ComObject PowerPoint.Application
$pptApp.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue

$pptPath = 'C:\Users\USER2\mayelia-academy\Masque-Attestationdefindeformation.pptx'
$outPath = 'C:\Users\USER2\mayelia-academy\laravel-api\public\certificates\attestation-bg.png'

$pres = $pptApp.Presentations.Open($pptPath, [Microsoft.Office.Core.MsoTriState]::msoFalse)

$slide = $pres.Slides.Item(1)

# Clear text from all text-containing shapes (keep images/decorations)
foreach ($shape in $slide.Shapes) {
    if ($shape.HasTextFrame -eq [Microsoft.Office.Core.MsoTriState]::msoTrue) {
        foreach ($para in $shape.TextFrame.TextRange.Paragraphs()) {
            $para.Text = ""
        }
    }
}

# Export single slide as PNG at high resolution
$slide.Export($outPath, "PNG", 2480, 1754)  # ~212 DPI A4 landscape

$pres.Close()
$pptApp.Quit()

[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pptApp) | Out-Null

Write-Host "Done: $outPath"
