/**
 * Transforme les chemins renvoyés par l’API (ex. src/assets/...) en URLs servies par Vite,
 * et préfixe les chemins Laravel (/storage/…) avec l’origine du backend.
 */

const apiEnv = import.meta.env.VITE_API_URL as string | undefined;

function backendOrigin(): string {
  if (!apiEnv?.trim()) return '';
  try {
    const u = new URL(apiEnv);
    return u.origin;
  } catch {
    return '';
  }
}

/** Paires clé logique → URL bundlée Vite */
function buildLocalAssetMap(): Map<string, string> {
  const map = new Map<string, string>();
  const modules = import.meta.glob<{ default: string }>('../assets/**/*.{png,jpg,jpeg,gif,webp,svg}', {
    eager: true,
    import: 'default',
  });

  for (const modulePath of Object.keys(modules)) {
    const url = (modules as Record<string, { default: string }>)[modulePath].default;
    if (!url) continue;

    const normalizedModule = modulePath.replace(/\\/g, '/');
    const fromSrc = normalizedModule.startsWith('../')
      ? `src/${normalizedModule.slice(3)}`
      : normalizedModule;

    const variants = new Set<string>();
    variants.add(fromSrc);
    variants.add(`/${fromSrc}`);
    const assetsIdx = fromSrc.indexOf('assets/');
    if (assetsIdx >= 0) {
      variants.add(fromSrc.slice(assetsIdx));
      variants.add(`/${fromSrc.slice(assetsIdx)}`);
    }

    for (const k of variants) {
      map.set(k, url);
    }
  }

  return map;
}

const LOCAL_ASSETS = buildLocalAssetMap();

/** Extrait une forme canonique du type src/assets/... si possible */
function toCanonicalSrcAssets(input: string): string | null {
  const n = input.trim().replace(/\\/g, '/');
  let idx = n.indexOf('src/assets/');
  if (idx >= 0) return n.slice(idx);
  idx = n.indexOf('/src/assets/');
  if (idx >= 0) return n.slice(idx + 1);
  idx = n.indexOf('assets/');
  if (idx >= 0 && !n.includes('node_modules')) return `src/${n.slice(idx)}`;
  return null;
}

/**
 * URL utilisable dans un attribut `src` d’image.
 */
export function resolveMediaUrl(path: string | undefined | null): string {
  if (path == null || path === '') return '';

  let p = String(path).trim();
  try {
    p = decodeURIComponent(p);
  } catch {
    /* ignore */
  }
  if (p.startsWith('data:') || p.startsWith('blob:')) {
    return p;
  }

  /** URLs absolues déjà pointant vers /storage/… ou /media/… — réécriture sur l’origine API. */
  if (p.startsWith('http://') || p.startsWith('https://')) {
    try {
      const parsed = new URL(p);
      const pathname = parsed.pathname;
      if (pathname.includes('/storage/') || pathname.includes('/media/')) {
        const origin = backendOrigin();
        if (origin) {
          return `${origin}${pathname}${parsed.search}${parsed.hash}`;
        }
      }
    } catch {
      /* ignore */
    }
    return p;
  }

  if (p.startsWith('/storage') || p.startsWith('storage/') || p.startsWith('/media') || p.startsWith('media/')) {
    const origin = backendOrigin();
    const suffix = p.startsWith('/') ? p : `/${p}`;
    return origin ? `${origin}${suffix}` : p;
  }

  const canonical = toCanonicalSrcAssets(p);
  if (canonical) {
    const variants = [
      canonical,
      canonical.replace(/ /g, '%20'),
      `/${canonical}`,
      canonical.replace(/^src\//, ''),
    ];
    for (const v of variants) {
      const hit =
        LOCAL_ASSETS.get(v) ??
        LOCAL_ASSETS.get(`/${v.replace(/^\/+/, '')}`);
      if (hit) return hit;
    }
  }

  const pathVariants = new Set<string>([
    p,
    p.replace(/^\/+/, ''),
    `/${p.replace(/^\/+/, '')}`,
    p.replace(/ /g, '%20'),
    p.replace(/%20/g, ' '),
  ]);
  for (const key of pathVariants) {
    const h = LOCAL_ASSETS.get(key);
    if (h) return h;
  }

  return p;
}
