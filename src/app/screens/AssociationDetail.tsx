import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, Users, Mail, Phone, Share2, Calendar, Target, Check, Plus, Send, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { MOCK_USERS } from "../data/mockUsers";
import { useColors } from "../hooks/useColors";

const ASSOC_DATA: Record<number, {
  id: number; name: string; avatar: string; zone: string; type: string;
  village: string; founded: string; eventsPerYear: number; mission: string;
  about: string[]; activities: string[]; email: string; phone: string;
}> = {
  1: {
    id: 1, name: "Association Culturelle Manjak Paris", avatar: "🎭",
    zone: "Paris, France", type: "Culturelle", village: "Djibonker", founded: "2020",
    eventsPerYear: 12,
    mission: "Promotion de la culture manjak et entraide communautaire au sein de la diaspora parisienne.",
    about: [
      "L'Association Culturelle Manjak Paris rassemble la communauté manjak en région parisienne pour promouvoir notre riche patrimoine culturel.",
      "Nous organisons des événements réguliers, des cours de langue et apportons notre soutien aux membres de la diaspora pour maintenir le lien avec nos racines.",
    ],
    activities: [
      "Cours de langue manjak tous les samedis",
      "Soirées culturelles mensuelles",
      "Soutien aux nouveaux arrivants",
      "Organisation d'événements festifs",
    ],
    email: "contact@manjakparis.fr",
    phone: "+33 6 12 34 56 78",
  },
  2: {
    id: 2, name: "Jeunesse Manjak de Dakar", avatar: "🌱",
    zone: "Dakar, Sénégal", type: "Jeunesse", village: "Suzana", founded: "2019",
    eventsPerYear: 8,
    mission: "Rassembler et accompagner les jeunes Manjak de la région dakaroise.",
    about: [
      "La Jeunesse Manjak de Dakar est un espace de rencontre et d'expression pour les jeunes issus de la communauté Manjak.",
      "Nous organisons des activités culturelles, sportives et éducatives pour renforcer les liens et valoriser notre identité.",
    ],
    activities: [
      "Tournois sportifs inter-quartiers",
      "Ateliers de découverte culturelle",
      "Programmes de mentorat",
      "Sorties culturelles et voyages",
    ],
    email: "jeunesse.manjak.dakar@gmail.com",
    phone: "+221 77 123 45 67",
  },
};

interface ForumPost {
  id: number; authorId: number; content: string; timestamp: string; likes: number; liked: boolean; comments: number;
}

const INITIAL_POSTS: ForumPost[] = [
  { id: 1, authorId: 2, content: "Prochain cours de langue Manjak ce samedi à 14h ! Venez nombreux 📚", timestamp: "Il y a 1h", likes: 12, liked: false, comments: 3 },
  { id: 2, authorId: 5, content: "Magnifique soirée culturelle hier soir ! Merci à tous ceux qui ont participé 🙏🎶", timestamp: "Il y a 6h", likes: 28, liked: true, comments: 8 },
  { id: 3, authorId: 7, content: "Rappel : réunion mensuelle jeudi à 19h. Ordre du jour : organisation du festival de mars.", timestamp: "Hier", likes: 9, liked: false, comments: 2 },
  { id: 4, authorId: 4, content: "Qui est disponible pour aider à l'organisation de l'événement du 15 mars ? On a besoin de bénévoles ! 🤝", timestamp: "Hier", likes: 15, liked: false, comments: 6 },
];

const MEMBERS = MOCK_USERS.slice(0, 5);

export function AssociationDetail() {
  const navigate = useNavigate();
  const { id }   = useParams();
  const c        = useColors();
  const assocId  = parseInt(id || "1");
  const assoc    = ASSOC_DATA[assocId] || ASSOC_DATA[1];

  const [joined, setJoined]       = useState(assocId === 2);
  const [members, setMembers]     = useState(assocId === 1 ? 45 : 89);
  const [activeTab, setActiveTab] = useState<"about" | "forum" | "members">("about");
  const [posts, setPosts]         = useState<ForumPost[]>(INITIAL_POSTS);
  const [newPost, setNewPost]     = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleJoin = () => {
    const wasJoined = joined;
    setJoined(!joined);
    setMembers(m => wasJoined ? m - 1 : m + 1);
    if (!wasJoined) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2500);
    }
  };

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p =>
      p.id === postId ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const handlePostSubmit = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{
      id: Date.now(), authorId: 1, content: newPost.trim(),
      timestamp: "À l'instant", likes: 0, liked: false, comments: 0,
    }, ...prev]);
    setNewPost("");
  };

  const getUser = (id: number) => MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];

  return (
    <div className="min-h-screen pb-8" style={{ background: c.bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm px-4 pt-12 pb-3 flex items-center justify-between"
        style={{ background: c.isDark ? "rgba(17,17,17,0.97)" : "rgba(254,238,205,0.97)", borderBottom: `1px solid ${c.border}` }}
      >
        <button onClick={() => navigate("/app/associations")} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" style={{ color: c.txt }} />
        </button>
        <button className="p-2">
          <Share2 className="w-5 h-5" style={{ color: c.muted }} />
        </button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1E4D3A] to-[#C96A3D] px-6 pt-8 pb-6 text-white">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5 text-4xl" style={{ background: "rgba(255,255,255,0.2)" }}>
          {assoc.avatar}
        </div>
        <h1 className="mb-2" style={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.3 }}>{assoc.name}</h1>
        <div className="flex items-center gap-1.5 text-white/80 text-sm mb-4" style={{ fontWeight: 400 }}>
          <MapPin className="w-4 h-4" />
          <span>{assoc.zone}</span>
        </div>
        <div className="flex gap-3">
          {[{ label: "Membres", val: members }, { label: "Création", val: assoc.founded }, { label: "Évts/an", val: assoc.eventsPerYear }].map(s => (
            <div key={s.label} className="flex-1 rounded-2xl px-3 py-2.5 text-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <p className="text-white" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.val}</p>
              <p className="text-white/70 text-xs" style={{ fontWeight: 400 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Join button */}
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${c.border}` }}>
        <button
          onClick={handleJoin}
          className="w-full h-12 rounded-2xl flex items-center justify-center gap-2 transition-all"
          style={{
            background: joined ? c.greenBg : "#1E4D3A",
            color: joined ? "#1E4D3A" : "white",
            fontWeight: 700, fontSize: "0.95rem",
            border: joined ? "2px solid #1E4D3A" : "none",
          }}
        >
          {joined
            ? <><Check className="w-5 h-5" /> Membre de l'association</>
            : <><Plus className="w-5 h-5" /> Rejoindre l'association</>
          }
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-5" style={{ borderBottom: `1px solid ${c.border}` }}>
        {(["about", "forum", "members"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="py-3 mr-5 text-sm border-b-2 transition-colors"
            style={{
              borderBottomColor: activeTab === t ? "#1E4D3A" : "transparent",
              color: activeTab === t ? "#1E4D3A" : c.muted,
              fontWeight: activeTab === t ? 600 : 400,
            }}
          >
            {t === "about" ? "À propos" : t === "forum" ? "Forum" : "Membres"}
          </button>
        ))}
      </div>

      {/* ── About tab ── */}
      {activeTab === "about" && (
        <div className="px-5 py-4 space-y-5">
          <div className="flex gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full text-white" style={{ background: "#1E4D3A", fontWeight: 500 }}>{assoc.type}</span>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: c.chip, color: c.muted, fontWeight: 400 }}>{assoc.village}</span>
          </div>

          <div>
            <h3 className="mb-2" style={{ color: c.txt, fontWeight: 600, fontSize: "0.95rem" }}>À propos</h3>
            {assoc.about.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed mb-2" style={{ color: c.txtSub, fontWeight: 400 }}>{p}</p>
            ))}
          </div>

          <div>
            <h3 className="mb-3" style={{ color: c.txt, fontWeight: 600, fontSize: "0.95rem" }}>Notre mission</h3>
            <div className="rounded-2xl p-4" style={{ background: c.creamBg, border: `1px solid ${c.border}` }}>
              <Target className="w-5 h-5 mb-2" style={{ color: "#D4A64A" }} />
              <p className="text-sm leading-relaxed" style={{ color: c.txtSub, fontWeight: 400 }}>{assoc.mission}</p>
            </div>
          </div>

          <div>
            <h3 className="mb-3" style={{ color: c.txt, fontWeight: 600, fontSize: "0.95rem" }}>Activités principales</h3>
            <div className="space-y-2">
              {assoc.activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: c.surface2 }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.greenBg }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "#1E4D3A" }} />
                  </div>
                  <p className="text-sm flex-1" style={{ color: c.txtSub, fontWeight: 400 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-4 space-y-3" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
            <h3 className="mb-1" style={{ color: c.txt, fontWeight: 600, fontSize: "0.95rem" }}>Contact</h3>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" style={{ color: "#1E4D3A" }} />
              <span className="text-sm" style={{ color: c.txtSub, fontWeight: 400 }}>{assoc.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4" style={{ color: "#1E4D3A" }} />
              <span className="text-sm" style={{ color: c.txtSub, fontWeight: 400 }}>{assoc.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Forum tab ── */}
      {activeTab === "forum" && (
        <div>
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${c.border}` }}>
            {!joined ? (
              <div className="rounded-2xl p-4 text-center" style={{ background: c.goldBg, border: `1px solid ${c.border}` }}>
                <p className="text-sm mb-3" style={{ color: c.muted, fontWeight: 400 }}>Rejoignez l'association pour participer aux discussions</p>
                <button
                  onClick={handleJoin}
                  className="px-5 py-2 rounded-xl text-sm text-white"
                  style={{ background: "#1E4D3A", fontWeight: 600 }}
                >
                  Rejoindre pour participer
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#1E4D3A,#C96A3D)", fontSize: "0.7rem", fontWeight: 700 }}>
                  MS
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={e => setNewPost(e.target.value)}
                    placeholder="Partagez quelque chose avec l'association..."
                    className="w-full rounded-xl px-3 py-2.5 text-sm border-0 outline-none resize-none"
                    style={{ background: c.chip, color: c.txt }}
                    rows={2}
                  />
                  {newPost.trim() && (
                    <button
                      onClick={handlePostSubmit}
                      className="mt-2 px-4 py-2 rounded-xl text-sm text-white flex items-center gap-1.5"
                      style={{ background: "#1E4D3A", fontWeight: 600 }}
                    >
                      <Send className="w-3.5 h-3.5" /> Publier
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            {posts.map((post) => {
              const author = getUser(post.authorId);
              return (
                <div key={post.id} className="px-5 py-4" style={{ borderBottom: `1px solid ${c.border}` }}>
                  <div className="flex items-center gap-3 mb-2">
                    <img src={author.avatar} alt={author.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>{author.name}</p>
                      <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>{post.timestamp}</p>
                    </div>
                    <button className="p-1">
                      <MoreHorizontal className="w-4 h-4" style={{ color: c.muted }} />
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: c.txtSub, fontWeight: 400 }}>{post.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: post.liked ? "#FF453A" : c.muted }}
                    >
                      <Heart className={`w-4 h-4 ${post.liked ? "fill-[#FF453A]" : ""}`} />
                      <span style={{ fontWeight: post.liked ? 600 : 400 }}>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm" style={{ color: c.muted }}>
                      <MessageCircle className="w-4 h-4" />
                      <span style={{ fontWeight: 400 }}>{post.comments}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Members tab ── */}
      {activeTab === "members" && (
        <div className="px-5 py-4">
          <p className="text-xs mb-4" style={{ color: c.muted, fontWeight: 400 }}>{members} membres au total</p>
          <div className="space-y-3">
            {MEMBERS.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>{user.name}</p>
                  <p className="text-xs truncate" style={{ color: c.muted, fontWeight: 400 }}>{user.bio}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" style={{ color: c.muted, opacity: 0.5 }} />
                    <span className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>{user.residence}</span>
                  </div>
                </div>
                <button
                  className="px-3 py-1.5 rounded-xl text-xs flex-shrink-0"
                  style={{ background: c.greenBg, color: "#1E4D3A", fontWeight: 600 }}
                  onClick={() => navigate(`/app/profile/${user.id}`)}
                >
                  Profil
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toast */}
      {showConfirm && (
        <div
          className="fixed bottom-28 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50"
          style={{ background: "#1E4D3A", color: "white", minWidth: "260px" }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>Association rejointe !</p>
            <p style={{ fontWeight: 400, fontSize: "0.75rem", opacity: 0.8 }}>Bienvenue dans la communauté</p>
          </div>
        </div>
      )}
    </div>
  );
}