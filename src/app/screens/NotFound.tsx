import { useNavigate } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background px-6">
      <div className="text-center">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Page introuvable
        </h1>
        <p className="text-muted-foreground mb-8">
          Désolé, cette page n'existe pas ou a été déplacée.
        </p>
        <Button
          onClick={() => navigate("/app")}
          className="h-12 rounded-2xl bg-primary text-primary-foreground"
        >
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
