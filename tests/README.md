# Tests Automatisés E2E - Mayelia Academy

Infrastructure de tests end-to-end (E2E) avec Playwright pour automatiser la validation des fonctionnalités du site.

## 📦 Installation

```bash
# Installer Playwright (déjà fait)
npm install -D @playwright/test

# Installer les navigateurs
npx playwright install
```

## 🚀 Lancer les tests

### Commandes principales

```bash
# Lancer tous les tests E2E (headless, rapide)
npm run test:e2e

# Lancer les tests avec UI interactive (recommandé pour le développement)
npm run test:e2e:ui

# Lancer les tests avec navigateur visible
npm run test:e2e:headed

# Lancer un test spécifique
npx playwright test tests/e2e/dark-mode.spec.ts

# Lancer les tests sur un seul navigateur
npx playwright test --project=chromium
```

### Générer et consulter les rapports

```bash
# Générer et ouvrir le rapport HTML
npm run test:report

# Le rapport sera dans: playwright-report/index.html
```

## 📁 Structure des tests

```
tests/
├── e2e/                          # Tests end-to-end
│   ├── dark-mode.spec.ts         # Tests du toggle dark/light mode
│   ├── navigation.spec.ts        # Tests de navigation one-page
│   ├── blog-tabs.spec.ts         # Tests des onglets Actualités/Conseils
│   └── faq-modal.spec.ts         # Tests de la modale FAQ
├── helpers/                      # Utilitaires de test
│   └── test-utils.ts             # Fonctions réutilisables
└── README.md                     # Ce fichier
```

## 🧪 Suites de tests disponibles

### 1. Dark Mode (`dark-mode.spec.ts`)
- ✅ Affichage du bouton dark-mode
- ✅ Toggle vers le mode sombre
- ✅ Changement de couleur de fond
- ✅ Retour au mode clair
- ✅ Changement d'icône (Moon ↔ Sun)

### 2. Navigation (`navigation.spec.ts`)
- ✅ Navigation vers Hero (Accueil)
- ✅ Navigation vers À propos
- ✅ Navigation vers Formations
- ✅ Navigation vers Actualités
- ✅ Navigation vers Contact
- ✅ Header sticky au scroll
- ✅ Changement de style du header au scroll

### 3. Blog Tabs (`blog-tabs.spec.ts`)
- ✅ "Conseils" sélectionné par défaut
- ✅ Affichage de 3 conseils
- ✅ Basculer vers "Actualités"
- ✅ Affichage de 3 actualités
- ✅ Retour sur "Conseils"
- ✅ Vérification des catégories
- ✅ Présence des images
- ✅ Affichage du temps de lecture

### 4. FAQ Modal (`faq-modal.spec.ts`)
- ✅ Bouton FAQ caché en haut de page
- ✅ Apparition du bouton au scroll vers Contact
- ✅ Ouverture de la modale
- ✅ Affichage des questions FAQ
- ✅ Expansion des accordéons
- ✅ Fermeture avec bouton
- ✅ Fermeture en cliquant dehors
- ✅ Animation bounce du bouton

## 🛠️ Utilitaires disponibles

Dans `tests/helpers/test-utils.ts` :

```typescript
// Attendre un scroll animé
await waitForSmoothScroll(page, 800);

// Récupérer une couleur calculée
const bgColor = await getComputedColor(page, 'body', 'backgroundColor');

// Prendre un screenshot
await takeScreenshot(page, 'mon-test');

// Vérifier l'accessibilité
const result = await checkAccessibility(page);

// Scroller vers une section
await scrollToSection(page, '#contact');

// Vérifier si un élément est dans le viewport
const isVisible = await isInViewport(page, '#hero');

// Attendre la fin d'une animation CSS
await waitForAnimation(page, '.my-element');

// Vérifier le contraste de couleur
const contrast = await checkColorContrast(page, 'button');
```

## 📊 Rapports de test

Après chaque exécution, Playwright génère :

- **Rapport HTML** : `playwright-report/index.html`
  - Vue d'ensemble des tests
  - Durée d'exécution
  - Screenshots des échecs
  - Vidéos des échecs

- **Screenshots** : `test-results/`
  - Captures automatiques en cas d'échec
  - Screenshots personnalisés via `takeScreenshot()`

- **Vidéos** : `test-results/`
  - Enregistrement automatique des tests échoués

## ✍️ Ajouter de nouveaux tests

### 1. Créer un nouveau fichier de test

```typescript
// tests/e2e/mon-test.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Ma fonctionnalité', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('devrait faire quelque chose', async ({ page }) => {
    // Votre test ici
    const element = page.locator('#mon-element');
    await expect(element).toBeVisible();
  });
});
```

### 2. Lancer le nouveau test

```bash
npx playwright test tests/e2e/mon-test.spec.ts
```

## 🎯 Bonnes pratiques

1. **Attendre le chargement** : Toujours utiliser `waitForLoadState('networkidle')` avant les interactions
2. **Sélecteurs stables** : Préférer les IDs, data-testid ou aria-labels aux classes CSS
3. **Timeouts** : Ajouter des `waitForTimeout()` après les animations/transitions
4. **Screenshots** : Prendre des screenshots pour documenter les états visuels
5. **Isolation** : Chaque test doit être indépendant (utiliser `beforeEach`)
6. **Assertions claires** : Utiliser des messages d'erreur explicites

## 🐛 Debugging

### Mode UI interactif
```bash
npm run test:e2e:ui
```
Permet de :
- Voir les tests s'exécuter pas à pas
- Inspecter le DOM à chaque étape
- Rejouer les tests facilement

### Mode headed (avec navigateur visible)
```bash
npm run test:e2e:headed
```

### Debug un test spécifique
```bash
npx playwright test tests/e2e/dark-mode.spec.ts --debug
```

## 📈 CI/CD

Pour intégrer les tests dans votre pipeline CI/CD :

```yaml
# .github/workflows/tests.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔧 Configuration

La configuration Playwright se trouve dans `playwright.config.ts` :

- **Base URL** : `http://localhost:5173`
- **Timeout** : 30 secondes par test
- **Navigateurs** : Chrome, Firefox, Safari (WebKit)
- **Screenshots** : Automatiques en cas d'échec
- **Vidéos** : Enregistrées pour les tests échoués
- **Serveur** : Démarre automatiquement `npm run dev`

## 📞 Support

Pour toute question sur les tests :
1. Consulter la [documentation Playwright](https://playwright.dev)
2. Vérifier les exemples dans `tests/e2e/`
3. Utiliser les utilitaires dans `tests/helpers/test-utils.ts`
