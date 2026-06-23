import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Newspaper, Play, Users, User, MessageSquare, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const TABS = [
  { id: "home",         label: "Accueil",   icon: Home,          path: "/app" },
  { id: "news",         label: "Actus",     icon: Newspaper,     path: "/app/news" },
  { id: "videos",       label: "Cours",     icon: Play,          path: "/app/videos" },
  { id: "associations", label: "Assoc.",    icon: Users,         path: "/app/associations" },
  { id: "discussions",  label: "Discuss.",  icon: MessageSquare, path: "/app/discussions" },
  { id: "profile",      label: "Profil",    icon: User,          path: "/app/profile" },
];

/* Couleur active par onglet (marque) */
const TAB_ACTIVE_COLOR: Record<string, string> = {
  home:         "#1E4D3A",
  news:         "#C96A3D",
  videos:       "#D4A64A",
  associations: "#1E4D3A",
  discussions:  "#C96A3D",
  profile:      "#1E4D3A",
};

export function MainLayout() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  /* ── Tokens dark/light ─────────────────────────────────── */
  const barBg     = isDark ? "#1C1C1E"                : "#FEEECD";
  const barBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(30,77,58,0.15)";
  const inactiveC = isDark ? "#636366"                : "#1E4D3A";   /* vert en clair */
  const toggleC   = isDark ? "#D4A64A"                : "#1E4D3A";

  const isActive = (path: string) =>
    path === "/app" ? location.pathname === "/app" : location.pathname.startsWith(path);

  return (
    <div className="flex flex-col h-screen" style={{ background: isDark ? "#111111" : "#FEEECD" }}>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "68px" }}>
        <Outlet />
      </div>

      {/* ── Bottom Tab Bar ────────────────────────────────── */}
      <div
        className="fixed bottom-0 z-40"
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "390px",
          background: barBg,
          borderTop: `1px solid ${barBorder}`,
          boxShadow: isDark
            ? "0 -4px 20px rgba(0,0,0,0.6)"
            : "0 -2px 12px rgba(30,77,58,0.10)",
        }}
      >
        <div className="flex items-stretch h-[64px] px-0">

          {TABS.map((tab) => {
            const Icon   = tab.icon;
            const active = isActive(tab.path);
            const color  = active ? TAB_ACTIVE_COLOR[tab.id] : inactiveC;
            const activePillBg = isDark
              ? `${TAB_ACTIVE_COLOR[tab.id]}20`
              : `${TAB_ACTIVE_COLOR[tab.id]}12`;

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center flex-1 gap-[3px] relative transition-colors"
                style={{ color }}
              >
                {/* Indicateur en haut */}
                {active && (
                  <div
                    className="absolute top-0 rounded-b-full"
                    style={{
                      width: "20px",
                      height: "2.5px",
                      background: TAB_ACTIVE_COLOR[tab.id],
                    }}
                  />
                )}

                {/* Fond pill actif */}
                <div
                  className="relative flex items-center justify-center rounded-xl transition-all"
                  style={{
                    width: "38px",
                    height: "28px",
                    background: active ? activePillBg : "transparent",
                  }}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.5 : 1.7} />
                </div>

                <span
                  className="text-[9px] leading-none"
                  style={{ fontWeight: active ? 700 : 400, letterSpacing: "0.01em" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* ── Toggle thème compact ── */}
          <button
            onClick={toggleTheme}
            title={isDark ? "Mode clair" : "Mode sombre"}
            className="flex flex-col items-center justify-center w-[46px] gap-[3px] transition-colors"
            style={{ color: toggleC }}
          >
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: "38px", height: "28px" }}
            >
              {isDark
                ? <Sun  className="w-[17px] h-[17px]" strokeWidth={1.8} />
                : <Moon className="w-[17px] h-[17px]" strokeWidth={1.8} />
              }
            </div>
            <span className="text-[9px] leading-none" style={{ fontWeight: 400 }}>
              {isDark ? "Clair" : "Nuit"}
            </span>
          </button>
        </div>

        {/* Safe area iOS */}
        <div style={{ height: "env(safe-area-inset-bottom, 0px)" }} />
      </div>
    </div>
  );
}