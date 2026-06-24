import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Calendar } from "lucide-react";

export function Onboarding3() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen" style={{ background: "#FEEECD" }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div
            className="w-32 h-32 mx-auto mb-8 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1E4D3A, #C96A3D, #1E4D3A)",
              boxShadow: "0 8px 32px rgba(30,77,58,0.3)",
            }}
          >
            <Calendar className="w-16 h-16" style={{ color: "#FFFFFF" }} />
          </div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl text-center mb-4"
            style={{ fontWeight: 700, color: "#1A1A1A" }}
          >
            Découvrez et participez
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-lg leading-relaxed"
            style={{ color: "#8A7060" }}
          >
            Restez informé des événements communautaires et trouvez les associations de votre village.
          </motion.p>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="flex gap-2 justify-center mb-6">
          <div className="w-8 h-1 rounded-full" style={{ background: "#EDD9A4" }} />
          <div className="w-8 h-1 rounded-full" style={{ background: "#EDD9A4" }} />
          <div className="w-8 h-1 rounded-full" style={{ background: "#1E4D3A" }} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/onboarding-2")}
            className="flex-1 h-12 rounded-2xl flex items-center justify-center text-sm font-medium transition-colors"
            style={{ border: "1.5px solid rgba(30,77,58,0.3)", background: "transparent", color: "#1E4D3A" }}
          >
            Retour
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex-1 h-12 rounded-2xl flex items-center justify-center text-sm font-medium transition-colors"
            style={{ background: "#1E4D3A", color: "#FFFFFF" }}
          >
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
}
