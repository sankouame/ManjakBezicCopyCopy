import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Filter, Users, Check, Plus } from "lucide-react";
import { useColors } from "../hooks/useColors";

export interface Association {
  id: number;
  name: string;
  village: string;
  zone: string;
  mission: string;
  members: number;
  type: string;
  joined: boolean;
  avatar: string;
}

const INITIAL_ASSOCIATIONS: Association[] = [
  {
    id: 1, name: "Association Culturelle Manjak Paris", village: "Djibonker", zone: "Paris, France",
    mission: "Promotion de la culture et entraide communautaire", members: 45, type: "Culturelle", joined: false,
    avatar: "🎭",
  },
  {
    id: 2, name: "Jeunesse Manjak de Dakar", village: "Suzana", zone: "Dakar, Sénégal",
    mission: "Rassembler et accompagner les jeunes Manjak", members: 89, type: "Jeunesse", joined: true,
    avatar: "🌱",
  },
  {
    id: 3, name: "Association Manjak Ziguinchor", village: "Kaour", zone: "Ziguinchor, Sénégal",
    mission: "Développement local et préservation des traditions", members: 67, type: "Développement", joined: false,
    avatar: "🏗️",
  },
  {
    id: 4, name: "Femmes Manjak Unies", village: "Baghère", zone: "Bissau, Guinée-Bissau",
    mission: "Autonomisation et solidarité des femmes", members: 52, type: "Femmes", joined: false,
    avatar: "💪",
  },
  {
    id: 5, name: "Manjak de Lisbonne", village: "Djibonker", zone: "Lisbonne, Portugal",
    mission: "Intégration et maintien des liens culturels", members: 38, type: "Diaspora", joined: false,
    avatar: "🌍",
  },
  {
    id: 6, name: "Association Éducation Manjak", village: "Suzana", zone: "Dakar, Sénégal",
    mission: "Soutien scolaire et formation en langue manjak", members: 34, type: "Éducation", joined: false,
    avatar: "📚",
  },
];

const FILTERS = ["Toutes", "Culturelle", "Jeunesse", "Diaspora", "Éducation", "Femmes", "Développement"];

export function Associations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery]     = useState("");
  const [activeFilter, setActiveFilter]   = useState("Toutes");
  const [associations, setAssociations]   = useState(INITIAL_ASSOCIATIONS);

  const handleJoin = (id: number) => {
    setAssociations(prev => prev.map(a =>
      a.id === id
        ? { ...a, joined: !a.joined, members: a.joined ? a.members - 1 : a.members + 1 }
        : a
    ));
  };

  const filtered = associations.filter(a => {
    const srch = !searchQuery ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const typeOk = activeFilter === "Toutes" || a.type === activeFilter;
    return srch && typeOk;
  });

  const joinedCount = associations.filter(a => a.joined).length;

  const c = useColors();

  return (
    <div className="min-h-screen pb-24" style={{ background: c.bg }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4 sticky top-0 z-10"
        style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}>
        <div className="flex items-center justify-between mb-1">
          <h1 style={{ color: c.txt, fontWeight: 700, fontSize: "1.4rem" }}>Associations</h1>
          {joinedCount > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full text-white" style={{ background: "#1E4D3A", fontWeight: 600 }}>
              {joinedCount} rejointes
            </span>
          )}
        </div>
        <p className="text-xs mb-4" style={{ color: c.muted, fontWeight: 400 }}>Rejoignez des associations de votre communauté</p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: c.muted }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom, ville..."
            className="w-full h-10 rounded-xl pl-10 pr-4 text-sm border-0 outline-none"
            style={{ background: c.chip, color: c.txt }}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors flex-shrink-0"
              style={{
                background: activeFilter === f ? "#1E4D3A" : c.chip,
                color: activeFilter === f ? "white" : c.muted,
                fontWeight: activeFilter === f ? 600 : 400,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Joined associations banner */}
      {joinedCount > 0 && (
        <div className="px-5 pt-4">
          <div className="rounded-2xl p-4" style={{ background: c.creamBg, border: `1px solid ${c.border}` }}>
            <p className="text-sm" style={{ color: c.isDark ? "#D4A64A" : "#6B4C1E", fontWeight: 600 }}>
              🌿 Vous faites partie de {joinedCount} association{joinedCount > 1 ? "s" : ""}
            </p>
            <p className="text-xs mt-0.5" style={{ color: c.muted, fontWeight: 400 }}>
              Cliquez sur une association pour interagir avec ses membres
            </p>
          </div>
        </div>
      )}

      {/* List */}
      <div className="px-5 pt-4 space-y-3">
        {filtered.map((assoc) => (
          <div
            key={assoc.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: c.surface,
              border: `${assoc.joined ? "2px" : "1px"} solid ${assoc.joined ? "#1E4D3A" : c.border}`,
            }}
          >
            <button
              onClick={() => navigate(`/app/associations/${assoc.id}`)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: assoc.joined ? c.greenBg : c.chip }}
                >
                  {assoc.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm" style={{ color: c.txt, fontWeight: 700, lineHeight: 1.3 }}>{assoc.name}</h3>
                    {assoc.joined && (
                      <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: "#1E4D3A", fontWeight: 600 }}>
                        ✓ Membre
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: c.muted }} />
                    <span className="text-xs truncate" style={{ color: c.muted, fontWeight: 400 }}>{assoc.zone}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: c.muted, fontWeight: 400, lineHeight: 1.5 }}>{assoc.mission}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" style={{ color: c.muted }} />
                  <span className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>{assoc.members} membres</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.chip, color: c.muted, fontWeight: 400 }}>
                  {assoc.type}
                </span>
              </div>
            </button>

            {/* Join button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => handleJoin(assoc.id)}
                className="w-full h-9 rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                style={{
                  background: assoc.joined ? c.greenBg : "#1E4D3A",
                  color: assoc.joined ? "#1E4D3A" : "white",
                  fontWeight: 600,
                  border: assoc.joined ? "1.5px solid #1E4D3A" : "none",
                }}
              >
                {assoc.joined
                  ? <><Check className="w-4 h-4" /> Membre</>
                  : <><Plus className="w-4 h-4" /> Rejoindre</>
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}