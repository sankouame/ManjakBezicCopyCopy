import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Image as ImageIcon, Video, X } from "lucide-react";
import { Button } from "../components/ui/button";

export function CreatePost() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handlePost = () => {
    if (!content.trim() && !selectedMedia) return;
    // Here you would normally upload the post to backend
    navigate("/app/feed");
  };

  const handleMediaSelect = () => {
    // Mock media selection - in real app this would open file picker
    setSelectedMedia("https://images.unsplash.com/photo-1764670085286-55cd79507a72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY3VsdHVyYWwlMjBmZXN0aXZhbCUyMGV2ZW50fGVufDF8fHx8MTc3MzI1MDgyMnww&ixlib=rb-4.1.0&q=80&w=1080");
  };

  return (
    <div className="min-h-screen" style={{ background: "#FEEECD" }}>
      {/* Header */}
      <div className="border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10" style={{ background: "#FEEECD" }}>
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Nouvelle publication</h1>
          <Button
            onClick={handlePost}
            disabled={!content.trim() && !selectedMedia}
            className="h-9 rounded-2xl bg-primary text-primary-foreground px-4"
          >
            Publier
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
            AM
          </div>
          <div>
            <p className="font-semibold text-foreground">Aminata Mané</p>
            <p className="text-xs text-muted-foreground">Djibonker</p>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Que voulez-vous partager avec la communauté ?"
          className="w-full min-h-[200px] text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
          autoFocus
        />

        {/* Selected Media Preview */}
        {selectedMedia && (
          <div className="relative mt-4 rounded-2xl overflow-hidden">
            <img
              src={selectedMedia}
              alt="Selected media"
              className="w-full h-80 object-cover"
            />
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Media Options */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white border-t border-border px-6 py-4">
        <div className="flex gap-4">
          <button
            onClick={handleMediaSelect}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground"
          >
            <ImageIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Photo</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground"
          >
            <Video className="w-5 h-5" />
            <span className="text-sm font-medium">Vidéo</span>
          </button>
        </div>
      </div>
    </div>
  );
}