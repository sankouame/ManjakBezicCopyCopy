export interface MockUser {
  id: number;
  name: string;
  initials: string;
  village: string;
  villageName: string; // display name
  residence: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  posts: number;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    name: "Mamadou Sané",
    initials: "MS",
    village: "Cacheu",
    villageName: "Cacheu",
    residence: "Dakar, Sénégal",
    bio: "Fier de nos racines Manjak 🌿 | Animateur culturel",
    avatar: "https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 312,
    following: 145,
    posts: 48,
  },
  {
    id: 2,
    name: "Fatou Diatta",
    initials: "FD",
    village: "Ziguinchor",
    villageName: "Ziguinchor",
    residence: "Paris, France",
    bio: "Enseignante de langue Manjak 📚 | Culture & Éducation",
    avatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 528,
    following: 203,
    posts: 72,
  },
  {
    id: 3,
    name: "Boubacar Manga",
    initials: "BM",
    village: "Bissau",
    villageName: "Bissau",
    residence: "Lisbonne, Portugal",
    bio: "Historien & conteur Manjak 🎙️",
    avatar: "https://images.unsplash.com/photo-1633121812435-9aa67092b1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 890,
    following: 320,
    posts: 134,
  },
  {
    id: 4,
    name: "Aminata Mané",
    initials: "AM",
    village: "Canchungo",
    villageName: "Canchungo",
    residence: "Ziguinchor, Sénégal",
    bio: "Militante associative 💪 | Femmes Manjak Unies",
    avatar: "https://images.unsplash.com/photo-1766107349875-51d1ad175cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 241,
    following: 189,
    posts: 37,
  },
  {
    id: 5,
    name: "Ibrahima Badji",
    initials: "IB",
    village: "Varela",
    villageName: "Varela",
    residence: "Bissau, Guinée-Bissau",
    bio: "Musicien traditionnel 🎵 | Préservation du patrimoine",
    avatar: "https://images.unsplash.com/photo-1700934909225-072b51bae308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 1240,
    following: 456,
    posts: 215,
  },
  {
    id: 6,
    name: "Mariama Cissé",
    initials: "MC",
    village: "Kabrousse",
    villageName: "Kabrousse",
    residence: "Dakar, Sénégal",
    bio: "Artisane & designer textile 🪡 | Motifs Manjak",
    avatar: "https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 674,
    following: 290,
    posts: 98,
  },
  {
    id: 7,
    name: "Ousmane Faye",
    initials: "OF",
    village: "Cacheu",
    villageName: "Cacheu",
    residence: "Paris, France",
    bio: "Sage de la communauté 🌾 | Traditions & Mémoire",
    avatar: "https://images.unsplash.com/photo-1762885590704-cbe990f95ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 432,
    following: 120,
    posts: 56,
  },
  {
    id: 8,
    name: "Kadiatou Baldé",
    initials: "KB",
    village: "Canchungo",
    villageName: "Canchungo",
    residence: "Banjul, Gambie",
    bio: "Étudiante en anthropologie 📖 | Diaspora Manjak",
    avatar: "https://images.unsplash.com/photo-1663117172617-dada4103ecb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    followers: 189,
    following: 230,
    posts: 24,
  },
];

// Get users by village name
export function getUsersByVillage(villageName: string): MockUser[] {
  return MOCK_USERS.filter(u => u.village === villageName);
}

// Get all villages that have at least one member
export const VILLAGES_WITH_MEMBERS = [...new Set(MOCK_USERS.map(u => u.village))];
