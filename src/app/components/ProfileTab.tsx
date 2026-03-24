import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleUser, Award, Coins, Flame, Settings, ChevronRight, Trophy, Target, BookOpen, Phone } from "lucide-react";

interface Badge {
  id: number;
  name: string;
  icon: string;
  earned: boolean;
  description: string;
}

export function ProfileTab() {
  const userLevel = "Advocate";
  const totalPoints = 450;
  const currentStreak = 3;
  const longestStreak = 7;
  const quizzesTaken = 12;
  const learningProgress = 53;

  const badges: Badge[] = [
    { id: 1, name: "First Quiz", icon: "🎯", earned: true, description: "Complete your first quiz" },
    { id: 2, name: "Week Warrior", icon: "🔥", earned: true, description: "7-day streak" },
    { id: 3, name: "Unity Champion", icon: "🤝", earned: true, description: "Post 5 unity stories" },
    { id: 4, name: "Knowledge Seeker", icon: "📚", earned: true, description: "Complete 10 learning modules" },
    { id: 5, name: "Quiz Master", icon: "🧠", earned: false, description: "Score 100% on 5 quizzes" },
    { id: 6, name: "Community Builder", icon: "🏗️", earned: false, description: "50 forum interactions" },
    { id: 7, name: "Civic Hero", icon: "⭐", earned: false, description: "Complete all learning paths" },
    { id: 8, name: "Month Master", icon: "📅", earned: false, description: "30-day streak" }
  ];

  const learningCategories = [
    { name: "Know Your Rights", progress: 65, color: "#008751" },
    { name: "Civic Responsibilities", progress: 50, color: "#008751" },
    { name: "Unity & Inclusion", progress: 45, color: "#008751" }
  ];

  const levelInfo = [
    { level: "Beginner", points: "0-100", emoji: "🌱" },
    { level: "Novice", points: "101-250", emoji: "🌿" },
    { level: "Learner", points: "251-400", emoji: "🌳" },
    { level: "Advocate", points: "401-600", emoji: "🏆", current: true },
    { level: "Ambassador", points: "601+", emoji: "👑" }
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
      {/* Settings Icon */}
      <div className="flex justify-end mb-4">
        <button className="size-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <Settings size={22} className="text-gray-600" />
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <div className="size-24 rounded-full bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center text-white mb-3">
          <CircleUser size={48} />
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Chukwudi A.</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full border border-amber-300">
          <Trophy size={16} className="text-amber-600" />
          <span className="font-semibold text-sm text-amber-900">{userLevel}</span>
        </div>
      </div>

      {/* Unity Points */}
      <Card className="mb-6 p-5 bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Unity Points</p>
            <p className="text-4xl font-bold">{totalPoints}</p>
          </div>
          <Coins size={48} className="opacity-80" />
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-xs opacity-80 mb-1">150 points to Ambassador level</p>
          <Progress value={75} className="h-2 bg-white/20" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 text-center bg-orange-50 border-orange-200">
          <Flame className="text-orange-500 mx-auto mb-1" size={24} />
          <p className="text-xl font-bold text-orange-600">{currentStreak}</p>
          <p className="text-xs text-orange-900">Day Streak</p>
        </Card>
        <Card className="p-3 text-center bg-green-50 border-green-200">
          <Target className="text-[#008751] mx-auto mb-1" size={24} />
          <p className="text-xl font-bold text-[#008751]">{quizzesTaken}</p>
          <p className="text-xs text-green-900">Quizzes</p>
        </Card>
        <Card className="p-3 text-center bg-blue-50 border-blue-200">
          <BookOpen className="text-blue-600 mx-auto mb-1" size={24} />
          <p className="text-xl font-bold text-blue-600">{learningProgress}%</p>
          <p className="text-xs text-blue-900">Complete</p>
        </Card>
      </div>

      {/* Badges Collection */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Badges & Achievements</h2>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 ${
                badge.earned 
                  ? 'bg-gradient-to-br from-[#008751] to-[#006d40] text-white' 
                  : 'bg-gray-100 text-gray-400 opacity-50'
              }`}
              title={badge.description}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[9px] text-center font-medium leading-tight">{badge.name}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {badges.filter(b => b.earned).length} of {badges.length} badges earned
        </p>
      </div>

      {/* Learning Progress */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Learning Progress</h2>
        <Card className="p-4 bg-white border border-gray-200">
          <div className="space-y-4">
            {learningCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-700">{category.name}</span>
                  <span className="font-semibold text-[#008751]">{category.progress}%</span>
                </div>
                <Progress value={category.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Streak Stats */}
      <Card className="mb-6 p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-orange-500" size={28} />
          <div>
            <p className="font-semibold text-orange-900">Streak Stats</p>
            <p className="text-xs text-orange-700">Keep your momentum going!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{currentStreak}</p>
            <p className="text-xs text-gray-600">Current</p>
          </div>
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{longestStreak}</p>
            <p className="text-xs text-gray-600">Longest</p>
          </div>
        </div>
      </Card>

      {/* Level Progress */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Level Journey</h2>
        <Card className="p-4 bg-white border border-gray-200">
          <div className="space-y-2">
            {levelInfo.map((level, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  level.current 
                    ? 'bg-gradient-to-r from-[#008751] to-[#006d40] text-white' 
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{level.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${level.current ? 'text-white' : 'text-gray-900'}`}>
                      {level.level}
                    </p>
                    <p className={`text-xs ${level.current ? 'text-white/80' : 'text-gray-500'}`}>
                      {level.points} points
                    </p>
                  </div>
                </div>
                {level.current && (
                  <Award className="text-yellow-300" size={20} />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Settings Menu */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Settings & Info</h2>
        <Card className="p-0 bg-white border border-gray-200 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <span className="text-sm font-medium">Edit Profile</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <span className="text-sm font-medium">Notification Settings</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
            <span className="text-sm font-medium">Help & Support</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium">About</span>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </Card>
      </div>

      {/* Emergency Button */}
      <Button variant="destructive" className="w-full mb-6">
        <Phone className="mr-2" size={18} />
        Emergency Help Line
      </Button>
    </div>
  );
}