import { Brain, Flame, Coins, CircleCheck, CircleX, Trophy, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

export function QuizTab() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: "Which section of the Nigerian Constitution guarantees freedom of expression?",
      options: ["Section 39", "Section 42", "Section 33", "Section 40"],
      correct: 0,
      explanation: "Section 39 of the 1999 Constitution guarantees every citizen the right to freedom of expression."
    },
    {
      question: "How many states are there in Nigeria?",
      options: ["30", "32", "36", "40"],
      correct: 2,
      explanation: "Nigeria has 36 states plus the Federal Capital Territory (Abuja)."
    },
    {
      question: "What does the green color in Nigeria's flag represent?",
      options: ["Peace", "Agriculture and forests", "Unity", "Strength"],
      correct: 1,
      explanation: "The green in Nigeria's flag represents the nation's agricultural wealth and lush vegetation."
    },
    {
      question: "Which arm of government interprets the law?",
      options: ["Executive", "Legislative", "Judiciary", "Police"],
      correct: 2,
      explanation: "The Judiciary is responsible for interpreting laws and administering justice."
    },
    {
      question: "What is Nigeria's motto?",
      options: [
        "Unity and Progress",
        "Unity and Faith, Peace and Progress",
        "One Nation, One Destiny",
        "Forward Ever, Backward Never"
      ],
      correct: 1,
      explanation: "Nigeria's motto is 'Unity and Faith, Peace and Progress', reflecting the nation's core values."
    }
  ];

  const quizHistory = [
    { date: "Dec 20, 2025", topic: "Know Your Rights", score: 4, total: 5 },
    { date: "Dec 19, 2025", topic: "Civic Duties", score: 5, total: 5 },
    { date: "Dec 18, 2025", topic: "Unity & Diversity", score: 3, total: 5 }
  ];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  if (quizCompleted) {
    const pointsEarned = score * 10;
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="p-8 text-center bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
            <Trophy size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-lg mb-6 opacity-90">You scored {score} out of {questions.length}</p>
            
            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <div className="text-4xl font-bold mb-1">+{pointsEarned}</div>
              <div className="text-sm opacity-90">Unity Points Earned</div>
            </div>

            {percentage >= 80 && (
              <p className="text-sm mb-4 opacity-90">🎉 Excellent work! You're a civic champion!</p>
            )}
            {percentage >= 60 && percentage < 80 && (
              <p className="text-sm mb-4 opacity-90">👏 Good job! Keep learning to improve!</p>
            )}
            {percentage < 60 && (
              <p className="text-sm mb-4 opacity-90">💪 Keep practicing! Review the Learn tab for more info.</p>
            )}

            <Button 
              onClick={() => setQuizStarted(false)}
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

  if (quizStarted) {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;

    return (
      <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="font-medium text-[#008751]">Score: {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#008751] transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-6 mb-6 bg-white border-2 border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="size-8 rounded-full bg-[#008751] text-white flex items-center justify-center font-bold flex-shrink-0">
              {currentQuestion + 1}
            </div>
            <p className="font-medium text-gray-900 leading-relaxed">{currentQ.question}</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQ.correct;
              let borderColor = "border-gray-300";
              let bgColor = "bg-white";
              
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
                    <CircleCheck className="text-green-600 flex-shrink-0" size={20} />
                  )}
                  {showFeedback && isSelected && !isCorrect && (
                    <CircleX className="text-red-600 flex-shrink-0" size={20} />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Feedback */}
        {showFeedback && (
          <Card className={`p-4 mb-6 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CircleCheck className="text-green-600 flex-shrink-0" size={24} />
              ) : (
                <Brain className="text-blue-600 flex-shrink-0" size={24} />
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

        {/* Action Buttons */}
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
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Quiz Home Screen
  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
      {/* Stats Header */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="text-orange-500" size={20} />
            <span className="text-sm font-medium text-orange-900">Streak</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">3 Days</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="text-[#008751]" size={20} />
            <span className="text-sm font-medium text-green-900">Points</span>
          </div>
          <p className="text-2xl font-bold text-[#008751]">450</p>
        </Card>
      </div>

      {/* Today's Quiz Card */}
      <Card className="mb-6 p-6 bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
        <div className="flex items-start gap-4 mb-4">
          <div className="size-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Brain size={32} />
          </div>
          <div className="flex-1">
            <div className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-medium mb-2">
              DAILY QUIZ
            </div>
            <h2 className="text-xl font-bold mb-1">Know Your Rights</h2>
            <p className="text-sm opacity-90">Test your civic knowledge today</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs opacity-80">Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">+50</p>
            <p className="text-xs opacity-80">Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">~2</p>
            <p className="text-xs opacity-80">Minutes</p>
          </div>
        </div>

        <Button 
          onClick={handleStartQuiz}
          variant="secondary"
          className="w-full bg-white text-[#008751] hover:bg-gray-100 font-semibold"
        >
          Start Quiz Now
        </Button>
      </Card>

      {/* Quiz History */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Quiz History</h3>
          <Calendar size={18} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {quizHistory.map((quiz, index) => {
            const percentage = (quiz.score / quiz.total) * 100;
            return (
              <Card key={index} className="p-4 bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-sm">{quiz.topic}</h4>
                    <p className="text-xs text-gray-500">{quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#008751]">{quiz.score}/{quiz.total}</p>
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
      </div>

      {/* Motivation Card */}
      <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <p className="text-sm font-medium text-purple-900 mb-1">💪 Keep Going!</p>
        <p className="text-xs text-purple-700">
          You're on a 3-day streak! Complete today's quiz to keep it going and earn bonus points.
        </p>
      </Card>
    </div>
  );
}