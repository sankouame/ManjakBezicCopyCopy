import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Post {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    village: string;
  };
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

export function Feed() {
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        id: 1,
        name: "Mamadou Sané",
        avatar: "MS",
        village: "Djibonker",
      },
      content: "Magnifique festival culturel ce weekend à Ziguinchor ! Fier de notre culture manjak 🎉🇸🇳",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
      },
      likes: 45,
      comments: 12,
      shares: 3,
      timestamp: "Il y a 2h",
      isLiked: false,
      isSaved: false,
    },
    {
      id: 2,
      author: {
        id: 2,
        name: "Fatou Diatta",
        avatar: "FD",
        village: "Suzana",
      },
      content: "Cours de langue manjak tous les samedis ! Rejoignez-nous pour apprendre ensemble 📚✨",
      likes: 32,
      comments: 8,
      shares: 5,
      timestamp: "Il y a 5h",
      isLiked: true,
      isSaved: false,
    },
    {
      id: 3,
      author: {
        id: 3,
        name: "Boubacar Manga",
        avatar: "BM",
        village: "Essil",
      },
      content: "Nouvelle vidéo sur l'histoire de notre peuple disponible maintenant ! Lien dans les commentaires 🎥",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIweW91dGglMjBsZWFybmluZyUyMGN1bHR1cmV8ZW58MXx8fHwxNzczMjUwODIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      likes: 67,
      comments: 15,
      shares: 10,
      timestamp: "Il y a 8h",
      isLiked: false,
      isSaved: true,
    },
    {
      id: 4,
      author: {
        id: 4,
        name: "Aminata Mané",
        avatar: "AM",
        village: "Djibonker",
      },
      content: "Réunion des associations ce samedi à 15h. Tous les membres sont invités ! 🤝",
      likes: 28,
      comments: 6,
      shares: 2,
      timestamp: "Hier",
      isLiked: false,
      isSaved: false,
    },
    {
      id: 5,
      author: {
        id: 5,
        name: "Ibrahima Badji",
        avatar: "IB",
        village: "Baghère",
      },
      content: "Qui se souvient de cette danse traditionnelle ? Partagez vos souvenirs ! 💃🏾",
      media: {
        type: "image",
        url: "https://images.unsplash.com/photo-1772268337010-03e52e5b9a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nJTIwcGVvcGxlJTIwaGFwcHl8ZW58MXx8fHwxNzczMjUwODg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      likes: 52,
      comments: 18,
      shares: 4,
      timestamp: "Hier",
      isLiked: true,
      isSaved: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="border-b px-6 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD", borderColor: "rgba(30,77,58,0.15)" }}>
        <h1 className="text-2xl font-bold text-foreground">Fil d'actualité</h1>
      </div>

      {/* Create Post Button */}
      <div className="px-6 py-4 bg-white border-b border-border">
        <button
          onClick={() => navigate("/app/create-post")}
          className="w-full h-12 bg-secondary rounded-2xl px-4 flex items-center gap-3 text-muted-foreground"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
            AM
          </div>
          <span>Partagez quelque chose avec la communauté...</span>
        </button>
      </div>

      {/* Posts Feed */}
      <div className="divide-y divide-border">
        {posts.map((post) => (
          <div key={post.id} className="bg-white">
            {/* Post Header */}
            <div className="px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => navigate(`/app/profile/${post.author.id}`)}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.avatar}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                  <p className="text-xs text-muted-foreground">{post.author.village} • {post.timestamp}</p>
                </div>
              </button>
              <button className="p-2">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-6 pb-3">
              <p className="text-foreground leading-relaxed">{post.content}</p>
            </div>

            {/* Post Media */}
            {post.media && (
              <div className="w-full">
                <ImageWithFallback
                  src={post.media.url}
                  alt={post.content}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}

            {/* Post Stats */}
            <div className="px-6 py-3 flex items-center justify-between text-sm text-muted-foreground">
              <span>{post.likes} j'aime</span>
              <div className="flex gap-3">
                <span>{post.comments} commentaires</span>
                <span>{post.shares} partages</span>
              </div>
            </div>

            {/* Post Actions */}
            <div className="px-6 py-3 border-t border-border flex items-center justify-around">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  post.isLiked 
                    ? "text-red-500" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? "fill-red-500" : ""}`} />
                <span className="text-sm font-medium">J'aime</span>
              </button>
              
              <button
                onClick={() => navigate(`/app/posts/${post.id}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Commenter</span>
              </button>
              
              <button
                onClick={() => handleSave(post.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  post.isSaved 
                    ? "text-primary" 
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Bookmark className={`w-5 h-5 ${post.isSaved ? "fill-primary" : ""}`} />
                <span className="text-sm font-medium">Sauvegarder</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}