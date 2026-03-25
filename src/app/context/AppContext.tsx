import React, { createContext, useContext, useEffect, useReducer } from "react";

export interface QuizEntry {
  id: string;
  date: string;
  topic: string;
  score: number;
  total: number;
  pointsEarned: number;
}
export interface UnityPost {
  id: string;
  author: string;
  location: string;
  time: string;
  content: string;
  reactions: { hearts: number; flags: number };
  comments: number;
  userReacted: boolean;
  userFlagged: boolean;
  isOwn: boolean;
  createdAt: number;
}
export interface CategoryProgress {
  id: string;
  name: string;
  completed: number;
  total: number;
}
export interface AppState {
  points: number;
  streak: number;
  longestStreak: number;
  quizzesTaken: number;
  quizHistory: QuizEntry[];
  posts: UnityPost[];
  categoryProgress: CategoryProgress[];
  profileName: string;
  profileInitials: string;
  totalPostsCreated: number;
  lastQuizDate: string;
  completedModuleIds: string[];
}

type Action =
  | {
      type: "COMPLETE_QUIZ";
      payload: {
        topic: string;
        score: number;
        total: number;
        pointsEarned: number;
      };
    }
  | { type: "ADD_POST"; payload: { content: string; location: string } }
  | { type: "DELETE_POST"; payload: string }
  | { type: "TOGGLE_REACTION"; payload: string }
  | { type: "TOGGLE_FLAG"; payload: string }
  | {
      type: "COMPLETE_MODULE";
      payload: { categoryId: string; moduleId: string };
    }
  | { type: "UPDATE_PROFILE"; payload: { name: string; initials: string } };

const SEED_POSTS: UnityPost[] = [
  {
    id: "p1",
    author: "Amina K.",
    location: "Kano State",
    time: "2h ago",
    content:
      "Today I helped my Igbo neighbor understand our Hausa culture, and she taught me about Igbo cuisine. This is what unity looks like! 🤝",
    reactions: { hearts: 45, flags: 12 },
    comments: 8,
    userReacted: false,
    userFlagged: false,
    isOwn: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: "p2",
    author: "Chidi O.",
    location: "Lagos",
    time: "5h ago",
    content:
      "Witnessed a beautiful moment today - Christians and Muslims celebrating together at a community event. Nigeria's diversity is our strength! 🇳🇬",
    reactions: { hearts: 89, flags: 23 },
    comments: 15,
    userReacted: false,
    userFlagged: false,
    isOwn: false,
    createdAt: Date.now() - 18000000,
  },
  {
    id: "p3",
    author: "Fatima B.",
    location: "Abuja",
    time: "1d ago",
    content:
      "Started a cultural exchange program in my neighborhood. We're learning each other's languages and traditions. Unity begins with understanding! 💚",
    reactions: { hearts: 67, flags: 18 },
    comments: 11,
    userReacted: false,
    userFlagged: false,
    isOwn: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "p4",
    author: "Yusuf M.",
    location: "Sokoto",
    time: "2d ago",
    content:
      "Our school organized an inter-tribal cultural day. Students showcased their languages and foods. The smiles were priceless! 😊🇳🇬",
    reactions: { hearts: 34, flags: 5 },
    comments: 6,
    userReacted: false,
    userFlagged: false,
    isOwn: false,
    createdAt: Date.now() - 172800000,
  },
];

const INITIAL: AppState = {
  points: 450,
  streak: 3,
  longestStreak: 7,
  quizzesTaken: 12,
  quizHistory: [
    {
      id: "qh1",
      date: "Dec 20, 2025",
      topic: "Know Your Rights",
      score: 4,
      total: 5,
      pointsEarned: 40,
    },
    {
      id: "qh2",
      date: "Dec 19, 2025",
      topic: "Civic Duties",
      score: 5,
      total: 5,
      pointsEarned: 50,
    },
    {
      id: "qh3",
      date: "Dec 18, 2025",
      topic: "Unity & Diversity",
      score: 3,
      total: 5,
      pointsEarned: 30,
    },
  ],
  posts: SEED_POSTS,
  categoryProgress: [
    {
      id: "know-your-rights",
      name: "Know Your Rights",
      completed: 5,
      total: 8,
    },
    {
      id: "civic-responsibilities",
      name: "Civic Responsibilities",
      completed: 3,
      total: 6,
    },
    {
      id: "unity-inclusion",
      name: "Unity & Inclusion",
      completed: 4,
      total: 7,
    },
    {
      id: "emergency-services",
      name: "Emergency Services",
      completed: 2,
      total: 4,
    },
  ],
  profileName: "Chukwudi A.",
  profileInitials: "CA",
  totalPostsCreated: 0,
  lastQuizDate: "2025-12-20",
  completedModuleIds: [
    "kyr-1",
    "kyr-2",
    "kyr-3",
    "kyr-4",
    "kyr-5",
    "cr-1",
    "cr-2",
    "cr-3",
    "ui-1",
    "ui-2",
    "ui-3",
    "ui-4",
    "es-1",
    "es-2",
  ],
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "COMPLETE_QUIZ": {
      const { topic, score, total, pointsEarned } = action.payload;
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const isNewDay = state.lastQuizDate !== today;
      const newStreak = isNewDay ? state.streak + 1 : state.streak;
      const entry: QuizEntry = {
        id: `qh${Date.now()}`,
        date: today,
        topic,
        score,
        total,
        pointsEarned,
      };
      return {
        ...state,
        points: state.points + pointsEarned,
        streak: newStreak,
        longestStreak: Math.max(state.longestStreak, newStreak),
        quizzesTaken: state.quizzesTaken + 1,
        quizHistory: [entry, ...state.quizHistory],
        lastQuizDate: today,
      };
    }
    case "ADD_POST": {
      const { content, location } = action.payload;
      const post: UnityPost = {
        id: `p${Date.now()}`,
        author: state.profileName,
        location,
        time: "Just now",
        content,
        reactions: { hearts: 0, flags: 0 },
        comments: 0,
        userReacted: false,
        userFlagged: false,
        isOwn: true,
        createdAt: Date.now(),
      };
      return {
        ...state,
        posts: [post, ...state.posts],
        totalPostsCreated: state.totalPostsCreated + 1,
      };
    }
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    case "TOGGLE_REACTION":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id !== action.payload
            ? p
            : {
                ...p,
                userReacted: !p.userReacted,
                reactions: {
                  ...p.reactions,
                  hearts: p.userReacted
                    ? p.reactions.hearts - 1
                    : p.reactions.hearts + 1,
                },
              },
        ),
      };
    case "TOGGLE_FLAG":
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id !== action.payload
            ? p
            : {
                ...p,
                userFlagged: !p.userFlagged,
                reactions: {
                  ...p.reactions,
                  flags: p.userFlagged
                    ? p.reactions.flags - 1
                    : p.reactions.flags + 1,
                },
              },
        ),
      };
    case "COMPLETE_MODULE": {
      const { categoryId, moduleId } = action.payload;
      if (state.completedModuleIds.includes(moduleId)) return state;
      return {
        ...state,
        completedModuleIds: [...state.completedModuleIds, moduleId],
        points: state.points + 10,
        categoryProgress: state.categoryProgress.map((cat) =>
          cat.id !== categoryId || cat.completed >= cat.total
            ? cat
            : { ...cat, completed: cat.completed + 1 },
        ),
      };
    }
    case "UPDATE_PROFILE":
      return {
        ...state,
        profileName: action.payload.name,
        profileInitials: action.payload.initials,
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}
const AppContext = createContext<AppContextValue | null>(null);

function loadState(): AppState {
  try {
    const saved = localStorage.getItem("unify_state");
    if (saved) return { ...INITIAL, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return INITIAL;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);
  useEffect(() => {
    localStorage.setItem("unify_state", JSON.stringify(state));
  }, [state]);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
