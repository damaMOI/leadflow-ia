# LeadFlow IA 🏠

Agent de qualification et suivi automatisé de leads immobiliers.

## Ce que ça fait

1. **Réception** — formulaire investisseur (budget, type, zone, objectif, délai)
2. **Qualification IA** — Claude analyse le profil et retourne : score 0-100, température (chaud/tiède/froid), points forts, points d'attention, recommandation conseiller
3. **Fiche personnalisée** — rapport structuré généré automatiquement
4. **Email automatique** — envoyé via Gmail MCP sans intervention humaine

---

## Installation

### 1. Cloner / créer le projet

```bash
mkdir leadflow-ia && cd leadflow-ia
```

Placer les fichiers dans cette structure :
```
leadflow-ia/
├── server.js
├── package.json
├── .env               ← à créer depuis .env.example
└── public/
    └── index.html
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer la clé API

Copie `.env.example` en `.env` et renseigne ta clé :

```bash
cp .env.example .env
```

Édite `.env` :
```
ANTHROPIC_API_KEY=sk-ant-XXXXXXXXXXXXXXXXXXXXXXXX
```

Récupère ta clé sur : https://console.anthropic.com

### 4. Connecter Gmail (pour l'envoi automatique)

Le Gmail MCP est disponible sur claude.ai. Pour l'utiliser dans ton déploiement local :
- Va sur **claude.ai → Paramètres → Intégrations** et active Gmail
- Le `server.js` inclut automatiquement l'URL MCP Gmail dans les requêtes

### 5. Lancer

```bash
npm start
# ou en mode watch (redémarre automatiquement)
npm run dev
```

Ouvre : http://localhost:3000

---

## Utilisation

1. Onglet **Nouveau lead** → remplis le formulaire → clique "Qualifier ce lead →"
2. Regarde les 4 étapes s'exécuter en temps réel
3. Consulte la fiche générée + l'aperçu de l'email envoyé
4. Onglet **Pipeline** → vue d'ensemble de tous les leads qualifiés
5. Onglet **Statistiques** → métriques + journal d'activité

---

## Architecture technique

```
Navigateur (index.html)
    │
    │  POST /api/claude  (requêtes JSON)
    ▼
Serveur Node.js (server.js)
    │
    │  Ajoute la clé API Anthropic
    ▼
API Anthropic (claude-sonnet-4-20250514)
    │
    ├── Appel 1 : qualification (retourne JSON structuré)
    │
    └── Appel 2 : envoi email (avec mcp_servers Gmail)
            │
            ▼
        Gmail MCP → Email envoyé au lead
```

---

## Sécurité

- La clé API est **uniquement côté serveur** (server.js + .env)
- Le fichier `.env` ne doit **jamais** être commité sur Git
- Ajoute `.env` à ton `.gitignore`

---

## Déploiement en production

Tu peux déployer sur **Railway**, **Render**, ou **Fly.io** :

```bash
# Exemple Railway
npm install -g @railway/cli
railway login
railway init
railway up
```

Configure la variable d'environnement `ANTHROPIC_API_KEY` dans le dashboard de ton hébergeur.
