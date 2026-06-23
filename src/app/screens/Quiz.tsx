import { useNavigate } from "react-router";
import { Brain, Trophy, Clock, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Quiz() {
  const navigate = useNavigate();

  const quizCategories = [
    {
      id: 1,
      title: "Culture Manjak",
      description: "Testez vos connaissances sur la culture manjak",
      icon: "🎭",
      questionsCount: 10,
      duration: "5 min",
      difficulty: "Facile",
      color: "from-primary to-[#2a6b4f]",
    },
    {
      id: 2,
      title: "Langue Manjak",
      description: "Quiz sur la langue et les expressions manjak",
      icon: "💬",
      questionsCount: 15,
      duration: "8 min",
      difficulty: "Moyen",
      color: "from-accent to-[#d4824f]",
    },
    {
      id: 3,
      title: "Histoire du Peuple",
      description: "Découvrez l'histoire fascinante du peuple manjak",
      icon: "📜",
      questionsCount: 12,
      duration: "7 min",
      difficulty: "Moyen",
      color: "from-[#D4A64A] to-[#e8b85a]",
    },
    {
      id: 4,
      title: "Traditions & Coutumes",
      description: "Les traditions et coutumes ancestrales",
      icon: "🎉",
      questionsCount: 10,
      duration: "5 min",
      difficulty: "Facile",
      color: "from-primary to-accent",
    },
  ];

  const myProgress = {
    quizzesTaken: 8,
    totalPoints: 450,
    rank: "Expert Junior",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent text-white px-6 pt-12 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Quiz</h1>
            <p className="text-white/90 text-sm mt-1">Testez vos connaissances</p>
          </div>
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/90 text-sm">Votre progression</span>
            <Trophy className="w-5 h-5 text-[#D4A64A]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-2xl font-bold">{myProgress.quizzesTaken}</p>
              <p className="text-xs text-white/70">Quiz complétés</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{myProgress.totalPoints}</p>
              <p className="text-xs text-white/70">Points</p>
            </div>
            <div>
              <p className="text-sm font-bold">{myProgress.rank}</p>
              <p className="text-xs text-white/70">Rang</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="px-6 py-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Catégories de Quiz</h2>
        <div className="space-y-4">
          {quizCategories.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => navigate(`/app/quiz/${quiz.id}`)}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-border"
            >
              <div className={`bg-gradient-to-r ${quiz.color} p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                      {quiz.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-white">{quiz.title}</h3>
                      <p className="text-sm text-white/90">{quiz.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    <span>{quiz.questionsCount} questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.duration}</span>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  quiz.difficulty === "Facile" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-orange-100 text-orange-700"
                }`}>
                  {quiz.difficulty}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl p-5 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">Classement</h3>
            <Trophy className="w-5 h-5 text-[#D4A64A]" />
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Mamadou Sané", points: 890, avatar: "MS" },
              { rank: 2, name: "Fatou Diatta", points: 750, avatar: "FD" },
              { rank: 3, name: "Vous", points: 450, avatar: "AM", isMe: true },
            ].map((user) => (
              <div
                key={user.rank}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  user.isMe ? "bg-primary/5 border border-primary/20" : "bg-secondary"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  user.rank === 1 
                    ? "bg-[#D4A64A] text-white" 
                    : user.rank === 2
                    ? "bg-gray-400 text-white"
                    : user.isMe
                    ? "bg-primary text-white"
                    : "bg-gray-300 text-gray-700"
                }`}>
                  {user.rank === 1 ? "🏆" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  user.isMe ? "bg-primary text-white" : "bg-primary/10 text-primary"
                }`}>
                  {user.avatar}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${user.isMe ? "text-primary" : "text-foreground"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
