import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Mock post data
  const post = {
    id: 1,
    author: {
      id: 1,
      name: "Mamadou Sané",
      avatar: "MS",
      village: "Djibonker",
    },
    content: "Magnifique festival culturel ce weekend à Ziguinchor ! Fier de notre culture manjak 🎉🇸🇳",
    media: {
      type: "image" as const,
      url: "https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    likes: 45,
    comments: 12,
    shares: 3,
    timestamp: "Il y a 2h",
  };

  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        id: 2,
        name: "Fatou Diatta",
        avatar: "FD",
        village: "Suzana",
      },
      content: "C'était vraiment magnifique ! J'aurais aimé être là 😍",
      timestamp: "Il y a 1h",
      likes: 8,
      isLiked: false,
    },
    {
      id: 2,
      author: {
        id: 3,
        name: "Boubacar Manga",
        avatar: "BM",
        village: "Essil",
      },
      content: "Merci pour le partage ! Notre culture est si riche 🙏🏾",
      timestamp: "Il y a 1h",
      likes: 5,
      isLiked: true,
    },
    {
      id: 3,
      author: {
        id: 4,
        name: "Aminata Mané",
        avatar: "AM",
        village: "Djibonker",
      },
      content: "J'y étais aussi ! Quelle ambiance incroyable 🎊",
      timestamp: "Il y a 30min",
      likes: 3,
      isLiked: false,
    },
  ]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: {
        id: 100,
        name: "Vous",
        avatar: "AM",
        village: "Djibonker",
      },
      content: commentText,
      timestamp: "À l'instant",
      likes: 0,
      isLiked: false,
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleCommentLike = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        : comment
    ));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD" }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Publication</h1>
        </div>
      </div>

      {/* Post */}
      <div className="bg-white mb-2">
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
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked 
                ? "text-red-500" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500" : ""}`} />
            <span className="text-sm font-medium">J'aime</span>
          </button>
          
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Commenter</span>
          </button>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isSaved 
                ? "text-primary" 
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-primary" : ""}`} />
            <span className="text-sm font-medium">Sauvegarder</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">Commentaires ({comments.length})</h2>
        </div>

        {/* Comments List */}
        <div className="divide-y divide-border">
          {comments.map((comment) => (
            <div key={comment.id} className="px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/app/profile/${comment.author.id}`)}
                  className="flex-shrink-0"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {comment.author.avatar}
                  </div>
                </button>
                
                <div className="flex-1">
                  <div className="bg-secondary rounded-2xl px-4 py-3">
                    <button
                      onClick={() => navigate(`/app/profile/${comment.author.id}`)}
                      className="font-semibold text-foreground text-sm"
                    >
                      {comment.author.name}
                    </button>
                    <p className="text-foreground mt-1">{comment.content}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 px-2 text-xs text-muted-foreground">
                    <span>{comment.timestamp}</span>
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={`font-medium ${comment.isLiked ? "text-primary" : ""}`}
                    >
                      J'aime {comment.likes > 0 && `(${comment.likes})`}
                    </button>
                    <button
                      onClick={() => navigate(`/app/messages/${comment.author.id}`)}
                      className="font-medium"
                    >
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Input (Fixed at bottom) */}
      <div className="fixed bottom-16 left-0 right-0 max-w-[390px] mx-auto bg-white border-t border-border px-4 py-3">
        <form onSubmit={handleCommentSubmit} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AM
          </div>
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Écrivez un commentaire..."
            className="flex-1 h-10 rounded-full bg-secondary border-0"
          />
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="p-2 text-primary disabled:text-muted-foreground"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}