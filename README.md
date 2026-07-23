# BeGoodDisciple (BGD) — Plateforme SaaS de Redevabilité Spirituelle

**BeGoodDisciple (BGD)** est une plateforme web moderne permettant à un disciple de piloter sa progression spirituelle quotidienne, de configurer ses objectifs annuels personnalisés et d'envoyer automatiquement des comptes rendus structurés et accompagnés d'une analyse pastorale IA à son mentor (Faiseur de Disciple / FD).

---

## 🚀 Stack Technique & Architecture

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : Tailwind CSS + Composants Custom BGD (Design System Blanc → Bleu → Jaune Doré)
- **Base de Données & ORM** : Supabase PostgreSQL + Prisma ORM
- **Authentification** : Supabase Auth (Email/Mot de passe & Magic Link) + Next.js Middleware Route Protection
- **Intelligence Artificielle** : DeepSeek API (`deepseek-chat`) — Synthèses pastorales, encouragements dynamiques, détection de tendances et Assistant conversationnel BGD (RAG simple)
- **Comptes Rendus & Emails** : Générateur PDF aux couleurs BGD + Service d'envoi transactionnel par email au Disciple et au FD + Vercel Cron
- **Déploiement cible** : Vercel Production

---

## 🎨 Design System BGD

- **Palette de couleurs** :
  - **Fonds** : Blanc `#FFFFFF` à Bleu très clair `#FAFCFF`
  - **Header & Cartes de progression** : Dégradé Bleu Ciel `#3B82F6` → Bleu Profond `#1E3A8A` / `#0F172A`
  - **Accents & Boutons Cibles** : Jaune Doré `#FBBF24` → `#F59E0B`
- **Typographie** : Police moderne Inter avec titres expressifs en dégradé.
- **Micro-interactions** : Animations douces de complétion des blocs, jauges circulaires et chronomètre digital de prière interactif.

---

## 📁 Modules de la Plateforme

1. **Authentification & Onboarding (`/login`, `/signup`, `/onboarding`)** :
   - Inscription Disciple / FD / Les deux.
   - Parcours d'onboarding en 4 étapes pour associer l'email du Faiseur de Disciple (FD).
   - Protection des routes `/dashboard/*`, `/objectifs`, `/suivi`, `/comptes-rendus`, `/profil`.

2. **Objectifs de l'Année (`/objectifs`)** :
   - Wizard interactif en 12 catégories (Prière personnelle, Prière de groupe, Lecture biblique, Méditation, Évangélisation, Littérature chrétienne, Retraites, Dons/Offrandes, Visites pastorales, Enseignements, Caractère & Discipline, Objectifs sur-mesure).
   - Versionnement automatique (`v1`, `v2`, etc.) et stockage JSON souple.
   - Bouton de suggestion d'axes de caractère par l'IA DeepSeek.

3. **Suivi Quotidien & Chronomètre (`/suivi`)** :
   - Génération **dynamique** du journal du jour d'après les objectifs annuels actifs.
   - **Chronomètre de prière interactive** (`00:00:00`) avec pop-up de fin de session demandant le sujet/fardeau de prière.
   - Barre de sélection de date (calendrier) pour consulter et modifier les saisies passées.
   - Jauge et cercle de complétion du jour (ex: *6/8 blocs remplis - 75%*).

4. **Comptes Rendus & Génération PDF (`/comptes-rendus`)** :
   - Agrégation automatique des métriques quotidiennes sur n'importe quelle période.
   - Formulaire de questions de fin de période (Dîme, don Galates 6, retraites spirituelles, âme conduite à Christ).
   - Génération de document PDF avec le résumé qualitatif pastoral rédigé par l'IA DeepSeek.
   - Transmis automatiquement par email au Disciple ET au mentor (FD).
   - Bouton de test d'envoi d'email transactionnel dans le tableau de bord.

5. **IA DeepSeek & Assistant BGD (`lib/ai/deepseek.ts`)** :
   - Synthèses pastorales dans les PDF.
   - Bannière d'encouragement dynamique sur le dashboard (`/dashboard`).
   - Détecteur de baisses de rythme et conseils doux.
   - Widget flottant conversationnel **Assistant BGD** sur le tableau de bord.

6. **Sécurité, RLS Supabase & RGPD (`/profil`, `/aide`)** :
   - Politiques Supabase Row Level Security (RLS) dans `prisma/migrations/rls_policies.sql`.
   - Export intégral des données au format JSON (`/api/user/export`) et suppression de compte (`/api/user/delete`).
   - Pages légitimes `/politique-de-confidentialite` et `/mentions-legales`.

---

## 🛠️ Configuration & Lancement Local

### 1. Variables d'Environnement (`.env`)

Créez un fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/begooddisciple"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/begooddisciple"
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
DEEPSEEK_API_KEY="your-deepseek-api-key"
EMAIL_FROM="noreply@begooddisciple.com"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Installation des Dépendances & Prisma

```bash
npm install
npx prisma generate
```

### 3. Lancement du Serveur de Développement

```bash
npm run dev
```

L'application est accessible à l'adresse : `http://localhost:3000`.

---

## ☁️ Déploiement sur Vercel & Cron Jobs

1. Connectez le dépôt GitHub `https://github.com/nashjarod9-beep/BeGoodDisciple` à Vercel.
2. Ajoutez la variable d'environnement `DEEPSEEK_API_KEY` dans les paramètres du projet Vercel.
3. Les tâches Cron automatisées sont déclarées dans `vercel.json` (`/api/cron/send-reports`).
4. Déployez en production avec :

```bash
npx vercel --prod
```

URL de production : `https://be-good-disciple.vercel.app`.
