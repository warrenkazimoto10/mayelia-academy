# Guide d'installation du Backend - Mayelia Academy

Ce guide vous explique comment configurer et utiliser le backend MySQL pour gérer dynamiquement les actualités et conseils.

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- MySQL (v8.0 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Installer les dépendances du backend

```bash
cd server
npm install
```

### 2. Configurer MySQL

Assurez-vous que MySQL est installé et démarré sur votre machine.

#### Créer la base de données manuellement (optionnel)

```sql
CREATE DATABASE mayelia_academy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` dans le dossier `server/` :

```bash
cd server
cp .env.example .env
```

Éditez le fichier `.env` avec vos paramètres :

```env
# Configuration du serveur
PORT=3001
NODE_ENV=development

# Configuration MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=mayelia_academy

# Configuration CORS
CORS_ORIGIN=http://localhost:5173

# Configuration des fichiers uploadés
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

### 4. Créer les tables de la base de données

```bash
npm run migrate
```

Cette commande va :
- Créer la base de données si elle n'existe pas
- Créer toutes les tables nécessaires (actualites, actualite_paragraphs, conseils, conseil_paragraphs)

### 5. (Optionnel) Seed des données initiales

```bash
npm run seed
```

## 🎯 Démarrage

### Mode développement

```bash
npm run dev
```

Le serveur démarre avec le mode watch (redémarrage automatique lors des modifications).

### Mode production

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3001`

## 📡 API Endpoints

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

### Health Check

- `GET /api/health` - Vérifie l'état du serveur

## 🔧 Configuration du Frontend

### 1. Créer le fichier `.env` à la racine du projet

```env
VITE_API_URL=http://localhost:3001/api
```

### 2. Redémarrer le serveur de développement

```bash
npm run dev
```

Le frontend utilisera automatiquement l'API backend si elle est disponible, sinon il utilisera les données statiques en fallback.

## 📊 Structure de la base de données

### Table `actualites`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `title` (VARCHAR 500)
- `excerpt` (TEXT)
- `category` (VARCHAR 100)
- `date` (VARCHAR 50)
- `read_time` (VARCHAR 20)
- `category_color` (VARCHAR 100)
- `hero_image` (VARCHAR 500)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Table `actualite_paragraphs`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `actualite_id` (INT, FOREIGN KEY)
- `text` (TEXT)
- `image_src` (VARCHAR 500, nullable)
- `image_alt` (VARCHAR 255, nullable)
- `image_caption` (TEXT, nullable)
- `display_order` (INT)

### Tables `conseils` et `conseil_paragraphs`
Structure similaire aux tables des actualités.

## 💡 Exemple d'utilisation

### Créer une actualité via cURL

```bash
curl -X POST http://localhost:3001/api/actualites \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nouvelle actualité",
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
        },
        {
          "text": "Deuxième paragraphe sans image"
        }
      ]
    }
  }'
```

### Créer une actualité via JavaScript

```javascript
import { actualitesAPI } from './lib/api';

const nouvelleActualite = await actualitesAPI.create({
  title: "Titre",
  excerpt: "Résumé",
  category: "Événement",
  date: "20 Jan 2025",
  readTime: "5 min",
  categoryColor: "bg-primary/10 text-primary",
  heroImage: "/uploads/image.jpg",
  content: {
    paragraphs: [
      { text: "Contenu..." }
    ]
  }
});
```

## 🔍 Dépannage

### Erreur de connexion MySQL

- Vérifiez que MySQL est démarré
- Vérifiez les identifiants dans le fichier `.env`
- Vérifiez que la base de données existe

### Erreur CORS

- Vérifiez que `CORS_ORIGIN` dans `.env` correspond à l'URL du frontend
- Par défaut : `http://localhost:5173` (Vite)

### Le frontend n'affiche pas les données

- Vérifiez que le backend est démarré
- Vérifiez l'URL de l'API dans `.env` du frontend
- Vérifiez la console du navigateur pour les erreurs
- Le frontend utilisera automatiquement les données statiques en fallback

## 📝 Notes importantes

- Les images doivent être uploadées dans le dossier `server/uploads/`
- Le CORS est configuré pour accepter les requêtes depuis le frontend
- Les transactions MySQL garantissent l'intégrité des données
- Le frontend utilise un système de fallback : si l'API n'est pas disponible, il utilise les données statiques

## 🎉 C'est prêt !

Votre backend est maintenant configuré et prêt à gérer dynamiquement les actualités et conseils de Mayelia Academy.
