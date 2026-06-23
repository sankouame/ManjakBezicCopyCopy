import { useNavigate } from "react-router";
import { ArrowLeft, MessageCircle, Calendar, Users, Heart } from "lucide-react";

export function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "message",
      icon: MessageCircle,
      title: "Nouveau message dans Discussion générale",
      message: "Aminata D. : Bonjour à tous ! Comment allez-vous ?",
      time: "Il y a 5 min",
      read: false,
    },
    {
      id: 2,
      type: "event",
      icon: Calendar,
      title: "Festival culturel Manjak 2026",
      message: "L'événement commence dans 4 jours",
      time: "Il y a 2h",
      read: false,
    },
    {
      id: 3,
      type: "association",
      icon: Users,
      title: "Nouvelle association",
      message: "Association Culturelle Manjak Paris vient d'être ajoutée",
      time: "Hier",
      read: true,
    },
    {
      id: 4,
      type: "like",
      icon: Heart,
      title: "Votre commentaire a été aimé",
      message: "Bakary S. et 12 autres personnes aiment votre commentaire",
      time: "Hier",
      read: true,
    },
    {
      id: 5,
      type: "message",
      icon: MessageCircle,
      title: "Nouveau message dans Jeunesse",
      message: "Fatou M. : Quand est le prochain événement ?",
      time: "Il y a 2 jours",
      read: true,
    },
    {
      id: 6,
      type: "event",
      icon: Calendar,
      title: "Rencontre inter-villages",
      message: "Nouvel événement ajouté pour le 22 Mars",
      time: "Il y a 3 jours",
      read: true,
    },
  ];

  const iconColors: Record<string, string> = {
    message: "bg-primary/10 text-primary",
    event: "bg-accent/10 text-accent",
    association: "bg-primary/10 text-primary",
    like: "bg-red-100 text-red-500",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD" }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        </div>
      </div>

      {/* Notifications List */}
      <div>
        {notifications.map((notif) => {
          const Icon = notif.icon;
          return (
            <button
              key={notif.id}
              className={`w-full px-6 py-4 border-b border-border flex items-start gap-4 ${
                !notif.read ? "bg-primary/5" : "bg-white"
              }`}
            >
              <div className={`w-12 h-12 ${iconColors[notif.type]} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`font-semibold text-foreground ${!notif.read ? "font-bold" : ""}`}>
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2 mt-1.5" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{notif.message}</p>
                <p className="text-xs text-muted-foreground">{notif.time}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Empty state (hidden when there are notifications) */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-2">Aucune notification</h3>
          <p className="text-sm text-muted-foreground text-center">
            Vos notifications apparaîtront ici
          </p>
        </div>
      )}
    </div>
  );
}