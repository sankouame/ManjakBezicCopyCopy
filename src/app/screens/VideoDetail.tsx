import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Share2, Bookmark, Play, ThumbsUp, MessageCircle, BookOpen, Clock, Star, ChevronRight, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const COURSES_DATA: Record<number, {
  id: number; title: string; type: "video" | "text";
  duration: string; level: string; views: string; rating: number; likes: number;
  instructor: string; instructorAvatar: string; instructorBio: string;
  thumbnail: string; category: string;
  content?: string; // for text courses
  description: string;
}> = {
  1: {
    id: 1, type: "video", title: "Introduction à la langue manjak",
    duration: "12:30", level: "Débutant", views: "2.4K", rating: 4.8, likes: 124,
    instructor: "Fatou Diatta", instructorAvatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    instructorBio: "Enseignante de langue Manjak depuis 10 ans",
    thumbnail: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweY91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Langue",
    description: "Apprenez les bases de la langue manjak avec cette vidéo d'introduction. Nous couvrons les salutations essentielles, les phrases courantes et la prononciation correcte. Parfait pour les débutants qui souhaitent découvrir notre belle langue.",
  },
  2: {
    id: 2, type: "video", title: "Histoire du peuple Manjak — des origines à aujourd'hui",
    duration: "18:45", level: "Intermédiaire", views: "3.1K", rating: 4.9, likes: 210,
    instructor: "Boubacar Manga", instructorAvatar: "https://images.unsplash.com/photo-1633121812435-9aa67092b1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    instructorBio: "Historien et conteur Manjak, auteur de plusieurs ouvrages",
    thumbnail: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Histoire",
    description: "Plongez dans l'histoire fascinante du peuple Manjak, de leurs origines en Guinée-Bissau jusqu'à leur diaspora mondiale actuelle. Une exploration historique et culturelle incontournable.",
  },
  5: {
    id: 5, type: "text", title: "Guide complet de la grammaire Manjak",
    duration: "25 min de lecture", level: "Intermédiaire", views: "1.9K", rating: 4.9, likes: 87,
    instructor: "Fatou Diatta", instructorAvatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    instructorBio: "Enseignante de langue Manjak depuis 10 ans",
    thumbnail: "https://images.unsplash.com/photo-1523396140703-e5bdad4e5dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    category: "Langue",
    description: "Un guide complet pour comprendre la structure grammaticale de la langue Manjak.",
    content: `## Introduction

La langue Manjak (également écrite Manjaku, Mandjak ou Manjaco) appartient à la famille des langues atlantiques du phylum Niger-Congo. Elle est principalement parlée en **Guinée-Bissau**, au **Sénégal** et en **Gambie**, avec une diaspora importante en Europe.

## Structure de base

### L'ordre des mots

En Manjak, l'ordre canonique des mots est **Sujet - Verbe - Objet (SVO)**, similaire au français :

> *Mamadou* (sujet) + *kaa* (voir) + *yèt* (eau) → "Mamadou voit l'eau"

### Les tons

Le Manjak est une **langue tonale**. Les tons bas et hauts changent le sens des mots. Par exemple :
- **baa** (ton bas) = père
- **báa** (ton haut) = mère

## Les pronoms personnels

| Personne | Singulier | Pluriel |
|----------|-----------|---------|
| 1ère | *ñaa* (moi) | *biti* (nous) |
| 2ème | *bu* (toi) | *bunu* (vous) |
| 3ème | *u* (il/elle) | *ñiñi* (ils/elles) |

## Les salutations fondamentales

Les salutations sont essentielles dans la culture Manjak. Elles témoignent du respect et de l'appartenance à la communauté :

- **Kaa!** — Bonjour (matin)
- **Kiiñu** — Bonsoir
- **Noo kumbaa ?** — Comment vas-tu ?
- **M kumbaa doo** — Je vais bien
- **Tanante!** — Merci

## Conclusion

La maîtrise de la grammaire Manjak demande du temps et de la pratique. L'important est de commencer par les structures de base et de s'immerger progressivement dans la langue au travers de conversations avec des locuteurs natifs.`,
  },
  6: {
    id: 6, type: "text", title: "Les rites d'initiation dans la culture Manjak",
    duration: "18 min de lecture", level: "Intermédiaire", views: "2.3K", rating: 4.8, likes: 156,
    instructor: "Ousmane Faye", instructorAvatar: "https://images.unsplash.com/photo-1762885590704-cbe990f95ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    instructorBio: "Sage de la communauté, gardien des traditions ancestrales",
    thumbnail: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0JTIwYWZyaWNhbiUyMHZpbGxhZ2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMjUwODg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Culture",
    description: "Une exploration approfondie des rites d'initiation Manjak et leur signification dans la société.",
    content: `## Les rites d'initiation : pilier de la société Manjak

Les rites d'initiation occupent une place **centrale et sacrée** dans la société Manjak. Ils représentent bien plus qu'un simple passage à l'âge adulte : ils constituent le vecteur principal de transmission des valeurs, des savoirs et de l'identité culturelle.

## Le Fanado — l'initiation masculine

Le **Fanado** est la cérémonie d'initiation des jeunes garçons. Elle se déroule généralement entre 12 et 16 ans et dure plusieurs semaines :

### Les étapes du Fanado

1. **La préparation** — Les familles s'organisent et les anciens choisissent la période propice selon le calendrier sacré
2. **La retraite en forêt** — Les initiés quittent le village pour un espace sacré en forêt
3. **L'enseignement** — Transmission des savoirs ancestraux, des chants, de l'histoire du peuple
4. **Le retour au village** — Accueil triomphal par toute la communauté

## L'initiation féminine

Les jeunes filles ont également leurs propres cérémonies initiatiques, organisées par les femmes anciennes. Ces rites valorisent :
- La transmission des savoirs culinaires et artisanaux
- L'enseignement des chants et danses réservés aux femmes
- La préparation au rôle de mère et de gardienne du foyer

## Symbolisme et modernité

Aujourd'hui, les rites d'initiation Manjak s'adaptent à la modernité tout en préservant leur essence. Dans la diaspora, des formes adaptées permettent de maintenir ce lien vital avec les racines culturelles.`,
  },
};

const COMMENTS = [
  { id: 1, name: "Mamadou Sané", avatar: "https://images.unsplash.com/photo-1668752600261-e56e7f3780b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", text: "Excellent cours, très bien expliqué ! 👏", time: "Il y a 2h" },
  { id: 2, name: "Aminata Mané", avatar: "https://images.unsplash.com/photo-1766107349875-51d1ad175cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", text: "Merci pour ce partage, j'apprends énormément !", time: "Il y a 5h" },
  { id: 3, name: "Ibrahima Badji", avatar: "https://images.unsplash.com/photo-1700934909225-072b51bae308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", text: "Super contenu, j'attends la suite 🙏", time: "Hier" },
];

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  "Débutant":      { bg: "#E8F0EC", text: "#1E4D3A" },
  "Intermédiaire": { bg: "#F9F3E3", text: "#D4A64A" },
  "Avancé":        { bg: "#F7EDE6", text: "#C96A3D" },
};

export function VideoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = parseInt(id || "1");
  const course = COURSES_DATA[courseId] || COURSES_DATA[1];

  const [liked, setLiked]     = useState(false);
  const [saved, setSaved]     = useState(false);
  const [likes, setLikes]     = useState(course.likes);
  const [comment, setComment] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "comments">("content");
  const lv = LEVEL_COLORS[course.level] || LEVEL_COLORS["Débutant"];

  return (
    <div className="min-h-screen bg-white pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-gray-100 px-4 pt-12 pb-3 flex items-center justify-between" style={{ background: "rgba(254,238,205,0.97)" }}>
        <button onClick={() => navigate("/app/videos")} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <div className="flex gap-1">
          <button onClick={() => setSaved(!saved)} className="p-2">
            <Bookmark className={`w-5 h-5 ${saved ? "fill-[#1E4D3A] text-[#1E4D3A]" : "text-gray-600"}`} />
          </button>
          <button className="p-2">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Thumbnail / Video player area */}
      <div className="relative bg-gray-900 aspect-video">
        <ImageWithFallback
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover opacity-75"
        />
        {course.type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl">
              <Play className="w-9 h-9 ml-1.5" style={{ color: "#1E4D3A" }} fill="#1E4D3A" />
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
              <BookOpen className="w-9 h-9" style={{ color: "#C96A3D" }} />
            </div>
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs text-white" style={{ background: course.type === "video" ? "#1E4D3A" : "#C96A3D", fontWeight: 600 }}>
            {course.type === "video" ? "📹 Vidéo" : "📖 Article"}
          </span>
        </div>
        {course.type === "video" && (
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {course.duration}
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: lv.bg, color: lv.text, fontWeight: 600 }}>
            {course.level}
          </span>
          <span className="text-xs text-gray-400" style={{ fontWeight: 400 }}>{course.category}</span>
        </div>
        <h1 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.35 }}>
          {course.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span style={{ fontWeight: 400 }}>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span style={{ fontWeight: 400 }}>{course.views} vues</span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3.5 h-3.5 fill-yellow-400" />
            <span style={{ fontWeight: 600, color: "#6B7280" }}>{course.rating}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 flex items-center gap-6 border-b border-gray-100">
        <button
          onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
          className={`flex items-center gap-2 ${liked ? "text-[#1E4D3A]" : "text-gray-500"}`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? "fill-[#1E4D3A]" : ""}`} />
          <span className="text-sm" style={{ fontWeight: liked ? 600 : 400 }}>{likes}</span>
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className="flex items-center gap-2 text-gray-500"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm" style={{ fontWeight: 400 }}>{COMMENTS.length}</span>
        </button>
      </div>

      {/* Instructor */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <img src={course.instructorAvatar} alt={course.instructor} className="w-11 h-11 rounded-full object-cover" />
        <div className="flex-1">
          <p className="text-gray-900 text-sm" style={{ fontWeight: 600 }}>{course.instructor}</p>
          <p className="text-gray-400 text-xs" style={{ fontWeight: 400 }}>{course.instructorBio}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-300" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-5">
        <button
          onClick={() => setActiveTab("content")}
          className={`py-3 mr-6 text-sm border-b-2 transition-colors ${activeTab === "content" ? "border-[#1E4D3A] text-[#1E4D3A]" : "border-transparent text-gray-400"}`}
          style={{ fontWeight: activeTab === "content" ? 600 : 400 }}
        >
          {course.type === "text" ? "Contenu" : "À propos"}
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`py-3 text-sm border-b-2 transition-colors ${activeTab === "comments" ? "border-[#C96A3D] text-[#C96A3D]" : "border-transparent text-gray-400"}`}
          style={{ fontWeight: activeTab === "comments" ? 600 : 400 }}
        >
          Commentaires ({COMMENTS.length})
        </button>
      </div>

      {/* Content tab */}
      {activeTab === "content" && (
        <div className="px-5 py-4">
          {course.type === "text" && course.content ? (
            <div className="prose-sm">
              {course.content.split("\n").map((line, i) => {
                if (line.startsWith("## ")) return <h2 key={i} className="text-gray-900 mt-5 mb-2" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{line.slice(3)}</h2>;
                if (line.startsWith("### ")) return <h3 key={i} className="text-gray-800 mt-4 mb-1.5" style={{ fontWeight: 600, fontSize: "0.95rem" }}>{line.slice(4)}</h3>;
                if (line.startsWith("- ")) return <p key={i} className="text-gray-600 text-sm pl-3 mb-1 leading-relaxed" style={{ fontWeight: 400 }}>• {line.slice(2)}</p>;
                if (line.match(/^\d\./)) return <p key={i} className="text-gray-600 text-sm pl-3 mb-1 leading-relaxed" style={{ fontWeight: 400 }}>{line}</p>;
                if (line.startsWith("> ")) return <div key={i} className="border-l-4 pl-3 my-2 rounded-r-lg py-2" style={{ borderColor: "#1E4D3A", background: "#E8F0EC" }}><p className="text-sm italic" style={{ color: "#1E4D3A", fontWeight: 500 }}>{line.slice(2)}</p></div>;
                if (line.trim() === "") return <div key={i} className="h-2" />;
                const boldParsed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                return <p key={i} className="text-gray-600 text-sm leading-relaxed mb-2" style={{ fontWeight: 400 }} dangerouslySetInnerHTML={{ __html: boldParsed }} />;
              })}
            </div>
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed" style={{ fontWeight: 400 }}>{course.description}</p>
          )}
        </div>
      )}

      {/* Comments tab */}
      {activeTab === "comments" && (
        <div className="px-5 py-4">
          {/* Add comment */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E4D3A] to-[#C96A3D] flex items-center justify-center text-white flex-shrink-0" style={{ fontSize: "0.7rem", fontWeight: 700 }}>
              MS
            </div>
            <div className="flex-1 flex items-center gap-2 h-10 bg-gray-100 rounded-xl px-3">
              <input
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Votre commentaire…"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              {comment && (
                <button onClick={() => setComment("")}>
                  <Send className="w-4 h-4" style={{ color: "#1E4D3A" }} />
                </button>
              )}
            </div>
          </div>
          {/* Comments list */}
          <div className="space-y-4">
            {COMMENTS.map(c => (
              <div key={c.id} className="flex gap-3">
                <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-2xl px-4 py-3">
                    <p className="text-gray-900 text-xs mb-1" style={{ fontWeight: 600 }}>{c.name}</p>
                    <p className="text-gray-600 text-sm" style={{ fontWeight: 400 }}>{c.text}</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-1 ml-3" style={{ fontWeight: 400 }}>{c.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Fix missing Eye import
function Eye(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}