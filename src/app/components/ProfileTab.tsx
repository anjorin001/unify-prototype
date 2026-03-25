import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Award,
  BookOpen,
  Check,
  ChevronRight,
  CircleUser,
  Coins,
  Flame,
  Phone,
  Settings,
  Target,
  Trophy,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const LEVEL_MAP = [
  { level: "Beginner", min: 0, max: 100, emoji: "🌱" },
  { level: "Novice", min: 101, max: 250, emoji: "🌿" },
  { level: "Learner", min: 251, max: 400, emoji: "🌳" },
  { level: "Advocate", min: 401, max: 600, emoji: "🏆" },
  { level: "Ambassador", min: 601, max: Infinity, emoji: "👑" },
];

function getLevel(points: number) {
  return (
    LEVEL_MAP.find((l) => points <= l.max) ?? LEVEL_MAP[LEVEL_MAP.length - 1]
  );
}

export function ProfileTab() {
  const { state, dispatch } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(state.profileName);

  const totalCompleted = state.categoryProgress.reduce(
    (s, c) => s + c.completed,
    0,
  );
  const totalModules = state.categoryProgress.reduce((s, c) => s + c.total, 0);
  const learningProgress =
    totalModules > 0 ? Math.round((totalCompleted / totalModules) * 100) : 0;

  const levelInfo = getLevel(state.points);
  const nextLevel = LEVEL_MAP[LEVEL_MAP.indexOf(levelInfo) + 1];
  const progressToNext = nextLevel
    ? Math.round(
        ((state.points - levelInfo.min) / (nextLevel.min - levelInfo.min)) *
          100,
      )
    : 100;
  const pointsToNext = nextLevel
    ? Math.max(0, nextLevel.min - state.points)
    : 0;

  const badges = [
    {
      id: 1,
      name: "First Quiz",
      icon: "🎯",
      earned: state.quizzesTaken >= 1,
      description: "Complete your first quiz",
    },
    {
      id: 2,
      name: "Week Warrior",
      icon: "🔥",
      earned: state.longestStreak >= 7,
      description: "Achieve a 7-day streak",
    },
    {
      id: 3,
      name: "Unity Champion",
      icon: "🤝",
      earned: state.totalPostsCreated >= 5,
      description: "Create 5 Unity Stories",
    },
    {
      id: 4,
      name: "Knowledge Seeker",
      icon: "📚",
      earned: totalCompleted >= 10,
      description: "Complete 10 learning modules",
    },
    {
      id: 5,
      name: "Quiz Master",
      icon: "🧠",
      earned: state.quizzesTaken >= 10,
      description: "Complete 10 quizzes",
    },
    {
      id: 6,
      name: "Community Builder",
      icon: "🏗️",
      earned: state.totalPostsCreated >= 10,
      description: "Create 10 Unity Stories",
    },
    {
      id: 7,
      name: "Civic Hero",
      icon: "⭐",
      earned: learningProgress === 100,
      description: "Complete all learning paths",
    },
    {
      id: 8,
      name: "Month Master",
      icon: "📅",
      earned: state.longestStreak >= 30,
      description: "Achieve a 30-day streak",
    },
  ];

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    const initials = trimmed
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    dispatch({ type: "UPDATE_PROFILE", payload: { name: trimmed, initials } });
    setEditingName(false);
  };

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
        <div className="size-24 rounded-full bg-linear-to-br from-[#008751] to-[#006d40] flex items-center justify-center text-white mb-3 text-3xl font-bold">
          {state.profileInitials || <CircleUser size={48} />}
        </div>
        {editingName ? (
          <div className="flex items-center gap-2 mb-2">
            <input
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#008751]"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
              autoFocus
            />
            <button
              onClick={handleSaveName}
              className="size-7 rounded-full bg-[#008751] text-white flex items-center justify-center"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => {
                setEditingName(false);
                setNameInput(state.profileName);
              }}
              className="size-7 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="flex items-center gap-1 mb-2 hover:opacity-70"
          >
            <h1 className="text-xl font-bold text-gray-900">
              {state.profileName}
            </h1>
            <span className="text-xs text-gray-400">(edit)</span>
          </button>
        )}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-amber-100 to-yellow-100 rounded-full border border-amber-300">
          <Trophy size={16} className="text-amber-600" />
          <span className="font-semibold text-sm text-amber-900">
            {levelInfo.emoji} {levelInfo.level}
          </span>
        </div>
      </div>

      {/* Unity Points */}
      <Card className="mb-6 p-5 bg-linear-to-br from-[#008751] to-[#006d40] text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Unity Points</p>
            <p className="text-4xl font-bold">{state.points}</p>
          </div>
          <Coins size={48} className="opacity-80" />
        </div>
        {nextLevel && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs opacity-80 mb-1">
              {pointsToNext} points to {nextLevel.level} level
            </p>
            <Progress value={progressToNext} className="h-2 bg-white/20" />
          </div>
        )}
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="p-3 text-center bg-orange-50 border-orange-200">
          <Flame className="text-orange-500 mx-auto mb-1" size={24} />
          <p className="text-xl font-bold text-orange-600">{state.streak}</p>
          <p className="text-xs text-orange-900">Day Streak</p>
        </Card>
        <Card className="p-3 text-center bg-green-50 border-green-200">
          <Target className="text-[#008751] mx-auto mb-1" size={24} />
          <p className="text-xl font-bold text-[#008751]">
            {state.quizzesTaken}
          </p>
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
        <h2 className="font-semibold mb-3 text-gray-800">
          Badges & Achievements
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center p-2 ${
                badge.earned
                  ? "bg-gradient-to-br from-[#008751] to-[#006d40] text-white"
                  : "bg-gray-100 text-gray-400 opacity-50"
              }`}
              title={badge.description}
            >
              <span className="text-2xl mb-1">{badge.icon}</span>
              <span className="text-[9px] text-center font-medium leading-tight">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {badges.filter((b) => b.earned).length} of {badges.length} badges
          earned
        </p>
      </div>

      {/* Learning Progress */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Learning Progress</h2>
        <Card className="p-4 bg-white border border-gray-200">
          <div className="space-y-4">
            {state.categoryProgress.map((category) => {
              const pct =
                category.total > 0
                  ? Math.round((category.completed / category.total) * 100)
                  : 0;
              return (
                <div key={category.id}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="font-semibold text-[#008751]">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Streak Stats */}
      <Card className="mb-6 p-4 bg-linear-to-br from-orange-50 to-orange-100 border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <Flame className="text-orange-500" size={28} />
          <div>
            <p className="font-semibold text-orange-900">Streak Stats</p>
            <p className="text-xs text-orange-700">Keep your momentum going!</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-2xl font-bold text-orange-600">{state.streak}</p>
            <p className="text-xs text-gray-600">Current</p>
          </div>
          <div className="text-center p-2 bg-white rounded-lg">
            <p className="text-2xl font-bold text-orange-600">
              {state.longestStreak}
            </p>
            <p className="text-xs text-gray-600">Longest</p>
          </div>
        </div>
      </Card>

      {/* Level Journey */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Level Journey</h2>
        <Card className="p-4 bg-white border border-gray-200">
          <div className="space-y-2">
            {LEVEL_MAP.filter((l) => l.max !== Infinity)
              .concat(LEVEL_MAP[LEVEL_MAP.length - 1])
              .filter((l, i, arr) => arr.indexOf(l) === i)
              .map((level) => {
                const isCurrent = level.level === levelInfo.level;
                return (
                  <div
                    key={level.level}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isCurrent
                        ? "bg-linear-to-r from-[#008751] to-[#006d40] text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{level.emoji}</span>
                      <div>
                        <p
                          className={`font-semibold text-sm ${isCurrent ? "text-white" : "text-gray-900"}`}
                        >
                          {level.level}
                        </p>
                        <p
                          className={`text-xs ${isCurrent ? "text-white/80" : "text-gray-500"}`}
                        >
                          {level.min}–{level.max === Infinity ? "∞" : level.max}{" "}
                          pts
                        </p>
                      </div>
                    </div>
                    {isCurrent && (
                      <Award className="text-yellow-300" size={20} />
                    )}
                  </div>
                );
              })}
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
