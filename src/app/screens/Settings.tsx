import { useNavigate } from "react-router";
import {
  ArrowLeft, Bell, Globe, Lock, HelpCircle, Info,
  LogOut, ChevronRight, Sun, Moon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

export function Settings() {
  const navigate        = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  /* ── Tokens dark / light ─────────────────────────────────── */
  const bg      = isDark ? "#111111"                : "#FEEECD";
  const surface = isDark ? "#1C1C1E"                : "#FFFFFF";
  const border  = isDark ? "rgba(255,255,255,0.07)" : "rgba(30,77,58,0.15)";
  const txt     = isDark ? "#F2F2F2"                : "#1A1A1A";
  const muted   = isDark ? "#8E8E93"                : "#8A7060";
  const chip    = isDark ? "#2C2C2E"                : "#F0DDB8";

  const settingsSections = [
    {
      title: "Préférences",
      items: [
        { id: "notifications", icon: Bell,        label: "Notifications",  value: "Activées",  iconColor: "#1E4D3A" },
        { id: "language",      icon: Globe,       label: "Langue",         value: "Français",  iconColor: "#C96A3D" },
      ],
    },
    {
      title: "Compte",
      items: [
        { id: "privacy", icon: Lock, label: "Confidentialité", value: "", iconColor: "#D4A64A" },
      ],
    },
    {
      title: "Support",
      items: [
        { id: "help",  icon: HelpCircle, label: "Aide et support", value: "",       iconColor: "#1E4D3A" },
        { id: "about", icon: Info,       label: "À propos",         value: "v1.0.0", iconColor: "#C96A3D" },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: bg }}>

      {/* Header */}
      <div
        className="px-4 pt-12 pb-4 sticky top-0 z-10"
        style={{ background: bg, borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/app/profile")} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" style={{ color: txt }} />
          </button>
          <h1 style={{ color: txt, fontWeight: 700, fontSize: "1.2rem" }}>Paramètres</h1>
          <div className="flex-1" />
          <img src={logo} alt="Bëzic" className="w-7 h-7 object-contain opacity-70" />
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">

        {/* ── Apparence ─────────────────────────────────────── */}
        <div>
          <p className="text-xs px-1 mb-2" style={{ color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Apparence
          </p>
          <div className="rounded-2xl overflow-hidden" style={{ background: surface, border: `1px solid ${border}` }}>
            <div className="px-4 py-4 flex items-center gap-4">

              {/* Icône thème */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: chip }}>
                {isDark
                  ? <Moon className="w-5 h-5" style={{ color: "#D4A64A" }} />
                  : <Sun  className="w-5 h-5" style={{ color: "#D4A64A" }} />
                }
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className="text-sm" style={{ color: txt, fontWeight: 600 }}>Mode d'affichage</p>
                <p className="text-xs mt-0.5" style={{ color: muted, fontWeight: 400 }}>
                  {isDark ? "Mode sombre" : "Mode clair"}
                </p>
              </div>

              {/* Switch animé */}
              <button
                onClick={toggleTheme}
                aria-label="Basculer thème"
                className="relative flex-shrink-0"
                style={{
                  width: "52px",
                  height: "30px",
                  borderRadius: "999px",
                  background: isDark ? "#1E4D3A" : "#E5E7EB",
                  transition: "background 0.25s",
                  padding: "2px",
                }}
              >
                <div
                  className="absolute top-[3px] flex items-center justify-center rounded-full shadow-md"
                  style={{
                    width: "24px",
                    height: "24px",
                    background: isDark ? "#F2F2F2" : "#ffffff",
                    left: isDark ? "25px" : "3px",
                    transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {isDark
                    ? <Moon className="w-3 h-3" style={{ color: "#1E4D3A" }} />
                    : <Sun  className="w-3 h-3" style={{ color: "#D4A64A" }} />
                  }
                </div>
              </button>
            </div>

            {/* Pastilles palette */}
            <div
              className="mx-4 mb-4 px-4 py-3 rounded-xl flex items-center gap-3"
              style={{ background: chip }}
            >
              <div className="flex gap-2">
                {[
                  { c: "#1E4D3A", label: "Vert" },
                  { c: "#C96A3D", label: "Terre cuite" },
                  { c: "#D4A64A", label: "Or" },
                  { c: "#FEEECD", label: "Sable" },
                ].map(({ c, label }) => (
                  <div
                    key={c}
                    title={label}
                    className="w-5 h-5 rounded-full"
                    style={{
                      background: c,
                      border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.08)",
                    }}
                  />
                ))}
              </div>
              <p className="text-xs" style={{ color: muted, fontWeight: 400 }}>Palette Bëzic Manjakù</p>
            </div>
          </div>
        </div>

        {/* ── Sections ──────────────────────────────────────── */}
        {settingsSections.map((section) => (
          <div key={section.title}>
            <p className="text-xs px-1 mb-2" style={{ color: muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {section.title}
            </p>
            <div className="rounded-2xl overflow-hidden" style={{ background: surface, border: `1px solid ${border}` }}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="w-full px-4 py-3.5 flex items-center gap-3 transition-colors"
                    style={{ borderBottom: index < section.items.length - 1 ? `1px solid ${border}` : "none" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: chip }}
                    >
                      <Icon className="w-4 h-4" style={{ color: item.iconColor }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm" style={{ color: txt, fontWeight: 500 }}>{item.label}</p>
                      {item.value && (
                        <p className="text-xs mt-0.5" style={{ color: muted, fontWeight: 400 }}>{item.value}</p>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: muted }} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Déconnexion */}
        <button
          onClick={() => navigate("/login")}
          className="w-full rounded-2xl px-4 py-3.5 flex items-center gap-3 transition-colors"
          style={{ background: surface, border: `1px solid ${border}` }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: isDark ? "rgba(255,69,58,0.15)" : "#FFEEED" }}
          >
            <LogOut className="w-4 h-4" style={{ color: "#FF453A" }} />
          </div>
          <p className="flex-1 text-left text-sm" style={{ color: "#FF453A", fontWeight: 600 }}>Déconnexion</p>
        </button>

        {/* Footer */}
        <div className="text-center pt-2 pb-4">
          <img src={logo} alt="Bëzic" className="w-10 h-10 object-contain mx-auto mb-2 opacity-50" />
          <p className="text-xs" style={{ color: muted, fontWeight: 600 }}>Bëzic Manjakù</p>
          <p className="text-xs mt-0.5" style={{ color: muted, fontWeight: 400 }}>Notre communauté, notre fierté</p>
          <p className="text-xs mt-2" style={{ color: muted, fontWeight: 400, opacity: 0.5 }}>© 2026 Tous droits réservés</p>
        </div>
      </div>
    </div>
  );
}