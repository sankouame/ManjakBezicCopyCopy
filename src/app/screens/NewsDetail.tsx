import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Share2, Bookmark, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";

export function NewsDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-sm border-b border-border px-4 pt-12 pb-4 flex items-center justify-between" style={{ background: "rgba(254,238,205,0.97)" }}>
        <button
          onClick={() => navigate("/app/news")}
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex gap-2">
          <button className="p-2">
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
          <button className="p-2">
            <Bookmark className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Actualité"
        className="w-full h-64 object-cover"
      />

      {/* Content */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">
            Association
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>10 Mars 2026</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-4">
          Nouvelle association créée à Paris
        </h1>

        <div className="prose prose-sm max-w-none">
          <p className="text-foreground leading-relaxed mb-4">
            Une nouvelle association pour les jeunes Manjak vient d'être créée en région parisienne. Cette initiative portée par un groupe de jeunes dynamiques vise à rassembler la communauté et à promouvoir notre culture.
          </p>

          <p className="text-foreground leading-relaxed mb-4">
            L'association organise déjà des événements mensuels incluant des ateliers de langue, des soirées culturelles et des moments d'échange pour maintenir le lien avec nos racines tout en s'intégrant dans la société française.
          </p>

          <p className="text-foreground leading-relaxed mb-4">
            Les membres fondateurs expliquent : "Nous voulons créer un espace où les jeunes de la diaspora peuvent se retrouver, échanger et transmettre notre patrimoine aux générations futures."
          </p>

          <p className="text-foreground leading-relaxed mb-6">
            L'association accueille tous ceux qui souhaitent s'impliquer, qu'ils soient originaires de Paris ou de passage. Les inscriptions sont ouvertes et les premières activités débuteront dès le mois prochain.
          </p>
        </div>

        <div className="bg-secondary rounded-2xl p-4 mb-6">
          <h3 className="font-bold text-foreground mb-2">Contact</h3>
          <p className="text-sm text-muted-foreground">
            Pour plus d'informations, contactez l'association via les réseaux sociaux ou consultez la section Associations.
          </p>
        </div>

        <Button
          onClick={() => navigate("/app/associations")}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground"
        >
          Voir les associations
        </Button>
      </div>
    </div>
  );
}