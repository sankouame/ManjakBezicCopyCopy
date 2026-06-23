import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft } from "lucide-react";
import logo from "figma:asset/81d725438a4c9180c0f39c320c8caa2d5489af73.png";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to app
    navigate("/app");
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#FEEECD" }}>
      {/* Header */}
      <div className="px-4 py-6 flex items-center" style={{ background: "#FEEECD" }}>
        <button
          onClick={() => navigate("/onboarding-3")}
          className="p-2 -ml-2 text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4" style={{ background: "#FEEECD" }}>
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src={logo} 
            alt="Bëzic Manjakù" 
            className="w-24 h-24 object-contain"
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bon retour !
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous pour rejoindre la communauté
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-2xl border-0"
              style={{ background: "#FFFFFF" }}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-2xl border-0"
              style={{ background: "#FFFFFF" }}
              required
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-primary"
          >
            Mot de passe oublié ?
          </button>

          <Button
            type="submit"
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground"
          >
            Se connecter
          </Button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-muted-foreground">Pas encore de compte ? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-primary font-medium"
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}