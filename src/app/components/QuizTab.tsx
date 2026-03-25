import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Calendar,
  ChevronRight,
  CircleCheck,
  CircleX,
  Coins,
  Flame,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}
interface QuizSet {
  id: string;
  topic: string;
  emoji: string;
  description: string;
  questions: Question[];
}

const QUIZ_SETS: QuizSet[] = [
  {
    id: "know-your-rights",
    topic: "Know Your Rights",
    emoji: "⚖️",
    description:
      "Test your knowledge of the Nigerian Constitution and your fundamental rights",
    questions: [
      {
        question:
          "Which section of the Nigerian Constitution guarantees freedom of expression?",
        options: ["Section 39", "Section 42", "Section 33", "Section 40"],
        correct: 0,
        explanation:
          "Section 39 of the 1999 Constitution guarantees every citizen the right to freedom of expression.",
      },
      {
        question: "How many states are there in Nigeria?",
        options: ["30", "32", "36", "40"],
        correct: 2,
        explanation:
          "Nigeria has 36 states plus the Federal Capital Territory (Abuja).",
      },
      {
        question: "Which arm of government interprets the law?",
        options: ["Executive", "Legislative", "Judiciary", "Police"],
        correct: 2,
        explanation:
          "The Judiciary is responsible for interpreting laws and administering justice.",
      },
      {
        question: "What is Nigeria's motto?",
        options: [
          "Unity and Progress",
          "Unity and Faith, Peace and Progress",
          "One Nation, One Destiny",
          "Forward Ever, Backward Never",
        ],
        correct: 1,
        explanation:
          "Nigeria's motto is 'Unity and Faith, Peace and Progress', reflecting the nation's core values.",
      },
      {
        question: "What does Section 34 of the 1999 Constitution protect?",
        options: [
          "Right to vote",
          "Dignity of the human person",
          "Freedom of movement",
          "Right to education",
        ],
        correct: 1,
        explanation:
          "Section 34 protects the dignity of the human person, prohibiting torture and inhumane treatment.",
      },
    ],
  },
  {
    id: "nigerian-history",
    topic: "Nigerian History",
    emoji: "🏛️",
    description: "How well do you know Nigeria's rich history and heritage?",
    questions: [
      {
        question: "When did Nigeria gain independence?",
        options: [
          "October 1, 1960",
          "January 15, 1966",
          "October 1, 1963",
          "July 1, 1958",
        ],
        correct: 0,
        explanation:
          "Nigeria gained independence from Britain on October 1, 1960.",
      },
      {
        question: "What does the green color in Nigeria's flag represent?",
        options: ["Peace", "Agriculture and forests", "Unity", "Strength"],
        correct: 1,
        explanation:
          "The green in Nigeria's flag represents the nation's agricultural wealth and lush vegetation.",
      },
      {
        question: "Who was Nigeria's first Prime Minister?",
        options: [
          "Nnamdi Azikiwe",
          "Obafemi Awolowo",
          "Tafawa Balewa",
          "Ahmadu Bello",
        ],
        correct: 2,
        explanation:
          "Sir Abubakar Tafawa Balewa became Nigeria's first and only Prime Minister at independence.",
      },
      {
        question: "In which year did Nigeria's civil war begin?",
        options: ["1965", "1966", "1967", "1968"],
        correct: 2,
        explanation:
          "The Nigerian Civil War (Biafran War) began in July 1967 and lasted until January 1970.",
      },
      {
        question: "Which city served as Nigeria's capital before Abuja?",
        options: ["Ibadan", "Kano", "Enugu", "Lagos"],
        correct: 3,
        explanation:
          "Lagos served as Nigeria's capital city until the government officially moved to Abuja in 1991.",
      },
    ],
  },
  {
    id: "civic-duties",
    topic: "Civic Duties",
    emoji: "🗳️",
    description: "Understand your responsibilities as a Nigerian citizen",
    questions: [
      {
        question: "What is the minimum voting age in Nigeria?",
        options: ["16", "18", "21", "25"],
        correct: 1,
        explanation:
          "Nigerian citizens must be at least 18 years old to vote in elections.",
      },
      {
        question: "How often are presidential elections held in Nigeria?",
        options: [
          "Every 4 years",
          "Every 5 years",
          "Every 6 years",
          "Every 3 years",
        ],
        correct: 0,
        explanation:
          "Presidential elections in Nigeria are held every four years, with a maximum of two terms.",
      },
      {
        question: "What does INEC stand for?",
        options: [
          "Independent National Electoral Commission",
          "Integrated National Election Committee",
          "Internal National Ethics Council",
          "Independent National Executive Council",
        ],
        correct: 0,
        explanation:
          "INEC is the Independent National Electoral Commission, responsible for conducting elections in Nigeria.",
      },
      {
        question: "Which body is responsible for making laws in Nigeria?",
        options: [
          "The Presidency",
          "The Supreme Court",
          "The National Assembly",
          "The Federal Executive Council",
        ],
        correct: 2,
        explanation:
          "The National Assembly (Senate + House of Representatives) is responsible for making laws at the federal level.",
      },
      {
        question: "What is the primary duty of every Nigerian citizen?",
        options: [
          "Pay taxes only",
          "Defend the constitution and obey laws",
          "Vote in every election",
          "Join the military",
        ],
        correct: 1,
        explanation:
          "Every citizen has a constitutional duty to defend the constitution, obey laws, and contribute to Nigeria's development.",
      },
    ],
  },
  {
    id: "unity-diversity",
    topic: "Unity & Diversity",
    emoji: "🤝",
    description: "Celebrate Nigeria's rich tapestry of cultures and languages",
    questions: [
      {
        question: "Approximately how many ethnic groups are in Nigeria?",
        options: ["100", "200", "300", "500+"],
        correct: 3,
        explanation:
          "Nigeria has over 500 distinct ethnic groups, making it one of the most ethnically diverse nations in the world.",
      },
      {
        question: "What are the three largest ethnic groups in Nigeria?",
        options: [
          "Yoruba, Hausa, Fulani",
          "Hausa-Fulani, Igbo, Yoruba",
          "Igbo, Tiv, Ijaw",
          "Kanuri, Efik, Nupe",
        ],
        correct: 1,
        explanation:
          "The Hausa-Fulani, Igbo, and Yoruba are the three largest ethnic groups in Nigeria, collectively making up about 70% of the population.",
      },
      {
        question: "How many official languages does Nigeria have?",
        options: ["1", "3", "5", "36"],
        correct: 0,
        explanation:
          "Nigeria has only one official language — English — though it recognizes Hausa, Yoruba, and Igbo as major languages.",
      },
      {
        question:
          "What is the traditional Yoruba festival that celebrates the New Year?",
        options: ["Argungu", "Egungun", "Ojude Oba", "Osun-Osogbo"],
        correct: 2,
        explanation:
          "Ojude Oba is a major Yoruba festival celebrated in Ijebu Ode, showcasing the culture and traditions of the Ijebu people.",
      },
      {
        question:
          "The phrase 'Naija no dey carry last' reflects which core Nigerian value?",
        options: [
          "Corruption",
          "Resilience and determination",
          "Laziness",
          "Conformity",
        ],
        correct: 1,
        explanation:
          "This popular phrase reflects the spirit of resilience, determination, and the refusal to give up that defines the Nigerian character.",
      },
    ],
  },
];

export function QuizTab() {
  const { state, dispatch } = useApp();
  const [selectedSet, setSelectedSet] = useState<QuizSet | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const activeQuestions = selectedSet?.questions ?? [];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
    if (selectedAnswer === activeQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = (quizSet: QuizSet) => {
    setSelectedSet(quizSet);
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleBackToHome = () => {
    setSelectedSet(null);
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  if (quizCompleted && selectedSet) {
    const pointsEarned = score * 10;
    const percentage = (score / activeQuestions.length) * 100;

    const handleFinish = () => {
      dispatch({
        type: "COMPLETE_QUIZ",
        payload: {
          topic: selectedSet.topic,
          score,
          total: activeQuestions.length,
          pointsEarned,
        },
      });
      handleBackToHome();
    };

    return (
      <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="p-8 text-center bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
            <Trophy size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-lg mb-2 opacity-90">{selectedSet.topic}</p>
            <p className="text-base mb-6 opacity-80">
              You scored {score} out of {activeQuestions.length}
            </p>
            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <div className="text-4xl font-bold mb-1">+{pointsEarned}</div>
              <div className="text-sm opacity-90">Unity Points Earned</div>
              <div className="text-xs opacity-80 mt-1">
                Total: {state.points + pointsEarned} pts
              </div>
            </div>
            {percentage >= 80 && (
              <p className="text-sm mb-4 opacity-90">
                🎉 Excellent work! You're a civic champion!
              </p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-sm mb-4 opacity-90">
                👏 Good job! Keep learning to improve!
              </p>
            )}
            {percentage < 60 && (
              <p className="text-sm mb-4 opacity-90">
                💪 Keep practicing! Review the Learn tab for more info.
              </p>
            )}
            <Button
              onClick={handleFinish}
              variant="secondary"
              className="w-full bg-white text-[#008751] hover:bg-gray-100"
            >
              Back to Quiz Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (quizStarted && selectedSet) {
    const currentQ = activeQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;

    return (
      <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBackToHome}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ← Back
          </button>
          <span className="text-sm font-medium text-gray-700">
            {selectedSet.emoji} {selectedSet.topic}
          </span>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">
              Question {currentQuestion + 1} of {activeQuestions.length}
            </span>
            <span className="font-medium text-[#008751]">Score: {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#008751] transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / activeQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        <Card className="p-6 mb-6 bg-white border-2 border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="size-8 rounded-full bg-[#008751] text-white flex items-center justify-center font-bold shrink-0">
              {currentQuestion + 1}
            </div>
            <p className="font-medium text-gray-900 leading-relaxed">
              {currentQ.question}
            </p>
          </div>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correct;
              let borderColor = "border-gray-300",
                bgColor = "bg-white";
              if (showFeedback && isCorrectAnswer) {
                borderColor = "border-green-500";
                bgColor = "bg-green-50";
              } else if (showFeedback && isSelected && !isCorrect) {
                borderColor = "border-red-500";
                bgColor = "bg-red-50";
              } else if (isSelected) {
                borderColor = "border-[#008751]";
                bgColor = "bg-green-50";
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 ${borderColor} ${bgColor} text-left transition-all hover:border-[#008751] disabled:cursor-not-allowed flex items-center justify-between`}
                >
                  <span className="font-medium">{option}</span>
                  {showFeedback && isCorrectAnswer && (
                    <CircleCheck
                      className="text-green-600 shrink-0"
                      size={20}
                    />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <CircleX className="text-red-600 shrink-0" size={20} />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {showFeedback && (
          <Card
            className={`p-4 mb-6 ${isCorrect ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CircleCheck className="text-green-600 shrink-0" size={24} />
              ) : (
                <Brain className="text-blue-600 shrink-0" size={24} />
              )}
              <div>
                <p className="font-semibold mb-1 text-gray-900">
                  {isCorrect ? "Correct! 🎉" : "Not quite right"}
                </p>
                <p className="text-sm text-gray-700">{currentQ.explanation}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-3">
          {!showFeedback ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-[#008751] hover:bg-[#006d40] text-white disabled:bg-gray-300"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="flex-1 bg-[#008751] hover:bg-[#006d40] text-white"
            >
              {currentQuestion < activeQuestions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  const dailySet = QUIZ_SETS[new Date().getDay() % QUIZ_SETS.length];

  // Quiz Home Screen
  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz</h1>

      {/* Stats Header */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="text-orange-500" size={20} />
            <span className="text-sm font-medium text-orange-900">Streak</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {state.streak} Days
          </p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="text-[#008751]" size={20} />
            <span className="text-sm font-medium text-green-900">Points</span>
          </div>
          <p className="text-2xl font-bold text-[#008751]">{state.points}</p>
        </Card>
      </div>

      {/* Daily Quiz Featured */}
      <Card className="mb-6 p-5 bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">
            DAILY CHALLENGE
          </span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{dailySet.emoji}</span>
          <div>
            <h2 className="text-lg font-bold">{dailySet.topic}</h2>
            <p className="text-xs opacity-80">{dailySet.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
          <div>
            <p className="text-xl font-bold">5</p>
            <p className="text-xs opacity-80">Questions</p>
          </div>
          <div>
            <p className="text-xl font-bold">+50</p>
            <p className="text-xs opacity-80">Max pts</p>
          </div>
          <div>
            <p className="text-xl font-bold">~2</p>
            <p className="text-xs opacity-80">Minutes</p>
          </div>
        </div>
        <Button
          onClick={() => handleStartQuiz(dailySet)}
          variant="secondary"
          className="w-full bg-white text-[#008751] hover:bg-gray-100 font-semibold"
        >
          Start Daily Quiz
        </Button>
      </Card>

      {/* All Quiz Sets */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">All Quiz Topics</h3>
        <div className="space-y-2">
          {QUIZ_SETS.map((qs) => (
            <button
              key={qs.id}
              onClick={() => handleStartQuiz(qs)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white hover:border-[#008751] hover:bg-green-50 transition-all text-left"
            >
              <span className="text-2xl">{qs.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900">{qs.topic}</p>
                <p className="text-xs text-gray-500 truncate">
                  {qs.description}
                </p>
              </div>
              <ChevronRight size={18} className="text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Quiz History */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Quiz History</h3>
          <Calendar size={18} className="text-gray-400" />
        </div>
        {state.quizHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No quizzes taken yet. Start your first quiz!
          </p>
        ) : (
          <div className="space-y-3">
            {state.quizHistory.slice(0, 5).map((quiz) => {
              const percentage = Math.round((quiz.score / quiz.total) * 100);
              return (
                <Card
                  key={quiz.id}
                  className="p-4 bg-white border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{quiz.topic}</h4>
                      <p className="text-xs text-gray-500">
                        {quiz.date} · +{quiz.pointsEarned} pts
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#008751]">
                        {quiz.score}/{quiz.total}
                      </p>
                      <p className="text-xs text-gray-500">{percentage}%</p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#008751] rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <p className="text-sm font-medium text-purple-900 mb-1">
          💪 Keep Going!
        </p>
        <p className="text-xs text-purple-700">
          {state.streak > 0
            ? `You're on a ${state.streak}-day streak! Complete today's quiz to keep it going and earn bonus points.`
            : "Start your streak today! Complete a quiz to begin earning bonus points."}
        </p>
      </Card>
    </div>
  );
}
