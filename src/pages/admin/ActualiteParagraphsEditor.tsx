import { useState } from 'react';
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { ActualiteImage } from '@/lib/api';
import { adminInput, adminLabel } from './adminUi';

/** Bloc paragraphe partagé (actualités / conseils). */
export interface EditableParagraphBlock {
  text: string;
  image?: ActualiteImage;
}

function emptyParagraph(): EditableParagraphBlock {
  return { text: '' };
}

export interface ActualiteParagraphsEditorProps {
  paragraphs: EditableParagraphBlock[];
  onChange: (next: EditableParagraphBlock[]) => void;
  uploadFile: (file: File) => Promise<string>;
}

function ParagraphUploadButton({
  index,
  uploadFile,
  onUploaded,
}: {
  index: number;
  uploadFile: (file: File) => Promise<string>;
  onUploaded: (url: string) => void;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <>
      <input
        id={`para-upload-${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          setBusy(true);
          try {
            const url = await uploadFile(file);
            onUploaded(url);
          } finally {
            setBusy(false);
          }
        }}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={busy}
        className="border-slate-200 font-opensans"
        onClick={() => document.getElementById(`para-upload-${index}`)?.click()}
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
        Téléverser
      </Button>
    </>
  );
}

export function ActualiteParagraphsEditor({ paragraphs, onChange, uploadFile }: ActualiteParagraphsEditorProps) {
  const patchAt = (index: number, patch: Partial<EditableParagraphBlock>) => {
    onChange(paragraphs.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  };

  const patchImageAt = (index: number, patch: Partial<NonNullable<EditableParagraphBlock['image']>>) => {
    const p = paragraphs[index];
    const prev = p.image ?? { src: '', alt: '', caption: '' };
    const merged = { ...prev, ...patch };
    const src = merged.src.trim();
    const hasImg = src.length > 0;
    patchAt(index, {
      image: hasImg
        ? {
            src,
            alt: merged.alt.trim(),
            caption: merged.caption?.trim() ?? '',
          }
        : undefined,
    });
  };

  const removeAt = (index: number) => {
    onChange(paragraphs.filter((_, i) => i !== index));
  };

  const move = (index: number, delta: -1 | 1) => {
    const j = index + delta;
    if (j < 0 || j >= paragraphs.length) return;
    const next = [...paragraphs];
    [next[index], next[j]] = [next[j], next[index]];
    onChange(next);
  };

  const addParagraph = () => {
    onChange([...paragraphs, emptyParagraph()]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Label className={`${adminLabel} text-base`}>Corps de l’article — paragraphes</Label>
        <Button type="button" variant="secondary" size="sm" className="font-opensans" onClick={addParagraph}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un paragraphe
        </Button>
      </div>

      {paragraphs.length === 0 && (
        <p className="text-sm text-slate-500 font-opensans italic border border-dashed rounded-lg p-6 text-center">
          Aucun paragraphe — cliquez sur « Ajouter un paragraphe ».
        </p>
      )}

      {paragraphs.map((para, index) => (
        <div key={`para-${index}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span className="text-sm font-semibold text-slate-800 font-opensans">Paragraphe {index + 1}</span>
            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                aria-label="Monter le paragraphe"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={index === paragraphs.length - 1}
                onClick={() => move(index, 1)}
                aria-label="Descendre le paragraphe"
              >
                <ArrowDown className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeAt(index)}
                aria-label="Supprimer le paragraphe"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`ptext-${index}`} className={adminLabel}>
              Texte
            </Label>
            <Textarea
              id={`ptext-${index}`}
              rows={5}
              value={para.text}
              onChange={(e) => patchAt(index, { text: e.target.value })}
              className={adminInput}
              placeholder="Contenu du paragraphe…"
            />
          </div>

          <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/80 p-4 space-y-3">
            <p className="text-xs font-semibold text-slate-600 font-opensans uppercase tracking-wide">Image (optionnelle)</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Input
                id={`psrc-${index}`}
                value={para.image?.src ?? ''}
                onChange={(e) => patchImageAt(index, { src: e.target.value })}
                className={`${adminInput} flex-1 min-w-[200px]`}
                placeholder="URL de l’image"
              />
              <ParagraphUploadButton
                index={index}
                uploadFile={uploadFile}
                onUploaded={(url) => patchImageAt(index, { src: url })}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`palt-${index}`} className={adminLabel}>
                  Texte alternatif (accessibilité)
                </Label>
                <Input
                  id={`palt-${index}`}
                  value={para.image?.alt ?? ''}
                  onChange={(e) => patchImageAt(index, { alt: e.target.value })}
                  className={adminInput}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`pcap-${index}`} className={adminLabel}>
                  Légende
                </Label>
                <Input
                  id={`pcap-${index}`}
                  value={para.image?.caption ?? ''}
                  onChange={(e) => patchImageAt(index, { caption: e.target.value })}
                  className={adminInput}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { emptyParagraph };
