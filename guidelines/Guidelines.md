# Bëzic Manjakù - Guidelines

## Logo officiel

Le logo officiel de Bëzic est disponible dans l'application et doit être utilisé de manière cohérente à travers tous les écrans.

**Import du logo:**
```tsx
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";
```

**Utilisation recommandée:**
- Écran Splash: Logo de taille importante (w-48 h-48)
- Écrans Login/Register: Logo moyen (w-20 à w-24)
- Header de l'écran Home: Logo petit (w-10 h-10) avec drop-shadow

## Palette de couleurs officielle

### Couleur de fond principale
- **Code couleur officiel:** `#FEEECD`
- Cette couleur est définie comme `--background` dans theme.css
- **Usage:** Utilisée principalement pour le fond général de l'app (Home, Quiz, Feed, etc.)
- Les écrans d'authentification (Login, Register, Onboarding) utilisent un fond blanc pour plus de clarté

### Palette complète
- **Vert profond (Primary):** `#1E4D3A`
- **Terre cuite (Accent):** `#C96A3D`
- **Sable (Secondary):** `#F4E9D8`
- **Fond (Background):** `#FEEECD` ✨ **Couleur officielle**
- **Charbon (Foreground):** `#1F2937`
- **Or doux (Gold):** `#D4A64A`

## Intégration du logo

Le logo a été intégré dans les écrans suivants :

1. **Splash** (`/src/app/screens/Splash.tsx`) - Logo principal avec animation
2. **Login** (`/src/app/screens/Login.tsx`) - Logo en haut du formulaire
3. **Register** (`/src/app/screens/Register.tsx`) - Logo en haut du formulaire
4. **Home** (`/src/app/screens/Home.tsx`) - Logo dans le header avec le message de bienvenue

## Fil d'actualité social (Feed)

L'application inclut maintenant un fil d'actualité social complet inspiré des réseaux sociaux:

### Écrans du Feed
- **Feed** (`/src/app/screens/Feed.tsx`) - Fil d'actualité principal avec posts des utilisateurs
- **PostDetail** (`/src/app/screens/PostDetail.tsx`) - Détail d'une publication avec commentaires
- **UserProfile** (`/src/app/screens/UserProfile.tsx`) - Profil utilisateur avec posts et informations
- **CreatePost** (`/src/app/screens/CreatePost.tsx`) - Interface pour créer une publication
- **DirectMessage** (`/src/app/screens/DirectMessage.tsx`) - Messagerie directe entre utilisateurs

### Fonctionnalités du Feed
- **Publications** : Partage de texte, images et vidéos
- **Interactions** : J'aime, commentaires, partages, sauvegardes
- **Profils** : Visite des profils utilisateurs avec statistiques et posts
- **Commentaires** : Système de commentaires avec likes sur les commentaires
- **Messagerie** : Messages directs entre utilisateurs
- **Navigation** : Accès fluide entre profils, posts et messages

### Accès
- Accessible depuis l'écran Home via les accès rapides
- Onglet "Feed" dans la navigation principale (bottom tab bar)
- Accessible depuis `/app/feed`

## Section Quiz

L'application inclut maintenant une section Quiz complète pour tester les connaissances sur la culture manjak:

### Écrans Quiz
- **Quiz** (`/src/app/screens/Quiz.tsx`) - Liste des catégories de quiz avec progression de l'utilisateur et classement
- **QuizDetail** (`/src/app/screens/QuizDetail.tsx`) - Interface pour passer un quiz avec questions, résultats et scoring

### Catégories de Quiz
1. **Culture Manjak** - 10 questions sur la culture (Facile)
2. **Langue Manjak** - 15 questions sur la langue et expressions (Moyen)
3. **Histoire du Peuple** - 12 questions sur l'histoire (Moyen)
4. **Traditions & Coutumes** - 10 questions sur les traditions (Facile)

### Accès
- Accessible depuis l'écran Home via les accès rapides
- Accessible depuis `/app/quiz`
- Navigation vers les quiz individuels via `/app/quiz/:id`

## Design System

L'application utilise une approche mobile-first avec :
- Design optimisé pour iPhone 14 Pro (portrait)
- Navigation via bottom tab bar à 5 onglets (Accueil, Feed, Actualités, Vidéos, Associations)
- Composants réutilisables dans `/src/app/components/ui/`
- Cohérence iOS/Android
- **Couleur de fond (#FEEECD)** utilisée principalement pour les écrans principaux
- **Fond blanc** pour les écrans d'authentification et formulaires

## Navigation

L'application comprend maintenant 29 écrans répartis en plusieurs catégories :
- Authentification (Splash, Onboarding 1-3, Login, Register, Forgot Password)
- Écrans principaux (Home, Feed, Discussions, News, Videos, Associations, Quiz)
- Social (PostDetail, UserProfile, CreatePost, DirectMessage)
- Détails (Conversation, News, Video, Event, Association, Quiz Detail)
- Utilitaires (Search, Notifications, Profile, Settings, Not Found)
- Carte interactive (VillagesMap)

## Carte Interactive des Villages Manjak

L'application inclut une carte interactive géographique complète :

### Écran
- **VillagesMap** (`/src/app/screens/VillagesMap.tsx`) - Carte Leaflet interactive

### Fonctionnalités
- **20 villages/villes** répartis sur 3 pays (Guinée-Bissau, Sénégal, Gambie)
- **Marqueurs personnalisés** par pays (vert/orange/or) et type (capitale/ville/village)
- **Bottom sheet** avec détails : description, population, langues, festivité
- **Filtres** par pays avec badges cliquables
- **Recherche** en temps réel par nom ou région
- **Animation FlyTo** lors de la sélection d'un village
- **Légende** sur la carte

### Accès
- Accessible depuis l'écran Home via les accès rapides ("Carte")
- Route : `/app/villages-map`
- Packages : `react-leaflet`, `leaflet`, `@types/leaflet`