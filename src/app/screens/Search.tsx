import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Search as SearchIcon, MessageCircle, Newspaper, Play, Users } from "lucide-react";

export function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const recentSearches = ["Festival culturel", "Association Paris", "Langue manjak"];

  const searchResults = query.length > 0 ? {
    discussions: [
      { id: 1, name: "Culture & Histoire", members: 156 },
      { id: 2, name: "Discussion générale", members: 234 },
    ],
    news: [
      { id: 1, title: "Nouvelle association créée à Paris" },
      { id: 2, title: "Cours de langue manjak en ligne" },
    ],
    videos: [
      { id: 1, title: "Introduction à la langue manjak", duration: "12:30" },
      { id: 5, title: "Apprendre les salutations en manjak", duration: "8:15" },
    ],
    associations: [
      { id: 1, name: "Association Culturelle Manjak Paris", zone: "Paris, France" },
      { id: 2, name: "Jeunesse Manjak de Dakar", zone: "Dakar, Sénégal" },
    ],
  } : null;

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
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full h-11 bg-secondary rounded-2xl pl-12 pr-4 text-foreground placeholder:text-muted-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {!query ? (
          /* Recent Searches */
          <div>
            <h3 className="font-bold text-foreground mb-4">Recherches récentes</h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-border hover:bg-muted/50"
                >
                  <SearchIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="flex-1 text-left text-foreground">{search}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="space-y-8">
            {/* Discussions */}
            {searchResults?.discussions && searchResults.discussions.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Discussions
                </h3>
                <div className="space-y-2">
                  {searchResults.discussions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/app/discussions/${item.id}`)}
                      className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-border"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.members} membres</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* News */}
            {searchResults?.news && searchResults.news.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Newspaper className="w-5 h-5" />
                  Actualités
                </h3>
                <div className="space-y-2">
                  {searchResults.news.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/app/news/${item.id}`)}
                      className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-border"
                    >
                      <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                        <Newspaper className="w-5 h-5 text-accent" />
                      </div>
                      <p className="flex-1 text-left font-medium text-foreground">{item.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {searchResults?.videos && searchResults.videos.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Vidéos
                </h3>
                <div className="space-y-2">
                  {searchResults.videos.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/app/videos/${item.id}`)}
                      className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-border"
                    >
                      <div className="w-10 h-10 bg-[#D4A64A]/10 rounded-xl flex items-center justify-center">
                        <Play className="w-5 h-5" style={{ color: "#D4A64A" }} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Associations */}
            {searchResults?.associations && searchResults.associations.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Associations
                </h3>
                <div className="space-y-2">
                  {searchResults.associations.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/app/associations/${item.id}`)}
                      className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border border-border"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.zone}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}