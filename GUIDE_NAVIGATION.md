# Guide de Navigation - Bëzic Manjakù

## 🎯 Flux de navigation principal

### 1. Premier lancement

**Splash Screen** (/)
- Affichage automatique pendant 2.5 secondes
- Redirection automatique vers Onboarding

### 2. Onboarding (3 écrans)

**Onboarding 1** (/onboarding-1) - Échangez ensemble
- Bouton "Suivant" → Onboarding 2
- Bouton "Passer" → Connexion

**Onboarding 2** (/onboarding-2) - Apprenez et transmettez
- Bouton "Suivant" → Onboarding 3
- Bouton "Retour" → Onboarding 1

**Onboarding 3** (/onboarding-3) - Découvrez et participez
- Bouton "Commencer" → Connexion
- Bouton "Retour" → Onboarding 2

### 3. Authentification

**Connexion** (/login)
- Formulaire : Email + Mot de passe
- Bouton "Se connecter" → Accueil de l'app
- Lien "S'inscrire" → Inscription
- Lien "Mot de passe oublié" → Réinitialisation

**Inscription** (/register)
- Formulaire : Nom, Email, Village, Mot de passe
- Bouton "Créer mon compte" → Accueil de l'app
- Lien "Se connecter" → Connexion

**Mot de passe oublié** (/forgot-password)
- Formulaire : Email
- Bouton "Envoyer le lien" → Confirmation
- Bouton "Retour à la connexion" → Connexion

---

## 🏠 Application principale

### Bottom Tab Bar (toujours visible)

Les 5 onglets principaux accessibles à tout moment :

1. **Accueil** (/app)
2. **Discussions** (/app/discussions)
3. **Actualités** (/app/news)
4. **Vidéos** (/app/videos)
5. **Associations** (/app/associations)

---

## 📍 Navigation détaillée par section

### 🏠 ACCUEIL (/app)

**Actions disponibles :**
- 🔍 Bouton Recherche → Recherche globale
- 🔔 Bouton Notifications → Notifications
- 📱 Accès rapides :
  - Discussions → Section Discussions
  - Actualités → Section Actualités
  - Vidéos → Section Vidéos
  - Associations → Section Associations
- 📅 Événements à venir → Détail événement
- 📰 Actualités → Détail actualité
- 🎥 Vidéos recommandées → Détail vidéo

---

### 💬 DISCUSSIONS (/app/discussions)

**Liste des discussions**
- Clic sur une discussion → Détail conversation

**Détail conversation** (/app/discussions/:id)
- Zone de chat avec messages
- Champ de saisie pour envoyer un message
- Bouton retour → Liste discussions

---

### 📰 ACTUALITÉS (/app/news)

**Flux Actualités/Événements**
- Switch entre "Actualités" et "Événements"
- Bouton Filtres
- Clic sur une actualité → Détail actualité
- Clic sur un événement → Détail événement

**Détail actualité** (/app/news/:id)
- Lecture complète
- Boutons Partager et Sauvegarder
- CTA "Voir les associations"

**Détail événement** (/app/events/:id)
- Informations complètes (date, lieu, participants)
- Bouton "Je suis intéressé"
- Bouton "Partager"

---

### 🎥 VIDÉOS (/app/videos)

**Bibliothèque vidéos**
- Barre de recherche
- Filtres par catégorie (Tout, Langue, Histoire, Culture, Témoignages)
- Clic sur une vidéo → Détail vidéo

**Détail vidéo** (/app/videos/:id)
- Lecteur vidéo
- Informations (titre, description, tags)
- Actions (J'aime, Commenter)
- Vidéos similaires

---

### 👥 ASSOCIATIONS (/app/associations)

**Annuaire**
- Barre de recherche
- Filtres par type
- Clic sur une association → Détail association

**Détail association** (/app/associations/:id)
- Informations complètes
- Statistiques (membres, création, événements)
- Activités principales
- Coordonnées de contact
- Boutons "Envoyer un email" et "Appeler"

---

### 🔍 RECHERCHE GLOBALE (/app/search)

**Accessible depuis :**
- Bouton recherche dans l'accueil
- En-tête de plusieurs sections

**Fonctionnalités :**
- Recherche unifiée
- Recherches récentes
- Résultats groupés par type :
  - Discussions
  - Actualités
  - Vidéos
  - Associations

---

### 🔔 NOTIFICATIONS (/app/notifications)

**Accessible depuis :**
- Bouton notifications dans l'accueil

**Types de notifications :**
- Nouveaux messages
- Événements à venir
- Nouvelles associations
- Likes et interactions

---

### 👤 PROFIL (/app/profile)

**Accessible depuis :**
- Navigation secondaire (via Paramètres ou recherche)

**Sections :**
- Informations personnelles
- Statistiques (messages, événements, sauvegardés)
- À propos
- Centres d'intérêt
- Contenus sauvegardés
- Bouton "Modifier le profil"
- Bouton Paramètres → Paramètres

---

### ⚙️ PARAMÈTRES (/app/settings)

**Accessible depuis :**
- Profil utilisateur

**Sections :**
- Préférences (Notifications, Langue)
- Compte (Confidentialité)
- Support (Aide, À propos)
- Bouton "Déconnexion" → Connexion

---

## 🎨 Éléments d'interface communs

### Headers
- Bouton retour (←) : Retour à la page précédente
- Titre de la page
- Actions contextuelles (Recherche, Partage, etc.)

### Bottom Tab Bar
- Toujours visible dans l'application principale
- Indicateur visuel de l'onglet actif (couleur primaire)

### Cards
- Cliquables pour accéder aux détails
- Affichage cohérent des informations

### Boutons
- **Primaire** : Vert profond (#1E4D3A)
- **Secondaire** : Sable (#F4E9D8)
- **Outline** : Bordure verte avec fond transparent

---

## 🔄 Flux utilisateur typiques

### Découvrir un événement et s'inscrire
1. Accueil → Événements à venir
2. Clic sur événement → Détail événement
3. "Je suis intéressé" → Confirmation

### Rejoindre une discussion
1. Onglet Discussions → Liste des salons
2. Clic sur salon → Détail conversation
3. Envoi de message

### Regarder une vidéo éducative
1. Onglet Vidéos → Bibliothèque
2. Filtrer par catégorie (ex: Langue)
3. Clic sur vidéo → Lecteur + détails

### Trouver une association
1. Onglet Associations → Annuaire
2. Recherche ou filtres
3. Clic sur association → Détail + contact

### Chercher du contenu
1. Accueil → Bouton Recherche
2. Saisie de mots-clés
3. Résultats groupés → Navigation vers détail

---

## 📱 Gestes et interactions

- **Tap** : Sélection / Navigation
- **Scroll** : Navigation verticale dans les listes
- **Swipe horizontal** : Carousels (vidéos recommandées)
- **Tap sur onglet actif** : Retour en haut de page

---

## 🎯 Points clés de navigation

✅ **Navigation intuitive** : Bottom tab bar toujours accessible
✅ **Retour facile** : Bouton retour présent sur tous les écrans de détail
✅ **Recherche rapide** : Accessible depuis l'accueil
✅ **Notifications centralisées** : Badge visible + écran dédié
✅ **Profil accessible** : Via paramètres ou navigation directe

---

## 🚀 Raccourcis utiles

- **Accueil → Recherche** : Recherche globale
- **Accueil → Notifications** : Alertes récentes
- **Profil → Paramètres** : Configuration
- **Paramètres → Déconnexion** : Retour à la connexion
- **N'importe où → Bottom Tab** : Navigation rapide entre sections
