import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MapPin, MessageCircle, Grid, Bookmark, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  // Mock user data based on ID
  const users: Record<string, any> = {
    "1": {
      id: 1,
      name: "Mamadou Sané",
      avatar: "MS",
      village: "Djibonker",
      bio: "Passionné par la culture manjak et l'histoire de notre peuple. Organisateur d'événements culturels.",
      joinedDate: "Janvier 2024",
      stats: {
        posts: 24,
        following: 156,
        followers: 234,
      },
      interests: ["Culture", "Histoire", "Événements", "Langue manjak"],
    },
    "2": {
      id: 2,
      name: "Fatou Diatta",
      avatar: "FD",
      village: "Suzana",
      bio: "Enseignante de langue manjak. J'aime partager notre culture avec la jeunesse.",
      joinedDate: "Février 2024",
      stats: {
        posts: 18,
        following: 89,
        followers: 145,
      },
      interests: ["Langue manjak", "Éducation", "Jeunesse"],
    },
    "3": {
      id: 3,
      name: "Boubacar Manga",
      avatar: "BM",
      village: "Essil",
      bio: "Vidéaste passionné. Je documente notre culture et nos traditions pour les générations futures.",
      joinedDate: "Mars 2024",
      stats: {
        posts: 32,
        following: 198,
        followers: 456,
      },
      interests: ["Vidéographie", "Culture", "Traditions", "Histoire"],
    },
  };

  const user = users[id || "1"] || users["1"];
  const isOwnProfile = false; // Pour cet exemple

  const userPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 32,
      comments: 8,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 67,
      comments: 15,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 28,
      comments: 6,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 52,
      comments: 18,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 41,
      comments: 9,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD" }}>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white px-6 py-8 mb-2">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{user.village}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs mt-1">
                <Calendar className="w-3 h-3" />
                <span>Membre depuis {user.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.stats.posts}</p>
            <p className="text-xs text-muted-foreground">Publications</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.stats.followers}</p>
            <p className="text-xs text-muted-foreground">Abonnés</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">{user.stats.following}</p>
            <p className="text-xs text-muted-foreground">Abonnements</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-foreground leading-relaxed mb-6">{user.bio}</p>

        {/* Interests */}
        <div className="flex flex-wrap gap-2 mb-6">
          {user.interests.map((interest: string, index: number) => (
            <span
              key={index}
              className="bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        {!isOwnProfile && (
          <div className="flex gap-3">
            <Button
              onClick={() => navigate(`/app/messages/${user.id}`)}
              className="flex-1 h-11 rounded-2xl bg-primary text-primary-foreground"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Envoyer un message
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-2xl"
            >
              Suivre
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border mb-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === "posts"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="font-medium">Publications</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 py-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === "saved"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="font-medium">Sauvegardés</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-white">
        <div className="grid grid-cols-3 gap-1">
          {userPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => navigate(`/app/posts/${post.id}`)}
              className="relative aspect-square bg-muted"
            >
              <ImageWithFallback
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}