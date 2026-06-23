import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { BookOpen } from "lucide-react";

export function Onboarding2() {
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
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-accent to-[#D4A64A] flex items-center justify-center shadow-lg">
            <BookOpen className="w-16 h-16 text-white" />
          </div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center text-foreground mb-4"
          >
            Apprenez et transmettez
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-muted-foreground text-lg leading-relaxed"
          >
            Découvrez la langue manjak, notre histoire et notre culture à travers des vidéos et contenus éducatifs.
          </motion.p>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="flex gap-2 justify-center mb-6">
          <div className="w-8 h-1 rounded-full" style={{ background: "#EDD9A4" }} />
          <div className="w-8 h-1 rounded-full bg-primary" />
          <div className="w-8 h-1 rounded-full" style={{ background: "#EDD9A4" }} />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-2xl"
            onClick={() => navigate("/onboarding-1")}
          >
            Retour
          </Button>
          <Button
            className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground"
            onClick={() => navigate("/onboarding-3")}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}