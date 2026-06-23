import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Send, Smile, Paperclip } from "lucide-react";

export function ConversationDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const channelName = "Discussion générale";
  
  const messages = [
    { id: 1, user: "Aminata D.", message: "Bonjour à tous ! Comment allez-vous ?", time: "09:30", isMe: false },
    { id: 2, user: "Moi", message: "Bonjour ! Très bien merci 😊", time: "09:32", isMe: true },
    { id: 3, user: "Bakary S.", message: "Salut la famille ! Quelqu'un sait quand aura lieu le prochain événement ?", time: "09:45", isMe: false },
    { id: 4, user: "Fatou M.", message: "Je crois que c'est le 15 mars à Dakar", time: "09:50", isMe: false },
    { id: 5, user: "Moi", message: "Oui exactement, c'est le festival culturel", time: "09:52", isMe: true },
    { id: 6, user: "Aminata D.", message: "Super ! J'ai hâte d'y participer 🎉", time: "10:00", isMe: false },
    { id: 7, user: "Bakary S.", message: "Merci pour l'info ! À bientôt", time: "10:05", isMe: false },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Mock send message
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 flex items-center gap-3" style={{ background: "#FEEECD" }}>
        <button
          onClick={() => navigate("/app/discussions")}
          className="p-2 -ml-2"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div className="flex-1">
          <h2 className="font-bold text-foreground">{channelName}</h2>
          <p className="text-sm text-muted-foreground">234 membres</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[75%] ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
              {!msg.isMe && (
                <span className="text-xs text-muted-foreground mb-1 px-2">{msg.user}</span>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${
                  msg.isMe
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-white border border-border rounded-bl-sm"
                }`}
              >
                <p className={msg.isMe ? "text-white" : "text-foreground"}>{msg.message}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1 px-2">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="p-2 text-muted-foreground">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-4 h-11">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Votre message..."
              className="flex-1 bg-transparent border-0 focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button className="text-muted-foreground">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}