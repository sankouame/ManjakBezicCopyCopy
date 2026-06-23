import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, Users, Filter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useColors } from "../hooks/useColors";

export function News() {
  const navigate = useNavigate();
  const c = useColors();
  const [activeTab, setActiveTab] = useState<"news" | "events">("news");

  const newsItems = [
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

  const events = [
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

  return (
    <div className="min-h-screen" style={{ background: c.bg }}>
      {/* Header */}
      <div
        className="px-6 pt-12 pb-4 sticky top-0 z-10"
        style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 style={{ color: c.txt, fontWeight: 700, fontSize: "1.4rem" }}>Actualités</h1>
          <button className="p-2">
            <Filter className="w-5 h-5" style={{ color: c.muted }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("news")}
            className="flex-1 h-10 rounded-xl transition-colors text-sm"
            style={{
              background: activeTab === "news" ? "#1E4D3A" : c.chip,
              color: activeTab === "news" ? "white" : c.muted,
              fontWeight: activeTab === "news" ? 600 : 400,
            }}
          >
            Actualités
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className="flex-1 h-10 rounded-xl transition-colors text-sm"
            style={{
              background: activeTab === "events" ? "#C96A3D" : c.chip,
              color: activeTab === "events" ? "white" : c.muted,
              fontWeight: activeTab === "events" ? 600 : 400,
            }}
          >
            Événements
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-4 pb-24">
        {activeTab === "news" ? (
          <>
            {newsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(`/app/news/${item.id}`)}
                className="w-full rounded-2xl overflow-hidden text-left"
                style={{ background: c.surface, border: `1px solid ${c.border}` }}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full text-white" style={{ background: "#1E4D3A", fontWeight: 500 }}>
                      {item.category}
                    </span>
                    <span className="text-xs" style={{ color: c.muted }}>{item.date}</span>
                  </div>
                  <h3 className="mb-2" style={{ color: c.txt, fontWeight: 700 }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: c.txtSub, fontWeight: 400 }}>{item.summary}</p>
                </div>
              </button>
            ))}
          </>
        ) : (
          <>
            {events.map((event) => (
              <button
                key={event.id}
                onClick={() => navigate(`/app/events/${event.id}`)}
                className="w-full rounded-2xl overflow-hidden text-left"
                style={{ background: c.surface, border: `1px solid ${c.border}` }}
              >
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="mb-2" style={{ color: c.txt, fontWeight: 700 }}>{event.title}</h3>
                  <p className="text-sm mb-3" style={{ color: c.txtSub, fontWeight: 400 }}>{event.summary}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2" style={{ color: c.muted }}>
                      <Calendar className="w-4 h-4" />
                      <span style={{ fontWeight: 400 }}>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: c.muted }}>
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontWeight: 400 }}>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: c.muted }}>
                      <Users className="w-4 h-4" />
                      <span style={{ fontWeight: 400 }}>{event.participants} participants</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}