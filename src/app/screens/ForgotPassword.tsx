import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft, Check } from "lucide-react";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-3 text-center">
            Email envoyé !
          </h1>
          
          <p className="text-muted-foreground text-center mb-8">
            Consultez votre boîte mail pour réinitialiser votre mot de passe.
          </p>

          <Button
            onClick={() => navigate("/login")}
            className="w-full max-w-sm h-12 rounded-2xl bg-primary text-primary-foreground"
          >
            Retour à la connexion
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 flex items-center">
        <button
          onClick={() => navigate("/login")}
          className="p-2 -ml-2 text-foreground"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Mot de passe oublié
          </h1>
          <p className="text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-2xl bg-secondary border-0"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground"
          >
            Envoyer le lien
          </Button>
        </form>
      </div>
    </div>
  );
}
