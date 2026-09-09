# Architecture — Mayelia Academy

## Vue d’ensemble

Le produit est composé d’un **front React (Vite)** et d’une **API Laravel** qui sert le site public et l’administration (Sanctum + JSON).

```
Frontend (Vite, React Router)
        │
        │ HTTP JSON (/api/...)
        ▼
Laravel (routes/api.php, contrôleurs, modèles Eloquent)
        │
        ├── Base MySQL
        └── Fichiers publics (storage/app/public → /storage via lien symbolique)
```

## Répertoires

| Dossier | Rôle |
|--------|------|
| [`src/`](src/) | Application React : pages, composants, hooks, `lib/api.ts`, tests e2e Playwright sous [`tests/e2e/`](tests/e2e/). |
| [`laravel-api/`](laravel-api/) | API Laravel : migrations, seeders, contrôleurs (`app/Http/Controllers/Api`), modèles, `routes/api.php`. |
| [`server/`](server/) | **Legacy** : ancien backend Express documenté historiquement ; **la référence opérationnelle est Laravel**. Ne pas mélanger les deux sans mise à jour explicite du schéma et de la doc. |

## Configuration front → API

- URL de base des appels : **`VITE_API_URL`** (ex. `http://localhost:8000/api`). Définie dans `.env` à la racine du front ; défaut dans [`src/lib/api.ts`](src/lib/api.ts).
- Les chemins d’images Laravel (`/storage/...`) sont résolus avec l’origine dérivée de `VITE_API_URL` dans [`src/lib/resolveMediaUrl.ts`](src/lib/resolveMediaUrl.ts).

## Configuration Laravel

- **CORS** : [`laravel-api/config/cors.php`](laravel-api/config/cors.php) — variable **`CORS_ALLOWED_ORIGINS`** (liste séparée par virgules) ou défaut `localhost:5173`, `:8080`, `:8081`, `127.0.0.1:9323` (port Playwright e2e).
- **Fichiers uploadés** : `php artisan storage:link` pour exposer `storage/app/public` via `public/storage`. Les uploads admin renvoient des URLs du type `/storage/uploads/...`.
- **Auth admin** : cookie / Bearer Sanctum sur les routes du groupe `auth:sanctum` dans [`laravel-api/routes/api.php`](laravel-api/routes/api.php).

## Principaux endpoints (résumé)

Détail dans [`laravel-api/routes/api.php`](laravel-api/routes/api.php).

- **Public** : `GET /actualites`, `GET /conseils`, `GET /formations`, `GET /partners`, `GET /site-config`, `GET /hero-slides`, `POST /contact-messages`.
- **Protégé** : CRUD actualités / conseils / partenaires, `PUT /formations`, `PUT /site-config`, `PUT /admin/hero-slides`, `POST /upload/image`, gestion des messages contact.

## Fallback données statiques

Certaines parties du front peuvent encore s’appuyer sur des données locales (`src/data/`) si l’API échoue — le comportement exact dépend du composant ; **la source de vérité métier est la base Laravel** une fois l’API déployée.

## Documentation complémentaire

- [`BACKEND_SETUP.md`](BACKEND_SETUP.md) — installation / environnement backend (à garder aligné avec Laravel si besoin).
- [`laravel-api/README.md`](laravel-api/README.md) — démarrage artisan, migrations, seeders.

## Tests

- **E2E** : `npm run test:e2e` (Playwright). [`playwright.config.ts`](playwright.config.ts) démarre Vite sur **`127.0.0.1:9323`** (`--strictPort`) pour éviter de réutiliser par erreur un autre service déjà présent sur `:8080`. Variable optionnelle **`E2E_PORT`** pour changer ce port. Le développement manuel reste sur **8080** ([`vite.config.ts`](vite.config.ts)).
