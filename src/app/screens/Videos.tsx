import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Play, BookOpen, Clock, Eye, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useColors } from "../hooks/useColors";

type CourseType = "video" | "text";

interface Course {
  id: number;
  title: string;
  type: CourseType;
  category: string;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  views: string;
  rating: number;
  thumbnail: string;
  excerpt?: string;
  instructor: string;
  instructorAvatar: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "Introduction à la langue manjak",
    type: "video",
    category: "language",
    duration: "12:30",
    level: "Débutant",
    views: "2.4K",
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweY9vdGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=400",
    instructor: "Fatou Diatta",
    instructorAvatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 2,
    title: "Histoire du peuple Manjak — des origines à aujourd'hui",
    type: "video",
    category: "history",
    duration: "18:45",
    level: "Intermédiaire",
    views: "3.1K",
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=400",
    instructor: "Boubacar Manga",
    instructorAvatar: "https://images.unsplash.com/photo-1633121812435-9aa67092b1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 3,
    title: "Les salutations et expressions du quotidien",
    type: "video",
    category: "language",
    duration: "8:15",
    level: "Débutant",
    views: "4.2K",
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1523396140703-e5bdad4e5dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcGVvcGxlJTIwcmVhZGluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzMyNTA5Njl8MA&ixlib=rb-4.1.0&q=80&w=400",
    instructor: "Fatou Diatta",
    instructorAvatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 4,
    title: "Danses et musiques traditionnelles Manjak",
    type: "video",
    category: "culture",
    duration: "15:20",
    level: "Débutant",
    views: "1.8K",
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1767293940906-6aa1c13b514b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdHJhZGl0aW9uYWwlMjBtdXNpYyUyMGRhbmNlfGVufDF8fHx8MTc3MzI1MDg4N3ww&ixlib=rb-4.1.0&q=80&w=400",
    instructor: "Ibrahima Badji",
    instructorAvatar: "https://images.unsplash.com/photo-1700934909225-072b51bae308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  // ── Text Courses ──
  {
    id: 5,
    title: "Guide complet de la grammaire Manjak",
    type: "text",
    category: "language",
    duration: "25 min de lecture",
    level: "Intermédiaire",
    views: "1.9K",
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1523396140703-e5bdad4e5dea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    excerpt: "La langue Manjak appartient à la famille des langues atlantiques. Ce guide complet couvre les structures grammaticales fondamentales, les temps verbaux et la construction des phrases...",
    instructor: "Fatou Diatta",
    instructorAvatar: "https://images.unsplash.com/photo-1639531167411-2fbab09f57f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 6,
    title: "Les rites d'initiation dans la culture Manjak",
    type: "text",
    category: "culture",
    duration: "18 min de lecture",
    level: "Intermédiaire",
    views: "2.3K",
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1615027212409-2628cc0cc11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0JTIwYWZyaWNhbiUyMHZpbGxhZ2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczMjUwODg3fDA&ixlib=rb-4.1.0&q=80&w=400",
    excerpt: "Les rites d'initiation occupent une place centrale dans la société Manjak. Ils marquent le passage à l'âge adulte et transmettent les valeurs fondamentales de la communauté...",
    instructor: "Ousmane Faye",
    instructorAvatar: "https://images.unsplash.com/photo-1762885590704-cbe990f95ca5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 7,
    title: "Cartographie des villages Manjak en Guinée-Bissau",
    type: "text",
    category: "history",
    duration: "12 min de lecture",
    level: "Débutant",
    views: "1.5K",
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=400",
    excerpt: "La région de Cacheu en Guinée-Bissau est le cœur historique du peuple Manjak. Découvrez la géographie, les principaux villages et leur importance culturelle...",
    instructor: "Boubacar Manga",
    instructorAvatar: "https://images.unsplash.com/photo-1633121812435-9aa67092b1a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
  {
    id: 8,
    title: "Cuisine Manjak : recettes et traditions culinaires",
    type: "text",
    category: "culture",
    duration: "20 min de lecture",
    level: "Débutant",
    views: "3.4K",
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    excerpt: "La gastronomie Manjak est riche en saveurs et en symbolisme. Chaque plat raconte une histoire et chaque ingrédient a sa signification dans notre culture...",
    instructor: "Mariama Cissé",
    instructorAvatar: "https://images.unsplash.com/photo-1723922970319-6f92727e13cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  },
];

const CATEGORIES = [
  { id: "all", label: "Tout" },
  { id: "language", label: "Langue" },
  { id: "history", label: "Histoire" },
  { id: "culture", label: "Culture" },
];

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  "Débutant":      { bg: "#E8F0EC", text: "#1E4D3A" },
  "Intermédiaire": { bg: "#F9F3E3", text: "#D4A64A" },
  "Avancé":        { bg: "#F7EDE6", text: "#C96A3D" },
};

export function Videos() {
  const navigate = useNavigate();
  const c = useColors();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType]         = useState<"all" | "video" | "text">("all");
  const [search, setSearch]                 = useState("");

  const filtered = COURSES.filter((c) => {
    const catOk  = activeCategory === "all" || c.category === activeCategory;
    const typeOk = activeType === "all" || c.type === activeType;
    const srchOk = !search || c.title.toLowerCase().includes(search.toLowerCase());
    return catOk && typeOk && srchOk;
  });

  const featured = COURSES.find(c => c.id === 2)!;

  return (
    <div className="min-h-screen pb-24" style={{ background: c.bg }}>

      {/* Header */}
      <div
        className="px-5 pt-12 pb-4 sticky top-0 z-10"
        style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}
      >
        <h1 className="mb-1" style={{ color: c.txt, fontWeight: 700, fontSize: "1.4rem" }}>Cours</h1>
        <p className="text-xs mb-4" style={{ color: c.muted, fontWeight: 400 }}>Apprenez la culture et la langue Manjak</p>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: c.muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un cours…"
            className="w-full h-10 rounded-xl pl-10 pr-4 text-sm border-0 outline-none"
            style={{ background: c.chip, color: c.txt }}
          />
        </div>

        {/* Type tabs */}
        <div className="flex gap-2 mb-3">
          {(["all", "video", "text"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                background: activeType === t ? "#1E4D3A" : c.chip,
                color: activeType === t ? "white" : c.muted,
                fontWeight: activeType === t ? 600 : 400,
              }}
            >
              {t === "video" && <Play className="w-3.5 h-3.5" />}
              {t === "text"  && <BookOpen className="w-3.5 h-3.5" />}
              {t === "all" ? "Tous les cours" : t === "video" ? "Vidéo" : "Articles"}
            </button>
          ))}
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors flex-shrink-0"
              style={{
                background: activeCategory === cat.id ? "#C96A3D" : c.chip,
                color: activeCategory === cat.id ? "white" : c.muted,
                fontWeight: activeCategory === cat.id ? 600 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Course */}
      {activeType !== "text" && activeCategory === "all" && !search && (
        <div className="px-5 pt-5 pb-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>⭐ Cours recommandé</p>
          </div>
          <button
            onClick={() => navigate(`/app/videos/${featured.id}`)}
            className="w-full rounded-3xl overflow-hidden relative"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
          >
            <ImageWithFallback
              src={featured.thumbnail}
              alt={featured.title}
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-xs mb-1" style={{ fontWeight: 500, opacity: 0.8 }}>Vidéo · {featured.duration}</p>
              <p className="text-white" style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.3 }}>{featured.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <img src={featured.instructorAvatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                <p className="text-white text-xs" style={{ fontWeight: 400, opacity: 0.85 }}>{featured.instructor}</p>
                <div className="ml-auto flex items-center gap-1 bg-white/20 rounded-full px-2 py-0.5">
                  <Play className="w-3 h-3 text-white" fill="white" />
                  <span className="text-white text-xs" style={{ fontWeight: 500 }}>{featured.views}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Course List */}
      <div className="px-5 pt-4 space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: c.muted }}>
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p style={{ fontWeight: 400 }}>Aucun cours trouvé</p>
          </div>
        )}
        {filtered.map((course) => {
          const lvl = LEVEL_COLORS[course.level];
          return (
            <button
              key={course.id}
              onClick={() => navigate(`/app/videos/${course.id}`)}
              className="w-full flex gap-4 rounded-2xl p-0 overflow-hidden text-left"
              style={{ background: c.surface, border: `1px solid ${c.border}` }}
            >
              {/* Thumbnail */}
              <div className="relative flex-shrink-0 w-28 h-24">
                <ImageWithFallback
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                {course.type === "video" ? (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-4 h-4 ml-0.5" style={{ color: "#1E4D3A" }} fill="#1E4D3A" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4" style={{ color: "#C96A3D" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 py-3 pr-3 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: c.isDark ? `${lvl.text}20` : lvl.bg,
                      color: lvl.text,
                      fontWeight: 600,
                    }}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-sm mb-1 line-clamp-2" style={{ color: c.txt, fontWeight: 600, lineHeight: 1.4 }}>{course.title}</p>
                {course.type === "text" && course.excerpt && (
                  <p className="text-xs mb-2 line-clamp-2" style={{ color: c.muted, fontWeight: 400, lineHeight: 1.5 }}>{course.excerpt}</p>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" style={{ color: c.muted }} />
                    <span className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" style={{ color: c.muted }} />
                    <span className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>{course.views}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-3 h-3 fill-[#D4A64A] text-[#D4A64A]" />
                    <span className="text-xs" style={{ color: "#D4A64A", fontWeight: 600 }}>{course.rating}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}