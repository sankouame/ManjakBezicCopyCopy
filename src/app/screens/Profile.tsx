import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Edit, Bookmark, MessageCircle, Settings } from "lucide-react";
import { useColors } from "../hooks/useColors";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

export function Profile() {
  const navigate = useNavigate();
  const c = useColors();

  const interests = ["Culture", "Langue manjak", "Histoire", "Musique"];
  
  const savedContent = [
    { id: 1, type: "news", title: "Nouvelle association créée à Paris" },
    { id: 2, type: "video", title: "Introduction à la langue manjak" },
    { id: 3, type: "event", title: "Festival culturel Manjak 2026" },
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: c.bg }}>
      {/* Header */}
      <div
        className="px-4 pt-12 pb-4 sticky top-0 z-10 flex items-center justify-between"
        style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}
      >
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" style={{ color: c.txt }} />
        </button>
        <h1 style={{ color: c.txt, fontWeight: 700, fontSize: "1.1rem" }}>Profil</h1>
        <button onClick={() => navigate("/app/settings")} className="p-2">
          <Settings className="w-5 h-5" style={{ color: c.txt }} />
        </button>
      </div>

      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white mb-4"
            style={{ background: "linear-gradient(135deg,#1E4D3A,#C96A3D)", fontSize: "2rem", fontWeight: 700 }}>
            AM
          </div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: c.txt }} className="mb-1">Aminata Mané</h2>
          <div className="flex items-center gap-2 mb-4" style={{ color: c.muted }}>
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Djibonker</span>
          </div>
          <button
            onClick={() => {}}
            className="h-10 px-5 rounded-2xl flex items-center gap-2 text-sm"
            style={{ background: c.greenBg, color: "#1E4D3A", border: "1.5px solid #1E4D3A", fontWeight: 600 }}
          >
            <Edit className="w-4 h-4" />
            Modifier le profil
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[{ val: "12", label: "Messages" }, { val: "3", label: "Événements" }, { val: "8", label: "Sauvegardés" }].map(s => (
            <div key={s.label} className="rounded-2xl p-4 text-center" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: c.txt }}>{s.val}</p>
              <p className="text-xs" style={{ color: c.muted }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <h3 className="mb-3" style={{ color: c.txt, fontWeight: 700 }}>À propos</h3>
          <p className="text-sm leading-relaxed" style={{ color: c.txtSub, fontWeight: 400 }}>
            Passionnée par la culture manjak et l'histoire de notre peuple. J'aime participer aux événements communautaires et apprendre notre belle langue.
          </p>
        </div>

        {/* Interests */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <h3 className="mb-3" style={{ color: c.txt, fontWeight: 700 }}>Centres d'intérêt</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="text-sm px-4 py-2 rounded-full"
                style={{ background: c.greenBg, color: "#1E4D3A", fontWeight: 500 }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Saved Content */}
        <div className="rounded-2xl p-5" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Bookmark className="w-5 h-5" style={{ color: c.txt }} />
            <h3 style={{ color: c.txt, fontWeight: 700 }}>Contenus sauvegardés</h3>
          </div>
          <div className="space-y-3">
            {savedContent.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 p-3 rounded-xl"
                style={{ background: c.surface2 }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.greenBg }}>
                  <Bookmark className="w-5 h-5" style={{ color: "#1E4D3A" }} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm" style={{ color: c.txt, fontWeight: 500 }}>{item.title}</p>
                  <p className="text-xs capitalize" style={{ color: c.muted, fontWeight: 400 }}>{item.type}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}