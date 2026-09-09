"""
Exporte l'attestation Mayelia en PNG propre (sans les textes placeholders).
Utilise python-pptx pour lire le PPTX et Pillow via LibreOffice CLI ou directement.

Stratégie alternative sans LibreOffice :
  - Ouvre le PPTX avec python-pptx
  - Vide tous les TextFrame
  - Sauvegarde en PPTX temporaire
  - Lance PowerPoint via COM (simpler approach without MsoTriState type cast issues)
"""

import subprocess
import sys
import os

PPTX_IN  = r"C:\Users\USER2\mayelia-academy\Masque-Attestationdefindeformation.pptx"
PPTX_TMP = r"C:\Users\USER2\mayelia-academy\attestation-clean-tmp.pptx"
PNG_OUT  = r"C:\Users\USER2\mayelia-academy\laravel-api\public\certificates\attestation-bg.png"

# --- Step 1: clear text via python-pptx ---
try:
    from pptx import Presentation
    from pptx.util import Pt
    from pptx.dml.color import RGBColor
    import copy
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "python-pptx"])
    from pptx import Presentation

prs = Presentation(PPTX_IN)
slide = prs.slides[0]

for shape in slide.shapes:
    if shape.has_text_frame:
        for para in shape.text_frame.paragraphs:
            for run in para.runs:
                run.text = ""
            # Also clear the paragraph's direct text
            if para.text:
                for run in para.runs:
                    run.text = ""

prs.save(PPTX_TMP)
print(f"Saved cleaned PPTX to {PPTX_TMP}")

# --- Step 2: convert to PNG via PowerPoint COM (simpler, no type casting) ---
ps_script = f"""
$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Open('{PPTX_TMP.replace(chr(92), chr(92)*2)}')
$slide = $pres.Slides(1)
$slide.Export('{PNG_OUT.replace(chr(92), chr(92)*2)}', 'PNG', 2480, 1754)
$pres.Close()
$ppt.Quit()
"""

result = subprocess.run(
    ["powershell", "-Command", ps_script],
    capture_output=True, text=True
)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)

# cleanup
if os.path.exists(PPTX_TMP):
    os.remove(PPTX_TMP)

print(f"Done. PNG saved at: {PNG_OUT}")
