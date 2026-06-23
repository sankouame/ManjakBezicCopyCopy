import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Share2, Calendar, MapPin, Users, Check, X, UserPlus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MOCK_USERS } from "../data/mockUsers";
import { useColors } from "../hooks/useColors";

export function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const c = useColors();
  const [isInterested, setIsInterested] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(250);

  const handleParticipate = () => {
    if (isParticipating) {
      setIsParticipating(false);
      setParticipantsCount(c => c - 1);
    } else {
      setIsParticipating(true);
      setParticipantsCount(c => c + 1);
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2500);
    }
  };

  const participants = MOCK_USERS.slice(0, 5);

  return (
    <div className="min-h-screen pb-8" style={{ background: c.bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm px-4 pt-12 pb-4 flex items-center justify-between"
        style={{ background: c.isDark ? "rgba(17,17,17,0.97)" : "rgba(254,238,205,0.97)", borderBottom: `1px solid ${c.border}` }}
      >
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" style={{ color: c.txt }} />
        </button>
        <button className="p-2">
          <Share2 className="w-6 h-6" style={{ color: c.txt }} />
        </button>
      </div>

      {/* Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Événement"
        className="w-full h-56 object-cover"
      />

      {/* Content */}
      <div className="px-5 py-5">

        {/* Title + Badge */}
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1">
            <span className="text-xs px-2.5 py-1 rounded-full text-white mb-2 inline-block" style={{ background: "#C96A3D", fontWeight: 500 }}>
              🎉 Festival
            </span>
            <h1 className="mt-1" style={{ fontWeight: 700, fontSize: "1.3rem", lineHeight: 1.3, color: c.txt }}>
              Festival culturel Manjak 2026
            </h1>
          </div>
        </div>

        {/* Event Info Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: c.greenBg }}>
            <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: "#1E4D3A" }} />
            <div>
              <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>Date</p>
              <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>15 Mars 2026</p>
              <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>14h00 – 22h00</p>
            </div>
          </div>
          <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: c.terraBg }}>
            <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: "#C96A3D" }} />
            <div>
              <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>Lieu</p>
              <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>Centre Douta Seck</p>
              <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>Dakar, Sénégal</p>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="rounded-2xl p-4 mb-5" style={{ background: c.surface, border: `1px solid ${c.border}` }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm flex items-center gap-1.5" style={{ color: c.txtSub, fontWeight: 600 }}>
              <Users className="w-4 h-4" style={{ color: c.muted }} />
              {participantsCount} participants
            </p>
            {isParticipating && (
              <span className="text-xs px-2.5 py-1 rounded-full text-white" style={{ background: "#1E4D3A", fontWeight: 500 }}>
                ✓ Vous participez
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {participants.map((u, i) => (
              <img
                key={u.id}
                src={u.avatar}
                alt={u.name}
                className="w-8 h-8 rounded-full object-cover"
                style={{ marginLeft: i > 0 ? "-8px" : 0, border: `2px solid ${c.surface}` }}
              />
            ))}
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ marginLeft: "-8px", background: c.chip, border: `2px solid ${c.surface}` }}>
              <span className="text-[10px]" style={{ color: c.muted, fontWeight: 600 }}>+245</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-5">
          <h3 className="mb-2" style={{ color: c.txt, fontWeight: 600, fontSize: "0.95rem" }}>À propos</h3>
          <p className="text-sm leading-relaxed mb-3" style={{ color: c.txtSub, fontWeight: 400 }}>
            Le Festival culturel Manjak 2026 est un événement majeur qui rassemble toute la communauté pour célébrer notre riche patrimoine culturel.
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: c.txtSub, fontWeight: 400 }}>
            Au programme : spectacles de danse traditionnelle, concerts de musique manjak, expositions d'artisanat, dégustation de plats traditionnels, et bien plus encore !
          </p>
          <p className="text-sm leading-relaxed" style={{ color: c.txtSub, fontWeight: 400 }}>
            Un moment unique pour se retrouver, partager et transmettre nos traditions aux jeunes générations.{" "}
            <span style={{ color: "#1E4D3A", fontWeight: 600 }}>L'entrée est gratuite pour tous.</span>
          </p>
        </div>

        {/* Organizer */}
        <div className="rounded-2xl p-4 mb-6 flex items-center gap-3" style={{ background: c.creamBg, border: `1px solid ${c.border}` }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#D4A64A" }}>
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs" style={{ color: c.muted, fontWeight: 400 }}>Organisé par</p>
            <p className="text-sm" style={{ color: c.txt, fontWeight: 600 }}>Association Culturelle Manjak de Dakar</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleParticipate}
            className="w-full rounded-2xl flex items-center justify-center gap-2 transition-all"
            style={{
              height: "52px",
              background: isParticipating ? c.greenBg : "#1E4D3A",
              color: isParticipating ? "#1E4D3A" : "white",
              fontWeight: 700,
              fontSize: "1rem",
              border: isParticipating ? "2px solid #1E4D3A" : "none",
            }}
          >
            {isParticipating ? (
              <><Check className="w-5 h-5" /> Je participe à l'événement</>
            ) : (
              <><UserPlus className="w-5 h-5" /> Participer à l'événement</>
            )}
          </button>

          <button
            onClick={() => setIsInterested(!isInterested)}
            className="w-full rounded-2xl flex items-center justify-center gap-2 transition-all"
            style={{
              height: "48px",
              background: c.surface,
              color: isInterested ? "#C96A3D" : c.muted,
              fontWeight: 500,
              fontSize: "0.9rem",
              border: `2px solid ${isInterested ? "#C96A3D" : c.border}`,
            }}
          >
            {isInterested ? (
              <><Check className="w-4 h-4" /> Intéressé(e)</>
            ) : (
              "Marquer comme intéressé(e)"
            )}
          </button>
        </div>
      </div>

      {/* Confirmation toast */}
      {showConfirm && (
        <div
          className="fixed bottom-28 left-1/2 -translate-x-1/2 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-50"
          style={{ background: "#1E4D3A", color: "white", minWidth: "260px" }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: "0.85rem" }}>Inscription confirmée !</p>
            <p style={{ fontWeight: 400, fontSize: "0.75rem", opacity: 0.8 }}>Vous avez rejoint l'événement</p>
          </div>
        </div>
      )}
    </div>
  );
}