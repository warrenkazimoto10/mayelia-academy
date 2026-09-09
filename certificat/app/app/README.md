# Mayelia Academy — Générateur de certificats

Application web pour gérer les participants, les formations, et générer les
certificats PDF (avec QR code de vérification) à partir du modèle officiel
Mayelia Academy.

## Structure

- `server/` — API Express + TypeScript + Prisma (SQLite) + génération PDF (pdf-lib)
- `web/` — Interface React + Vite

## Démarrage

Terminal 1 (API, port 4000) :

```
cd server
npm install
npx prisma migrate dev   # première fois seulement
npm run seed              # première fois seulement : importe les formations/participants existants
npm run dev
```

Terminal 2 (interface, port 5173) :

```
cd web
npm install
npm run dev
```

Ouvrir http://localhost:5173

## Fonctionnement

- **Formations** : créer une formation (intitulé, client, période, lieu/date d'émission).
- Dans une formation, **inscrire des participants** (existants ou nouveaux) : un certificat
  avec une référence unique (`MAY-AAAA-NNNN`) est généré pour chacun.
- **Voir PDF** télécharge/affiche le certificat individuel ; **Télécharger tous les
  certificats (ZIP)** génère l'ensemble des PDF d'une formation.
- Chaque certificat porte un QR code à gauche de la référence : il pointe vers
  `http://localhost:5173/verify/<REF>`, une page publique qui confirme la validité
  du certificat (nom, formation, période, date).
- **Participants** : gérer la liste des personnes (civilité, nom) indépendamment des formations.
- **Certificats** : vue globale de tous les certificats émis, recherche par REF/nom/formation.

## Configuration

`server/.env` :
- `CERT_PUBLIC_BASE_URL` — domaine utilisé dans le QR code des certificats.
  À changer pour l'URL réelle si l'app est déployée en ligne (par défaut `http://localhost:5173`).
