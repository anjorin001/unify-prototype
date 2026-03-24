/* eslint-disable @typescript-eslint/no-explicit-any */
import { BookOpen, Brain, CircleUser, House, Users } from "lucide-react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./app/components/HomeTab";
import { LearnTab } from "./app/components/LearnTab";
import { ProfileTab } from "./app/components/ProfileTab";
import { QuizTab } from "./app/components/QuizTab";
import SplashScreen from "./app/components/SplashScreen";
import { UnityTab } from "./app/components/UnityTab";

type TabType = "home" | "learn" | "quiz" | "unity" | "profile";

interface TabConfig {
  id: TabType;
  label: string;
  icon: typeof House;
  component: React.ComponentType<any>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [hasNewQuiz] = useState(true); // Simulate daily quiz availability

  const tabs: TabConfig[] = [
    { id: "home", label: "Home", icon: House, component: HomeScreen },
    { id: "learn", label: "Learn", icon: BookOpen, component: LearnTab },
    { id: "quiz", label: "Quiz", icon: Brain, component: QuizTab },
    { id: "unity", label: "Unity", icon: Users, component: UnityTab },
    {
      id: "profile",
      label: "Profile",
      icon: CircleUser,
      component: ProfileTab,
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || HomeScreen;

  const tabLayout = (
    <div className="h-screen w-full flex flex-col bg-white max-w-md mx-auto relative">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <ActiveComponent />
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 rounded-t-xl shadow-[0_-2px_8px_rgba(0,0,0,0.04)] safe-area-inset-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isQuizTab = tab.id === "quiz";
            const iconSize = isQuizTab ? 28 : 24;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full
                  transition-all duration-200 min-w-[56px] min-h-[56px] relative
                  ${
                    isActive
                      ? "text-[#008751] scale-[1.02]"
                      : "text-gray-400 hover:bg-gray-50 active:scale-[0.98]"
                  }
                `}
                aria-label={tab.label}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Notification Dot for Quiz Tab */}
                {isQuizTab && hasNewQuiz && (
                  <span className="absolute top-1.5 right-1/2 translate-x-3 size-2 bg-[#008751] rounded-full animate-pulse"></span>
                )}

                <Icon
                  size={iconSize}
                  strokeWidth={2}
                  className="flex-shrink-0"
                />
                <span
                  className={`text-[11px] ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={tabLayout} />
      <Route path="/splash" element={<SplashScreen />} />
    </Routes>
  );
}
