import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Button } from "../components/ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export function QuizDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // Mock quiz data based on category
  const quizData: Record<string, { title: string; questions: Question[] }> = {
    "1": {
      title: "Culture Manjak",
      questions: [
        {
          id: 1,
          question: "Quelle est la signification du mot 'Manjak' ?",
          options: ["Peuple du fleuve", "Peuple de la terre", "Peuple guerrier", "Peuple uni"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "Quelle est la danse traditionnelle manjak la plus connue ?",
          options: ["Sabar", "Kankurang", "Djambadon", "Kassoumay"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "Dans quelle région se trouve principalement le peuple manjak ?",
          options: ["Dakar", "Casamance", "Saint-Louis", "Thiès"],
          correctAnswer: 1,
        },
      ],
    },
    "2": {
      title: "Langue Manjak",
      questions: [
        {
          id: 1,
          question: "Comment dit-on 'Bonjour' en manjak ?",
          options: ["Salaam", "Kassumay", "Nioomooy", "Jaamm"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Que signifie 'Bëzic' ?",
          options: ["Famille", "Ensemble", "Peuple", "Tradition"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Comment dit-on 'Merci' en manjak ?",
          options: ["Jërëjëf", "Barakallah", "Dieuredieuf", "Misira"],
          correctAnswer: 2,
        },
      ],
    },
    "3": {
      title: "Histoire du Peuple",
      questions: [
        {
          id: 1,
          question: "Les Manjak sont originaires de quelle zone géographique ?",
          options: ["Guinée-Bissau et Sénégal", "Mali", "Gambie uniquement", "Mauritanie"],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: "Quel est le système social traditionnel manjak ?",
          options: ["Monarchie", "Démocratie villageoise", "Système de castes", "Féodalité"],
          correctAnswer: 1,
        },
      ],
    },
    "4": {
      title: "Traditions & Coutumes",
      questions: [
        {
          id: 1,
          question: "Quelle cérémonie marque le passage à l'âge adulte ?",
          options: ["Fanado", "Wango", "Bukut", "Kassanga"],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: "Quel instrument est emblématique de la musique manjak ?",
          options: ["Kora", "Balafon", "Djembé", "Tama"],
          correctAnswer: 1,
        },
      ],
    },
  };

  const currentQuiz = quizData[id || "1"];
  const questions = currentQuiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    setAnswers([...answers, isCorrect]);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-lg border border-border">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">Quiz terminé !</h1>
          <p className="text-muted-foreground mb-6">Voici vos résultats</p>
          
          <div className="bg-secondary rounded-2xl p-6 mb-6">
            <div className="text-5xl font-bold text-primary mb-2">{percentage}%</div>
            <p className="text-foreground font-medium">{score} / {totalQuestions} bonnes réponses</p>
          </div>

          {percentage >= 80 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-medium">🎉 Excellent travail !</p>
              <p className="text-green-600 text-sm">Vous maîtrisez bien le sujet</p>
            </div>
          )}

          {percentage >= 50 && percentage < 80 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-orange-700 font-medium">👍 Bien joué !</p>
              <p className="text-orange-600 text-sm">Continuez à apprendre</p>
            </div>
          )}

          {percentage < 50 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-blue-700 font-medium">💪 Continuez !</p>
              <p className="text-blue-600 text-sm">Chaque quiz vous aide à progresser</p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              className="w-full h-12 rounded-2xl bg-primary text-primary-foreground"
            >
              Recommencer
            </Button>
            <Button
              onClick={() => navigate("/app/quiz")}
              variant="outline"
              className="w-full h-12 rounded-2xl"
            >
              Retour aux quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/app/quiz")} className="p-2 -ml-2">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">{currentQuiz.title}</h1>
          <div className="w-10" />
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrect = selectedAnswer !== null && isCorrect;
              const showWrong = selectedAnswer === index && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showWrong
                      ? "border-red-500 bg-red-50"
                      : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white hover:border-primary/50"
                  } ${selectedAnswer !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${
                      showCorrect
                        ? "text-green-700"
                        : showWrong
                        ? "text-red-700"
                        : "text-foreground"
                    }`}>
                      {option}
                    </span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {showWrong && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedAnswer !== null && (
          <Button
            onClick={handleNext}
            className="w-full h-12 rounded-2xl bg-primary text-primary-foreground"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Question suivante" : "Voir les résultats"}
          </Button>
        )}
      </div>
    </div>
  );
}
