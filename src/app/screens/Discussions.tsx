import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Users, MessageSquare, Hash, Lock, Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { MOCK_USERS } from "../data/mockUsers";

interface Channel {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  members: number;
  type: "public" | "private";
  emoji: string;
  accentColor: string;
}

const CHANNELS: Channel[] = [
  { id: 1, name: "Discussion générale",  lastMessage: "Bonjour à tous ! Comment ça va ?",         time: "10:30",  unread: 5, members: 234, type: "public",  emoji: "💬", accentColor: "#1E4D3A" },
  { id: 2, name: "Jeunesse Manjak",      lastMessage: "Quand est le prochain événement ?",          time: "09:15",  unread: 2, members: 89,  type: "public",  emoji: "🌱", accentColor: "#C96A3D" },
  { id: 3, name: "Culture & Histoire",   lastMessage: "Nouvelle vidéo sur nos traditions",          time: "Hier",   unread: 0, members: 156, type: "public",  emoji: "🏺", accentColor: "#D4A64A" },
  { id: 4, name: "Associations",         lastMessage: "Réunion samedi prochain à 15h",              time: "Hier",   unread: 1, members: 67,  type: "public",  emoji: "🤝", accentColor: "#1E4D3A" },
  { id: 5, name: "Inter-villages",       lastMessage: "Salutations de Djibonker ! 🌿",              time: "Mar 10", unread: 0, members: 198, type: "public",  emoji: "🗺️", accentColor: "#C96A3D" },
  { id: 6, name: "Entraide diaspora",    lastMessage: "Quelqu'un peut m'aider pour les papiers ?", time: "Mar 09", unread: 0, members: 112, type: "public",  emoji: "💪", accentColor: "#D4A64A" },
  { id: 7, name: "Famille Sané",         lastMessage: "On se retrouve à Noël ?",                   time: "Mar 08", unread: 3, members: 12,  type: "private", emoji: "🏠", accentColor: "#1E4D3A" },
];

const DIRECT_PREVIEWS = [
  "Super, à bientôt ! 👋",
  "Merci pour l'info 🙏",
  "On en parle demain ?",
  "Incroyable cette vidéo !",
];

export function Discussions() {
  const navigate    = useNavigate();
  const { isDark }  = useTheme();
  const [search, setSearch]       = useState("");
  const [activeTab, setActiveTab] = useState<"canaux" | "directs">("canaux");

  /* ── Tokens ──────────────────────────────────────────────── */
  const bg      = isDark ? "#111111"                : "#FEEECD";
  const surface = isDark ? "#1C1C1E"                : "#FEEECD";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(30,77,58,0.15)";
  const txt     = isDark ? "#F2F2F2"                : "#1A1A1A";
  const muted   = isDark ? "#8E8E93"                : "#8A7060";
  const chip    = isDark ? "#2C2C2E"                : "#F0DDB8";
  const tabSel  = isDark ? "#2C2C2E"                : "#EDD9A4";

  const totalUnread = CHANNELS.reduce((s, c) => s + c.unread, 0);

  const filtered = CHANNELS.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-4" style={{ background: bg }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div
        className="px-5 pt-12 pb-3 sticky top-0 z-10"
        style={{ background: surface, borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 style={{ color: txt, fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.2 }}>Discussions</h1>
            <p className="text-xs mt-0.5" style={{ color: muted, fontWeight: 400 }}>
              {totalUnread > 0 ? `${totalUnread} messages non lus` : "Tout est à jour ✓"}
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "#C96A3D" }}
          >
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Recherche */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: muted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="w-full h-9 rounded-xl pl-10 pr-4 text-sm outline-none"
            style={{ background: chip, color: txt, border: "none" }}
          />
        </div>

        {/* Onglets */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: tabSel }}>
          {(["canaux", "directs"] as const).map((t) => {
            const active = activeTab === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="flex-1 py-2 rounded-lg text-sm transition-all"
                style={{
                  background: active ? (isDark ? "#3A3A3C" : "#FEEECD") : "transparent",
                  color: active ? (isDark ? "#F2F2F2" : "#1E4D3A") : muted,
                  fontWeight: active ? 600 : 400,
                  boxShadow: active ? (isDark ? "none" : "0 1px 4px rgba(30,77,58,0.12)") : "none",
                }}
              >
                {t === "canaux" ? "Canaux" : "Messages directs"}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Canaux ─────────────────────────────────────────── */}
      {activeTab === "canaux" && (
        <div className="px-4 pt-3 space-y-2">
          {filtered.map((ch) => (
            <button
              key={ch.id}
              onClick={() => navigate(`/app/discussions/${ch.id}`)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all"
              style={{ background: surface, border: `1px solid ${border}` }}
            >
              {/* Emoji icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: isDark ? "rgba(255,255,255,0.05)" : `${ch.accentColor}10` }}
              >
                {ch.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1">
                    {ch.type === "private"
                      ? <Lock className="w-3 h-3" style={{ color: muted }} />
                      : <Hash className="w-3 h-3" style={{ color: muted }} />
                    }
                    <p className="text-sm" style={{ color: txt, fontWeight: ch.unread > 0 ? 700 : 600 }}>{ch.name}</p>
                  </div>
                  <span className="text-[10px] ml-2 flex-shrink-0" style={{ color: muted }}>{ch.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs truncate" style={{ color: muted, fontWeight: 400, maxWidth: "180px" }}>
                    {ch.lastMessage}
                  </p>
                  {ch.unread > 0 && (
                    <span
                      className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white flex-shrink-0"
                      style={{ background: "#C96A3D", fontWeight: 700 }}
                    >
                      {ch.unread}
                    </span>
                  )}
                </div>
                <p className="text-[10px] mt-0.5 flex items-center gap-1" style={{ color: muted, opacity: 0.65 }}>
                  <Users className="w-2.5 h-2.5 inline" /> {ch.members} membres
                </p>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-10 h-10 mx-auto mb-3" style={{ color: muted, opacity: 0.3 }} />
              <p className="text-sm" style={{ color: muted }}>Aucun canal trouvé</p>
            </div>
          )}
        </div>
      )}

      {/* ── Messages directs ───────────────────────────────── */}
      {activeTab === "directs" && (
        <div className="px-4 pt-3 space-y-2">
          {MOCK_USERS.slice(0, 6).map((user, i) => {
            const online = i % 3 !== 2;
            const hasUnread = i % 4 === 0;
            return (
              <button
                key={user.id}
                onClick={() => navigate(`/app/messages/${user.id}`)}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                {/* Avatar + présence */}
                <div className="relative flex-shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full object-cover" />
                  <div
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full"
                    style={{
                      background: online ? "#30D158" : "#636366",
                      border: `2px solid ${surface}`,
                    }}
                  />
                </div>

                {/* Infos */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm" style={{ color: txt, fontWeight: hasUnread ? 700 : 600 }}>{user.name}</p>
                    <span className="text-[10px]" style={{ color: muted }}>
                      {["10:30", "Hier", "Mar 20", "09:15"][i % 4]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs truncate" style={{ color: muted, fontWeight: hasUnread ? 500 : 400, maxWidth: "190px" }}>
                      {DIRECT_PREVIEWS[i % 4]}
                    </p>
                    {hasUnread && (
                      <span
                        className="ml-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white flex-shrink-0"
                        style={{ background: "#1E4D3A", fontWeight: 700 }}
                      >
                        2
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}