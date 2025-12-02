# 🚀 Guide de Déploiement Netlify - Mayelia Learn Boost

## Méthode 1 : Déploiement via l'interface Netlify (Recommandé)

### Étape 1 : Préparer votre dépôt Git
1. Assurez-vous que votre code est sur GitHub, GitLab ou Bitbucket
2. Commitez tous vos changements :
   ```bash
   git add .
   git commit -m "Préparation pour déploiement Netlify"
   git push
   ```

### Étape 2 : Créer un compte Netlify
1. Allez sur [https://www.netlify.com](https://www.netlify.com)
2. Cliquez sur "Sign up" et connectez-vous avec votre compte Git (GitHub/GitLab/Bitbucket)

### Étape 3 : Importer votre projet
1. Cliquez sur "Add new site" → "Import an existing project"
2. Sélectionnez votre fournisseur Git (GitHub/GitLab/Bitbucket)
3. Autorisez Netlify à accéder à vos dépôts
4. Sélectionnez le dépôt `mayelia-learn-boost-95804`

### Étape 4 : Configuration du build
Les paramètres suivants devraient être détectés automatiquement grâce au fichier `netlify.toml` :
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18

Si ce n'est pas le cas, configurez-les manuellement.

### Étape 5 : Déployer
1. Cliquez sur "Deploy site"
2. Attendez que le déploiement se termine (environ 2-3 minutes)
3. Votre site sera disponible sur une URL du type : `https://random-name-123456.netlify.app`

### Étape 6 : Configurer un domaine personnalisé (Optionnel)
1. Dans les paramètres du site, allez dans "Domain management"
2. Cliquez sur "Add custom domain"
3. Suivez les instructions pour configurer votre DNS

---

## Méthode 2 : Déploiement via Netlify CLI

### Installation de Netlify CLI
```bash
npm install -g netlify-cli
```

### Connexion à Netlify
```bash
netlify login
```

### Déploiement manuel (test)
```bash
netlify deploy
```

### Déploiement en production
```bash
netlify deploy --prod
```

---

## Méthode 3 : Déploiement par glisser-déposer

### Étape 1 : Construire le projet localement
```bash
npm run build
```

### Étape 2 : Déployer via l'interface
1. Allez sur [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Glissez-déposez le dossier `dist` dans la zone prévue
3. Votre site sera déployé instantanément !

⚠️ **Note :** Cette méthode ne permet pas les déploiements automatiques lors des mises à jour.

---

## 📝 Fichiers de configuration créés

### `netlify.toml`
Ce fichier configure :
- ✅ La commande de build (`npm run build`)
- ✅ Le dossier de publication (`dist`)
- ✅ Les redirections pour React Router (SPA)
- ✅ Les headers de sécurité (X-Frame-Options, X-XSS-Protection, etc.)
- ✅ Le cache optimisé pour les assets statiques

### `public/_redirects`
Ce fichier assure que toutes les routes React Router fonctionnent correctement en redirigeant toutes les requêtes vers `index.html`.

---

## 🔧 Configuration avancée

### Variables d'environnement
Si votre application utilise des variables d'environnement :
1. Allez dans "Site settings" → "Environment variables"
2. Ajoutez vos variables (ex: `VITE_API_URL`, `VITE_API_KEY`, etc.)

### Déploiements automatiques
Avec la Méthode 1, chaque push sur votre branche principale déclenchera automatiquement un nouveau déploiement.

### Preview Deployments
Netlify crée automatiquement des aperçus pour chaque Pull Request.

---

## ✅ Vérifications post-déploiement

Après le déploiement, vérifiez :
- [ ] La page d'accueil se charge correctement
- [ ] La navigation entre les pages fonctionne
- [ ] Le mode sombre fonctionne
- [ ] Les images et assets se chargent
- [ ] Les formulaires fonctionnent
- [ ] Le site est responsive sur mobile

---

## 🐛 Dépannage

### Erreur 404 sur les routes
- Vérifiez que le fichier `public/_redirects` existe
- Vérifiez la configuration dans `netlify.toml`

### Build échoue
- Vérifiez les logs de build dans l'interface Netlify
- Assurez-vous que `npm run build` fonctionne localement
- Vérifiez que toutes les dépendances sont dans `package.json`

### Assets manquants
- Vérifiez que tous les fichiers sont bien dans le dossier `public`
- Vérifiez les chemins d'import dans votre code

---

## 📚 Ressources utiles

- [Documentation Netlify](https://docs.netlify.com/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Déploiement SPA](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)

---

## 🎉 Félicitations !

Votre site Mayelia Learn Boost est maintenant prêt à être déployé sur Netlify !
