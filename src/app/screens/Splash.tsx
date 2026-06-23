import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding-1");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-primary via-[#2a6b4f] to-accent px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center">
          <img 
            src={logo} 
            alt="Bëzic Manjakù" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-white/90 font-medium"
        >
          Notre communauté, notre fierté
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12"
      >
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "200ms" }} />
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "400ms" }} />
        </div>
      </motion.div>
    </div>
  );
}