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
    <div
      className="flex flex-col items-center justify-center h-screen px-6"
      style={{ background: "linear-gradient(135deg, #1E4D3A 0%, #2a6b4f 50%, #C96A3D 100%)" }}
    >
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
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))" }}
          />
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: "#FEEECD", fontWeight: 800, fontSize: "1.8rem", letterSpacing: "-0.5px" }}
        >
          Bëzic Manjakù
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ color: "rgba(254,238,205,0.8)", fontSize: "1rem", fontWeight: 400, marginTop: "8px" }}
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
          {[0, 200, 400].map((delay) => (
            <div
              key={delay}
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "rgba(254,238,205,0.7)", animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
