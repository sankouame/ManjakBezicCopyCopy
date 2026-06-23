// Mock data for the Bëzic Manjakù application

export const mockChannels = [
  { id: 1, name: "Discussion générale", lastMessage: "Bonjour à tous !", time: "10:30", unread: 5, members: 234 },
  { id: 2, name: "Jeunesse", lastMessage: "Quand est le prochain événement ?", time: "09:15", unread: 2, members: 89 },
  { id: 3, name: "Culture & Histoire", lastMessage: "Nouvelle vidéo sur nos traditions", time: "Hier", unread: 0, members: 156 },
  { id: 4, name: "Associations", lastMessage: "Réunion samedi prochain", time: "Hier", unread: 1, members: 67 },
  { id: 5, name: "Inter-villages", lastMessage: "Salutations de Djibonker !", time: "Mar 10", unread: 0, members: 198 },
  { id: 6, name: "Entraide", lastMessage: "Quelqu'un peut m'aider ?", time: "Mar 09", unread: 0, members: 112 },
];

export const mockMessages = [
  { id: 1, user: "Aminata D.", message: "Bonjour à tous ! Comment allez-vous ?", time: "09:30", isMe: false },
  { id: 2, user: "Moi", message: "Bonjour ! Très bien merci 😊", time: "09:32", isMe: true },
  { id: 3, user: "Bakary S.", message: "Salut la famille ! Quelqu'un sait quand aura lieu le prochain événement ?", time: "09:45", isMe: false },
  { id: 4, user: "Fatou M.", message: "Je crois que c'est le 15 mars à Dakar", time: "09:50", isMe: false },
  { id: 5, user: "Moi", message: "Oui exactement, c'est le festival culturel", time: "09:52", isMe: true },
  { id: 6, user: "Aminata D.", message: "Super ! J'ai hâte d'y participer 🎉", time: "10:00", isMe: false },
  { id: 7, user: "Bakary S.", message: "Merci pour l'info ! À bientôt", time: "10:05", isMe: false },
];

export const mockNewsItems = [
  {
    id: 1,
    title: "Nouvelle association créée à Paris",
    summary: "Une nouvelle association pour les jeunes Manjak vient d'être créée en région parisienne.",
    image: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "10 Mars 2026",
    category: "Association",
  },
  {
    id: 2,
    title: "Cours de langue manjak en ligne",
    summary: "Des cours gratuits de langue manjak sont maintenant disponibles en ligne pour tous.",
    image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "8 Mars 2026",
    category: "Éducation",
  },
  {
    id: 3,
    title: "Témoignage : Mon retour au village",
    summary: "Un membre de la diaspora partage son expérience de retour au pays natal.",
    image: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0JTIwYWZyaWNhbiUyMHZpbGxhZ2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMjUwODg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "5 Mars 2026",
    category: "Témoignage",
  },
];

export const mockEvents = [
  {
    id: 1,
    title: "Festival culturel Manjak 2026",
    summary: "Grande célébration de la culture manjak avec musique, danse et gastronomie traditionnelle.",
    image: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "15 Mars 2026",
    location: "Dakar, Sénégal",
    participants: 250,
  },
  {
    id: 2,
    title: "Rencontre inter-villages",
    summary: "Rassemblement des associations de différents villages pour échanger et renforcer les liens.",
    image: "https://images.unsplash.com/photo-1639436926668-2f8b4f32e15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBncm91cCUyMG1lZXRpbmd8ZW58MXx8fHwxNzczMjUwOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "22 Mars 2026",
    location: "Ziguinchor, Sénégal",
    participants: 120,
  },
  {
    id: 3,
    title: "Atelier de cuisine traditionnelle",
    summary: "Apprenez à préparer les plats traditionnels manjak avec des chefs de la communauté.",
    image: "https://images.unsplash.com/photo-1575486683395-3dd805874474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tZW4lMjBjb21tdW5pdHklMjB3b3JrfGVufDF8fHx8MTc3MzI1MDk3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    date: "28 Mars 2026",
    location: "Paris, France",
    participants: 45,
  },
];

export const mockVideos = [
  {
    id: 1,
    title: "Introduction à la langue manjak",
    category: "language",
    duration: "12:30",
    views: "2.4K",
    thumbnail: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "Histoire du peuple Manjak",
    category: "history",
    duration: "18:45",
    views: "3.1K",
    thumbnail: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "Danses traditionnelles manjak",
    category: "culture",
    duration: "15:20",
    views: "1.8K",
    thumbnail: "https://images.unsplash.com/photo-1767293940906-6aa1c13b514b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBtdXNpYyUyMGRhbmNlfGVufDF8fHx8MTc3MzI1MDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "Mon retour au village - Témoignage",
    category: "testimonials",
    duration: "22:10",
    views: "1.2K",
    thumbnail: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0JTIwYWZyaWNhbiUyMHZpbGxhZ2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMjUwODg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    title: "Apprendre les salutations en manjak",
    category: "language",
    duration: "8:15",
    views: "4.2K",
    thumbnail: "https://images.unsplash.com/photo-1523396140703-e5bdad4e5dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwcmVhZGluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzMyNTA5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    title: "La musique traditionnelle manjak",
    category: "culture",
    duration: "20:35",
    views: "2.7K",
    thumbnail: "https://images.unsplash.com/photo-1767293940906-6aa1c13b514b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBtdXNpYyUyMGRhbmNlfGVufDF8fHx8MTc3MzI1MDg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export const mockAssociations = [
  {
    id: 1,
    name: "Association Culturelle Manjak Paris",
    village: "Djibonker",
    zone: "Paris, France",
    mission: "Promotion de la culture et entraide communautaire",
    members: 45,
    type: "Culturelle",
  },
  {
    id: 2,
    name: "Jeunesse Manjak de Dakar",
    village: "Suzana",
    zone: "Dakar, Sénégal",
    mission: "Rassembler et accompagner les jeunes Manjak",
    members: 89,
    type: "Jeunesse",
  },
  {
    id: 3,
    name: "Association Manjak Ziguinchor",
    village: "Kaour",
    zone: "Ziguinchor, Sénégal",
    mission: "Développement local et préservation des traditions",
    members: 67,
    type: "Développement",
  },
  {
    id: 4,
    name: "Femmes Manjak Unies",
    village: "Baghère",
    zone: "Bissau, Guinée-Bissau",
    mission: "Autonomisation et solidarité des femmes",
    members: 52,
    type: "Femmes",
  },
  {
    id: 5,
    name: "Manjak de Lisbonne",
    village: "Djibonker",
    zone: "Lisbonne, Portugal",
    mission: "Intégration et maintien des liens culturels",
    members: 38,
    type: "Diaspora",
  },
  {
    id: 6,
    name: "Association Éducation Manjak",
    village: "Suzana",
    zone: "Dakar, Sénégal",
    mission: "Soutien scolaire et formation en langue manjak",
    members: 34,
    type: "Éducation",
  },
];
