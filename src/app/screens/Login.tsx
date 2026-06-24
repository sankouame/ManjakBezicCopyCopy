import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#FEEECD" }}>
      {/* Header */}
      <div className="px-4 pt-10 pb-3 flex items-center" style={{ background: "#FEEECD" }}>
        <button
          onClick={() => navigate("/onboarding-3")}
          className="p-2 -ml-2"
          style={{ color: "#1A1A1A" }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-2 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Bëzic Manjakù" className="w-24 h-24 object-contain" />
        </div>

        <div className="mb-8">
          <h1 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1A1A1A" }}>
            Bon retour !
          </h1>
          <p style={{ color: "#8A7060", fontSize: "1rem", fontWeight: 400 }}>
            Connectez-vous pour rejoindre la communauté
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-2xl px-4 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A] transition-colors"
              style={{ background: "#FFFFFF", color: "#1A1A1A" }}
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#1A1A1A", fontWeight: 500 }}>
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 rounded-2xl px-4 pr-12 text-sm outline-none border-2 border-transparent focus:border-[#1E4D3A] transition-colors"
                style={{ background: "#FFFFFF", color: "#1A1A1A" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: "#8A7060" }}
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm"
              style={{ color: "#1E4D3A", fontWeight: 500 }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl text-sm font-semibold transition-all shadow-sm"
            style={{ background: "#1E4D3A", color: "#FFFFFF" }}
          >
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center pb-6">
          <span className="text-sm" style={{ color: "#8A7060", fontWeight: 400 }}>Pas encore de compte ? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-sm"
            style={{ color: "#1E4D3A", fontWeight: 600 }}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
