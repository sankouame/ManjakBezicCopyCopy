import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search, Bell, Heart, MessageCircle, Share2, Bookmark,
  MoreHorizontal, Brain, Map, Newspaper, Play, Users,
  Calendar, ChevronRight, Plus, Camera
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";
import { useTheme } from "../context/ThemeContext";
import { MOCK_USERS } from "../data/mockUsers";

interface Post {
  id: number;
  author: { id: number; name: string; initials: string; village: string };
  content: string;
  media?: { type: "image" | "video"; url: string };
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

const quickAccess = [
  { id: "quiz",         label: "Quiz",         icon: Brain,     color: "#1E4D3A", bg: "#E8F0EC" },
  { id: "news",         label: "Actualités",   icon: Newspaper, color: "#C96A3D", bg: "#F7EDE6" },
  { id: "videos",       label: "Cours",        icon: Play,      color: "#D4A64A", bg: "#F9F3E3" },
  { id: "map",          label: "Carte",        icon: Map,       color: "#1E4D3A", bg: "#E8F0EC" },
  { id: "associations", label: "Associations", icon: Users,     color: "#C96A3D", bg: "#F7EDE6" },
];

const paths: Record<string, string> = {
  quiz: "/app/quiz",
  news: "/app/news",
  videos: "/app/videos",
  map: "/app/villages-map",
  associations: "/app/associations",
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: { id: 1, name: "Mamadou Sané", initials: "MS", village: "Djibonker" },
    content: "Magnifique festival culturel ce weekend à Ziguinchor ! Fier de notre culture manjak 🎉🇸🇳",
    media: { type: "image", url: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080" },
    likes: 45, comments: 12, timestamp: "Il y a 2h", isLiked: false, isSaved: false,
  },
  {
    id: 2,
    author: { id: 2, name: "Fatou Diatta", initials: "FD", village: "Suzana" },
    content: "Cours de langue manjak tous les samedis ! Rejoignez-nous pour apprendre ensemble 📚✨",
    likes: 32, comments: 8, timestamp: "Il y a 5h", isLiked: true, isSaved: false,
  },
  {
    id: 3,
    author: { id: 3, name: "Boubacar Manga", initials: "BM", village: "Essil" },
    content: "Nouvelle vidéo sur l'histoire de notre peuple disponible maintenant ! 🎥",
    media: { type: "image", url: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGlucyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    likes: 67, comments: 15, timestamp: "Il y a 8h", isLiked: false, isSaved: true,
  },
  {
    id: 4,
    author: { id: 4, name: "Aminata Mané", initials: "AM", village: "Djibonker" },
    content: "Réunion des associations ce samedi à 15h. Tous les membres sont invités ! 🤝",
    likes: 28, comments: 6, timestamp: "Hier", isLiked: false, isSaved: false,
  },
  {
    id: 5,
    author: { id: 5, name: "Ibrahima Badji", initials: "IB", village: "Baghère" },
    content: "Qui se souvient de cette danse traditionnelle ? Partagez vos souvenirs ! 💃🏾",
    media: { type: "image", url: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    likes: 52, comments: 18, timestamp: "Hier", isLiked: true, isSaved: false,
  },
];

export function Home() {
  const navigate  = useNavigate();
  const { isDark } = useTheme();
  const [posts, setPosts]     = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<"communaute" | "evenements">("communaute");

  /* ── Tokens dark / light ───────────────────────────────── */
  const bg      = isDark ? "#111111"                    : "#FEEECD";
  const surface = isDark ? "#1C1C1E"                    : "#FEEECD";   /* header + cards = crème */
  const border  = isDark ? "rgba(255,255,255,0.07)"     : "rgba(30,77,58,0.15)";
  const txt     = isDark ? "#F2F2F2"                    : "#1A1A1A";
  const muted   = isDark ? "#8E8E93"                    : "#8A7060";
  const chip    = isDark ? "#2C2C2E"                    : "#F0DDB8";   /* chips légèrement plus sombres */
  const banner  = isDark ? "#1C1C1E"                    : "#1E4D3A";
  const bannerT = isDark ? "#8E8E93"                    : "rgba(255,255,255,0.65)";

  const handleLike = (id: number) =>
    setPosts(posts.map(p => p.id === id
      ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
      : p));

  const handleSave = (id: number) =>
    setPosts(posts.map(p => p.id === id ? { ...p, isSaved: !p.isSaved } : p));

  return (
    <div className="min-h-screen pb-20" style={{ background: bg }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-20 px-5 pt-10 pb-3 flex items-center justify-between"
        style={{ background: surface, borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="Bëzic" className="w-8 h-8 object-contain" />
          <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.3px", color: "#1E4D3A" }}>
            Bëzic <span style={{ color: "#C96A3D" }}>Manjakù</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/app/search")} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: chip }}>
            <Search className="w-4 h-4" style={{ color: muted }} />
          </button>
          <button onClick={() => navigate("/app/notifications")} className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: chip }}>
            <Bell className="w-4 h-4" style={{ color: muted }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C96A3D] rounded-full" style={{ border: `2px solid ${surface}` }} />
          </button>
        </div>
      </div>

      {/* ── Bannière bienvenue ──────────────────────────────── */}
      <div className="px-4 pt-4 pb-2">
        <div className="rounded-2xl px-5 py-4" style={{ background: banner, border: `1px solid ${isDark ? border : "transparent"}` }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: bannerT, fontWeight: 400 }}>Bienvenue 👋</p>
              <h1 className="mt-0.5" style={{ fontWeight: 700, fontSize: "1.2rem", lineHeight: 1.3, color: isDark ? "#F2F2F2" : "#FEEECD" }}>
                Mamadou Sané
              </h1>
            </div>
            <div className="text-right">
              <p style={{ fontWeight: 700, fontSize: "1.2rem", color: isDark ? "#C96A3D" : "#D4A64A" }}>1 243</p>
              <p className="text-xs" style={{ color: bannerT, fontWeight: 400 }}>membres actifs</p>
            </div>
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: isDark ? "#5BAF84" : "#FEEECD" }} />
              <span className="text-xs" style={{ color: bannerT, fontWeight: 400 }}>48 posts aujourd'hui</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: "#D4A64A" }} />
              <span className="text-xs" style={{ color: bannerT, fontWeight: 400 }}>3 événements</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Accès rapides ───────────────────────────────────── */}
      <div className="px-4 pt-3 pb-2">
        <p className="text-xs mb-3 px-0.5" style={{ color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Accès rapides</p>
        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {quickAccess.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} onClick={() => navigate(paths[item.id])} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
                  style={{ background: isDark ? `${item.color}1A` : item.bg, border: `1px solid ${border}` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <span className="text-[10px] text-center" style={{ color: muted, fontWeight: 500 }}>{item.label}</span>
              </button>
            );
          })}
          <button onClick={() => navigate("/app/events/1")} className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div
              className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center"
              style={{ background: isDark ? "#D4A64A1A" : "#F9F3E3", border: `1px solid ${border}` }}
            >
              <Calendar className="w-6 h-6" style={{ color: "#D4A64A" }} />
            </div>
            <span className="text-[10px] text-center" style={{ color: muted, fontWeight: 500 }}>Événements</span>
          </button>
        </div>
      </div>

      {/* ── Prochaine événement ─────────────────────────────── */}
      <div className="px-4 pt-2 pb-3">
        <button
          onClick={() => navigate("/app/events/1")}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left"
          style={{ background: "#1E4D3A" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 400 }}>Prochain événement</p>
            <p className="text-sm truncate" style={{ color: "#FEEECD", fontWeight: 600 }}>Festival culturel Manjak — Dakar</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs" style={{ color: "#D4A64A", fontWeight: 700 }}>15 Mars</p>
            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>2026</p>
          </div>
        </button>
      </div>

      {/* ── Feed ───────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${border}` }}>

        {/* Onglets */}
        <div className="flex px-5" style={{ background: surface, borderBottom: `1px solid ${border}` }}>
          {(["communaute", "evenements"] as const).map((t) => {
            const label = t === "communaute" ? "Communauté" : "Événements & Actus";
            const ac    = t === "communaute" ? "#1E4D3A" : "#C96A3D";
            return (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="py-3 mr-6 text-sm border-b-2 transition-colors"
                style={{
                  borderBottomColor: activeTab === t ? ac : "transparent",
                  color: activeTab === t ? ac : muted,
                  fontWeight: activeTab === t ? 600 : 400,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Composer */}
        <div className="px-4 py-3" style={{ background: surface, borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#1E4D3A,#C96A3D)", fontSize: "0.65rem", fontWeight: 700 }}
            >
              MS
            </div>
            <button
              onClick={() => navigate("/app/create-post")}
              className="flex-1 h-9 rounded-full px-4 text-left text-sm flex items-center"
              style={{ background: chip, color: muted, fontWeight: 400 }}
            >
              Partagez quelque chose…
            </button>
            <button
              onClick={() => navigate("/app/create-post")}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: chip }}
            >
              <Camera className="w-4 h-4" style={{ color: "#C96A3D" }} />
            </button>
          </div>
        </div>

        {/* Posts */}
        {activeTab === "communaute" && (
          <div>
            {posts.map((post) => {
              const mu = MOCK_USERS.find(u => u.id === post.author.id);
              return (
                <div key={post.id} style={{ background: surface, borderBottom: `1px solid ${border}` }}>
                  {/* Header */}
                  <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                    <button onClick={() => navigate(`/app/profile/${post.author.id}`)} className="flex items-center gap-3">
                      {mu
                        ? <img src={mu.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                        : <div className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                            style={{ background: "linear-gradient(135deg,#1E4D3A,#C96A3D)", fontSize: "0.65rem", fontWeight: 700 }}>
                            {post.author.initials}
                          </div>
                      }
                      <div className="text-left">
                        <p className="text-sm" style={{ color: txt, fontWeight: 600, lineHeight: 1.3 }}>{post.author.name}</p>
                        <p className="text-xs" style={{ color: muted, fontWeight: 400 }}>{post.author.village} · {post.timestamp}</p>
                      </div>
                    </button>
                    <button><MoreHorizontal className="w-4 h-4" style={{ color: muted }} /></button>
                  </div>

                  {/* Texte */}
                  <div className="px-4 pb-3">
                    <p className="text-sm leading-relaxed" style={{ color: txt, fontWeight: 400 }}>{post.content}</p>
                  </div>

                  {/* Image */}
                  {post.media && (
                    <div className="px-4 pb-3">
                      <div className="rounded-2xl overflow-hidden">
                        <ImageWithFallback src={post.media.url} alt={post.content} className="w-full h-56 object-cover" />
                      </div>
                    </div>
                  )}

                  {/* Compteurs */}
                  <div className="px-4 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                        <Heart className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                      <span className="text-xs" style={{ color: muted }}>{post.likes}</span>
                    </div>
                    <span className="text-xs" style={{ color: muted }}>{post.comments} commentaires</span>
                  </div>

                  {/* Actions */}
                  <div className="px-2 py-2 flex items-center justify-around" style={{ borderTop: `1px solid ${border}` }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
                      style={{
                        color: post.isLiked ? "#FF453A" : muted,
                        background: post.isLiked ? (isDark ? "#FF453A18" : "#FFEEED") : "transparent",
                      }}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-[#FF453A]" : ""}`} />
                      <span className="text-xs" style={{ fontWeight: 500 }}>J'aime</span>
                    </button>
                    <button
                      onClick={() => navigate(`/app/posts/${post.id}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                      style={{ color: muted }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs" style={{ fontWeight: 500 }}>Commenter</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ color: muted }}>
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs" style={{ fontWeight: 500 }}>Partager</span>
                    </button>
                    <button
                      onClick={() => handleSave(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
                      style={{
                        color: post.isSaved ? "#1E4D3A" : muted,
                        background: post.isSaved ? (isDark ? "#1E4D3A25" : "#E8F0EC") : "transparent",
                      }}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-[#1E4D3A]" : ""}`} />
                      <span className="text-xs" style={{ fontWeight: 500 }}>Sauver</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Événements & Actus */}
        {activeTab === "evenements" && (
          <div className="px-4 pt-4 space-y-4 pb-4">
            {/* Événements */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs" style={{ color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>À venir</p>
                <button onClick={() => navigate("/app/news")} className="text-xs flex items-center gap-0.5" style={{ color: "#1E4D3A", fontWeight: 600 }}>
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              {[
                { id: 1, title: "Festival culturel Manjak",  date: "15 Mars 2026", location: "Dakar" },
                { id: 2, title: "Rencontre inter-villages",   date: "22 Mars 2026", location: "Ziguinchor" },
                { id: 3, title: "Atelier langue manjak",      date: "28 Mars 2026", location: "Bissau" },
              ].map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => navigate(`/app/events/${ev.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl mb-2"
                  style={{ background: surface, border: `1px solid ${border}` }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: isDark ? "#D4A64A18" : "#F9F3E3" }}>
                    <Calendar className="w-5 h-5" style={{ color: "#D4A64A" }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm" style={{ color: txt, fontWeight: 600, lineHeight: 1.3 }}>{ev.title}</p>
                    <p className="text-xs" style={{ color: muted, fontWeight: 400 }}>{ev.date} · {ev.location}</p>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: muted }} />
                </button>
              ))}
            </div>

            {/* Actualités */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs" style={{ color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Actualités</p>
                <button onClick={() => navigate("/app/news")} className="text-xs flex items-center gap-0.5" style={{ color: "#1E4D3A", fontWeight: 600 }}>
                  Voir tout <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              {[
                { id: 1, title: "Nouvelle association créée à Paris", date: "Il y a 2 jours", img: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
                { id: 2, title: "Cours de langue manjak en ligne",    date: "Il y a 3 jours", img: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
              ].map((news) => (
                <button
                  key={news.id}
                  onClick={() => navigate(`/app/news/${news.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl mb-2"
                  style={{ background: surface, border: `1px solid ${border}` }}
                >
                  <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={news.img} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm" style={{ color: txt, fontWeight: 600, lineHeight: 1.3 }}>{news.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: muted, fontWeight: 400 }}>{news.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: muted }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate("/app/create-post")}
        className="fixed bottom-20 right-5 w-12 h-12 rounded-full shadow-xl flex items-center justify-center z-10"
        style={{ background: "#C96A3D" }}
      >
        <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
}