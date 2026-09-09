# Backend API - Mayelia Academy

Backend Express.js avec MySQL pour la gestion dynamique des **actualités**, **conseils** et **formations (domaines + programmes)**.  
Les opérations d’écriture (POST, PUT, DELETE) exigent l’en-tête `Authorization: Bearer <ADMIN_SECRET>`.  
Interface d’administration intégrée au site : **`/admin`**

## 🚀 Installation

1. Installer les dépendances :
```bash
cd server
npm install
```

2. Configurer les variables d'environnement :
```bash
cp .env.example .env
```

Éditer le fichier `.env` avec vos paramètres MySQL :
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=mayelia_academy
PORT=3001
CORS_ORIGIN=http://localhost:5173,http://localhost:8081
ADMIN_SECRET=un_mot_de_passe_fort
```

3. Créer la base de données et les tables :
```bash
npm run migrate
```

4. Si la base existait **avant** l’ajout des tables formations, exécuter aussi le script SQL  
   `src/database/schema_formations_only.sql` (MySQL Workbench ou CLI).


## 📡 Démarrage

```bash
# Mode développement (avec watch)
npm run dev

# Mode production
npm start
```

Le serveur sera accessible sur `http://localhost:3001`

## 📚 API Endpoints

### Actualités

- `GET /api/actualites` - Liste toutes les actualités
- `GET /api/actualites/:id` - Récupère une actualité par ID
- `POST /api/actualites` - Crée une nouvelle actualité
- `PUT /api/actualites/:id` - Met à jour une actualité
- `DELETE /api/actualites/:id` - Supprime une actualité

### Conseils

- `GET /api/conseils` - Liste tous les conseils
- `GET /api/conseils/:id` - Récupère un conseil par ID
- `POST /api/conseils` - Crée un nouveau conseil
- `PUT /api/conseils/:id` - Met à jour un conseil
- `DELETE /api/conseils/:id` - Supprime un conseil

### Formations (arborescence)

- `GET /api/formations` - Arbre public `{ domaines: [...] }`
- `PUT /api/formations` - Remplace tout l’arbre (authentification admin requise). Corps : `{ "domaines": [ { "id", "title", "iconKey", "color", "gradient", "image", "formations": [ { "title", "description", "contenus", "objectifs" } ] } ] }`

### Authentification admin

- `POST /api/auth/login` — `{ "password": "..." }` (identique à `ADMIN_SECRET`) → `{ data: { token } }`
- `GET /api/auth/ping` — indique si `ADMIN_SECRET` est configuré côté serveur

### Health Check

- `GET /api/health` - Vérifie l'état du serveur

## 📊 Structure de la base de données

### Table `actualites`
- id, title, excerpt, category, date, read_time, category_color, hero_image

### Table `actualite_paragraphs`
- id, actualite_id, text, image_src, image_alt, image_caption, display_order

### Table `conseils`
- id, title, excerpt, category, date, read_time, category_color, image, content

### Table `conseil_paragraphs`
- id, conseil_id, text, image_src, image_alt, image_caption, display_order

### Tables `formation_domaines` & `formation_programmes`
- Domaines (slug, titres, classes Tailwind, image, ordre) et programmes (contenus / objectifs en JSON).

## 🔧 Exemple d'utilisation

### Créer une actualité

```bash
curl -X POST http://localhost:3001/api/actualites \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Titre de l'actualité",
    "excerpt": "Résumé de l'actualité",
    "category": "Événement",
    "date": "20 Jan 2025",
    "readTime": "5 min",
    "categoryColor": "bg-primary/10 text-primary",
    "heroImage": "/uploads/image.jpg",
    "content": {
      "paragraphs": [
        {
          "text": "Premier paragraphe",
          "image": {
            "src": "/uploads/image1.jpg",
            "alt": "Description",
            "caption": "Légende"
          }
        }
      ]
    }
  }'
```

## 📝 Notes

- Les images doivent être uploadées dans le dossier `uploads/`
- Le CORS est configuré pour accepter les requêtes depuis le frontend
- Les transactions MySQL sont utilisées pour garantir l'intégrité des données
