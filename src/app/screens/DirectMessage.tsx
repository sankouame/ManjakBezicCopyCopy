import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Send, MoreVertical, Phone, Video } from "lucide-react";
import { Input } from "../components/ui/input";

export function DirectMessage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");

  // Mock user data
  const users: Record<string, any> = {
    "1": { id: 1, name: "Mamadou Sané", avatar: "MS", village: "Djibonker" },
    "2": { id: 2, name: "Fatou Diatta", avatar: "FD", village: "Suzana" },
    "3": { id: 3, name: "Boubacar Manga", avatar: "BM", village: "Essil" },
  };

  const recipient = users[id || "1"] || users["1"];

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: parseInt(id || "1"),
      text: "Salut ! Comment vas-tu ?",
      timestamp: "10:30",
      isMine: false,
    },
    {
      id: 2,
      senderId: 100,
      text: "Ça va bien merci ! Et toi ?",
      timestamp: "10:32",
      isMine: true,
    },
    {
      id: 3,
      senderId: parseInt(id || "1"),
      text: "Très bien ! J'ai vu ta publication sur le festival, c'était magnifique !",
      timestamp: "10:33",
      isMine: false,
    },
    {
      id: 4,
      senderId: 100,
      text: "Merci beaucoup ! Tu étais là aussi ?",
      timestamp: "10:35",
      isMine: true,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: 100,
      text: messageText,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={() => navigate(`/app/profile/${recipient.id}`)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                {recipient.avatar}
              </div>
              <div className="text-left">
                <h1 className="text-base font-bold text-foreground">{recipient.name}</h1>
                <p className="text-xs text-muted-foreground">{recipient.village}</p>
              </div>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-primary">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-primary">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] ${
                message.isMine
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-foreground"
              } rounded-2xl px-4 py-3 shadow-sm`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.isMine ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-border px-4 py-3">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1 h-11 rounded-full bg-secondary border-0"
          />
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="w-11 h-11 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}