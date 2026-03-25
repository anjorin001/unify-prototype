import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Globe,
  Phone,
  Scale,
  Search,
  Shield,
  Star,
  Users2,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

interface LearnModule {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyPoints: string[];
  tip: string;
}
interface LearnCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  accent: string;
  modules: LearnModule[];
}

const LEARN_DATA: LearnCategory[] = [
  {
    id: "know-your-rights",
    title: "Know Your Rights",
    icon: Scale,
    color: "bg-blue-50 text-blue-600",
    accent: "#3B82F6",
    modules: [
      {
        id: "kyr-1",
        title: "Right to Life & Dignity",
        duration: "4 min",
        content:
          "Section 33 of Nigeria's 1999 Constitution guarantees every citizen the right to life. No person shall be deprived intentionally of their life, and human dignity must be upheld at all times by state and private actors alike.",
        keyPoints: [
          "Life cannot be arbitrarily taken",
          "Torture and degrading treatment are prohibited",
          "These rights apply to all residents, not just citizens",
        ],
        tip: "If you witness a violation, document it and contact the National Human Rights Commission (NHRC).",
      },
      {
        id: "kyr-2",
        title: "Freedom of Expression",
        duration: "5 min",
        content:
          "Section 39 protects every Nigerian's right to hold opinions and express them freely through any medium. This includes press freedom and the right to receive and share information without interference.",
        keyPoints: [
          "You can express opinions without prior restraint",
          "Media and journalists are protected",
          "Hate speech and incitement are not protected",
        ],
        tip: "Always express criticism constructively. Responsible speech strengthens democracy.",
      },
      {
        id: "kyr-3",
        title: "Right to Education",
        duration: "4 min",
        content:
          "The Universal Basic Education Act (2004) mandates free and compulsory basic education for all Nigerian children. State governments must provide schools, trained teachers, and learning materials.",
        keyPoints: [
          "Basic education (9 years) is free and compulsory",
          "Parents who deny children schooling can be penalised",
          "Girls have equal rights to education",
        ],
        tip: "Report out-of-school children in your community to your Local Government Education Authority.",
      },
      {
        id: "kyr-4",
        title: "Freedom of Movement",
        duration: "4 min",
        content:
          "Section 41 gives every citizen the right to move freely throughout Nigeria and to reside in any part of the country. No ethnic or religious group can lawfully bar others from settling in their community.",
        keyPoints: [
          "You can live and work in any state",
          "Internal movement checkpoints must be lawful",
          "Deportation of citizens from a state is illegal",
        ],
        tip: "Carry valid ID when travelling across states to avoid unnecessary delays at checkpoints.",
      },
      {
        id: "kyr-5",
        title: "Right to Fair Hearing",
        duration: "5 min",
        content:
          "Section 36 guarantees the right to a fair hearing before an independent and impartial tribunal. An accused person is presumed innocent until proven guilty and must be informed of charges promptly.",
        keyPoints: [
          "You have the right to legal representation",
          "Trials must be public unless security demands otherwise",
          "No retroactive criminal laws",
        ],
        tip: "If arrested, calmly state 'I invoke my right to remain silent' until you speak with a lawyer.",
      },
      {
        id: "kyr-6",
        title: "Freedom from Discrimination",
        duration: "4 min",
        content:
          "Section 42 prohibits discrimination on grounds of ethnicity, place of origin, sex, religion, or political opinion. All Nigerians are equal before the law regardless of tribe or faith.",
        keyPoints: [
          "Employers cannot refuse you based on ethnicity",
          "Women have equal constitutional rights to men",
          "Discriminatory laws are void",
        ],
        tip: "Report workplace discrimination to the Industrial Court or the NHRC.",
      },
      {
        id: "kyr-7",
        title: "Right to Private Life",
        duration: "3 min",
        content:
          "Section 37 protects the privacy of citizens, their homes, correspondence, and communications. Unlawful searches and surveillance are unconstitutional.",
        keyPoints: [
          "Police need a warrant to search your home",
          "Private communications are protected",
          "Data privacy laws extend these protections online",
        ],
        tip: "You can demand to see a search warrant before allowing police into your premises.",
      },
      {
        id: "kyr-8",
        title: "Right to Property",
        duration: "4 min",
        content:
          "Section 44 protects citizens from compulsory acquisition of property without prompt, fair, and adequate compensation. Forced evictions without due process are unconstitutional.",
        keyPoints: [
          "Government must pay fair compensation for acquired land",
          "You can challenge unlawful acquisition in court",
          "Community land rights are also protected",
        ],
        tip: "Always obtain a Certificate of Occupancy (C of O) for your property to secure your legal title.",
      },
    ],
  },
  {
    id: "civic-responsibilities",
    title: "Civic Responsibilities",
    icon: Shield,
    color: "bg-purple-50 text-purple-600",
    accent: "#9333EA",
    modules: [
      {
        id: "cr-1",
        title: "Voting & Elections",
        duration: "5 min",
        content:
          "Every Nigerian aged 18+ has the right and responsibility to vote. INEC manages elections. Your vote shapes who leads your local government, state, and the nation.",
        keyPoints: [
          "Register with INEC to get your PVC",
          "Vote in every election — local, state, and federal",
          "Report electoral malpractice to INEC or the police",
        ],
        tip: "Keep your Permanent Voter Card (PVC) safe. It is your single most powerful civic tool.",
      },
      {
        id: "cr-2",
        title: "Paying Taxes",
        duration: "4 min",
        content:
          "Taxes fund roads, schools, hospitals, and security. Every working Nigerian must pay Personal Income Tax through their state's Internal Revenue Service (IRS) and the Federal Inland Revenue Service (FIRS).",
        keyPoints: [
          "Tax evasion is a criminal offence",
          "PAYE (Pay As You Earn) applies to salaried workers",
          "SME owners must file annual tax returns",
        ],
        tip: "Demand a Tax Clearance Certificate from your employer to verify deductions are remitted.",
      },
      {
        id: "cr-3",
        title: "Community Service",
        duration: "3 min",
        content:
          "Active citizenship extends beyond voting. Participating in community development, neighbourhood watch, and town hall meetings helps shape the society you live in.",
        keyPoints: [
          "Join or form a Community Development Association (CDA)",
          "Attend local government town hall meetings",
          "Volunteer with registered NGOs",
        ],
        tip: "Even one hour a week of community service multiplies your impact and builds unity.",
      },
      {
        id: "cr-4",
        title: "Obeying Laws",
        duration: "4 min",
        content:
          "Respect for the rule of law is the foundation of a stable society. Follow traffic rules, environmental laws, and public order regulations. Challenge unjust laws through peaceful and legal means.",
        keyPoints: [
          "Ignorance of the law is no excuse",
          "Use courts to challenge laws, not vigilantism",
          "Encourage others to follow laws through example",
        ],
        tip: "Knowing the laws helps you exercise your rights and fulfil responsibilities simultaneously.",
      },
      {
        id: "cr-5",
        title: "National Youth Service (NYSC)",
        duration: "5 min",
        content:
          "The NYSC scheme was established in 1973 to foster unity and post-war reconciliation. All graduates under 30 are required to serve in a state different from their origin, promoting national integration.",
        keyPoints: [
          "Service is compulsory for eligible graduates",
          "Corps members contribute to community development",
          "Certificates are required for public sector employment",
        ],
        tip: "Embrace your NYSC posting as an opportunity to experience another culture firsthand.",
      },
      {
        id: "cr-6",
        title: "Environmental Responsibility",
        duration: "3 min",
        content:
          "The National Environmental Standards Regulations and Enforcement Agency (NESREA) enforces environmental law. Every citizen has a duty to protect natural resources and prevent pollution.",
        keyPoints: [
          "Dispose of waste responsibly",
          "Illegal dumping attracts fines and prosecution",
          "Plant trees and conserve water in your community",
        ],
        tip: "Report illegal oil bunkering, deforestation, or illegal waste dumping to NESREA.",
      },
    ],
  },
  {
    id: "unity-inclusion",
    title: "Unity & Inclusion",
    icon: Users2,
    color: "bg-green-50 text-[#008751]",
    accent: "#008751",
    modules: [
      {
        id: "ui-1",
        title: "Nigeria's Diverse Cultures",
        duration: "4 min",
        content:
          "Nigeria is home to over 250 ethnic groups and 500+ languages. This diversity — from Yoruba, Igbo, and Hausa to Tiv, Ijaw, Efik, and Kanuri — is Nigeria's greatest strength when celebrated rather than weaponised.",
        keyPoints: [
          "Nigeria has 36 states and the FCT, each with unique cultures",
          "Cultural exchange prevents stereotypes",
          "Every ethnic group has contributed to Nigeria's heritage",
        ],
        tip: "Learn a greeting in one new Nigerian language this week — it will open hearts.",
      },
      {
        id: "ui-2",
        title: "The Value of Multilingualism",
        duration: "3 min",
        content:
          "Beyond English, Hausa, Yoruba, and Igbo serve as regional lingua francas. Embracing multiple languages builds empathy, expands opportunity, and strengthens national cohesion.",
        keyPoints: [
          "Bilingualism improves cognitive flexibility",
          "Learning neighbours' languages builds trust",
          "Pidgin English unites Nigerians across all regions",
        ],
        tip: "Download a free app like Ling or Duolingo to start learning Hausa, Yoruba, or Igbo today.",
      },
      {
        id: "ui-3",
        title: "Inter-ethnic Harmony",
        duration: "5 min",
        content:
          "Nigeria's history includes periods of ethnic tension. Healing comes through honest dialogue, shared economic goals, and celebrating common values — honesty, family, faith, and hard work.",
        keyPoints: [
          "Stereotypes cause harm; question them when you hear them",
          "Inter-ethnic marriages and friendships strengthen the nation",
          "Economic cooperation reduces ethnic suspicion",
        ],
        tip: "When you encounter an ethnic stereotype, respectfully share a counter-example from your experience.",
      },
      {
        id: "ui-4",
        title: "Religious Tolerance",
        duration: "4 min",
        content:
          "Nigeria is almost equally divided between Christians and Muslims, with traditional religions also practised. The constitution guarantees freedom of religion. Respecting others' faith is both a legal and moral obligation.",
        keyPoints: [
          "The state must not adopt an official religion",
          "Religious discrimination is unconstitutional",
          "Interfaith dialogue programmes reduce conflict",
        ],
        tip: "Attend at least one interfaith dialogue event in your community each year.",
      },
      {
        id: "ui-5",
        title: "Gender Equality",
        duration: "4 min",
        content:
          "Women make up nearly half of Nigeria's population yet are underrepresented in governance and the formal economy. The Violence Against Persons Prohibition (VAPP) Act 2015 criminalises gender-based violence nationwide.",
        keyPoints: [
          "Women have equal constitutional rights",
          "VAPP criminalises domestic violence and sexual harassment",
          "Support women-led businesses and candidacies",
        ],
        tip: "Challenge gender bias whenever you encounter it — in the home, workplace, or community.",
      },
      {
        id: "ui-6",
        title: "Youth Empowerment",
        duration: "4 min",
        content:
          "Nigeria has the world's largest youth population by 2030 projections. Empowering youth through education, skills training, and political participation is essential for national development.",
        keyPoints: [
          "Youths can run for office at 25 (Reps) and 30 (Senate)",
          "#NotTooYoungToRun Act lowered age limits",
          "Vocational training and entrepreneurship create jobs",
        ],
        tip: "Register a business with CAC for as little as ₦10,000 and start building economic independence.",
      },
      {
        id: "ui-7",
        title: "Conflict Resolution",
        duration: "5 min",
        content:
          "Conflicts are inevitable in diverse societies. Peaceful resolution through dialogue, mediation, and respect for law prevents escalation into violence. Community peace committees and traditional rulers play key roles.",
        keyPoints: [
          "Listen before responding in any dispute",
          "Involve neutral mediators for community conflicts",
          "Courts and the National Peace Committee provide formal channels",
        ],
        tip: "Practice active listening: summarise the other person's point before making your own.",
      },
    ],
  },
  {
    id: "emergency-services",
    title: "Emergency Services",
    icon: Phone,
    color: "bg-red-50 text-red-600",
    accent: "#EF4444",
    modules: [
      {
        id: "es-1",
        title: "Emergency Numbers in Nigeria",
        duration: "3 min",
        content:
          "Knowing the right number to call can save lives. Key Nigerian emergency contacts include Police (112 / 199), Ambulance (112), Fire Service (112 / 01-7944996), and the National Emergency Management Agency (NEMA).",
        keyPoints: [
          "112 is the universal emergency number (works on all networks)",
          "NEMA handles large-scale disasters",
          "Lagos State Emergency: 767 | Abuja: 112",
        ],
        tip: "Save 112 in your phone contacts as 'Emergency Nigeria' so you can find it quickly under stress.",
      },
      {
        id: "es-2",
        title: "First Aid Basics",
        duration: "5 min",
        content:
          "First aid is the immediate care given to an injured or ill person before professional medical help arrives. Knowing CPR, how to stop bleeding, and how to place someone in the recovery position can mean the difference between life and death.",
        keyPoints: [
          "DRSABCD: Danger, Response, Send, Airway, Breathing, CPR, Defibrillation",
          "For bleeding: apply firm pressure with a clean cloth",
          "For burns: cool under running water for 10 minutes, do NOT use ice",
        ],
        tip: "Enrol in a free Red Cross first aid course available in most Nigerian states.",
      },
      {
        id: "es-3",
        title: "Natural Disaster Response",
        duration: "4 min",
        content:
          "Nigeria faces flooding (especially in the Niger Delta and Benue Valley), drought, and occasional earthquakes. NEMA and State Emergency Management Agencies (SEMAs) coordinate response.",
        keyPoints: [
          "Know your local flood risk area and evacuation routes",
          "Keep a 72-hour emergency kit (water, food, torch, documents)",
          "Register with NEMA for early warning alerts",
        ],
        tip: "Never drive through flooded roads — 30cm of moving water can sweep a car away.",
      },
      {
        id: "es-4",
        title: "Community Safety Networks",
        duration: "4 min",
        content:
          "Community Policing Forums (CPFs), neighbourhood watch groups, and vigilante organisations form the first layer of local security. Cooperation between residents and security agencies reduces crime.",
        keyPoints: [
          "Report suspicious activity to the police, not social media",
          "Community CCTV and lighting deter crime",
          "Know your nearest police station and DPO's name",
        ],
        tip: "Organise a community safety meeting this month — shared awareness is the best alarm system.",
      },
    ],
  },
];

type LearnView = "home" | "category" | "module";

export function LearnTab() {
  const { state, dispatch } = useApp();
  const [view, setView] = useState<LearnView>("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCategory =
    LEARN_DATA.find((c) => c.id === selectedCategoryId) ?? null;
  const selectedModule =
    selectedCategory?.modules.find((m) => m.id === selectedModuleId) ?? null;

  const catProgress = (catId: string) =>
    state.categoryProgress.find((c) => c.id === catId) ?? {
      completed: 0,
      total: 0,
    };

  // "Continue Learning": first incomplete module across all categories
  const continueItems = LEARN_DATA.flatMap((cat) =>
    cat.modules
      .filter((m) => !state.completedModuleIds.includes(m.id))
      .slice(0, 1)
      .map((m) => ({ module: m, category: cat })),
  ).slice(0, 2);

  // Search results
  const searchResults =
    searchQuery.trim().length > 0
      ? LEARN_DATA.flatMap((cat) =>
          cat.modules
            .filter((m) =>
              m.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((m) => ({ module: m, category: cat })),
        )
      : [];

  function openCategory(catId: string) {
    setSelectedCategoryId(catId);
    setView("category");
  }
  function openModule(catId: string, moduleId: string) {
    setSelectedCategoryId(catId);
    setSelectedModuleId(moduleId);
    setView("module");
  }
  function goHome() {
    setView("home");
    setSearchQuery("");
  }
  function goCategory() {
    setView("category");
  }

  const markComplete = () => {
    if (!selectedModule || !selectedCategoryId) return;
    dispatch({
      type: "COMPLETE_MODULE",
      payload: { categoryId: selectedCategoryId, moduleId: selectedModule.id },
    });
  };

  // ── MODULE DETAIL ───────────────────────────────────────────────────────────
  if (view === "module" && selectedModule && selectedCategory) {
    const isDone = state.completedModuleIds.includes(selectedModule.id);
    return (
      <div className="h-full overflow-y-auto pb-20 bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 z-10">
          <button
            onClick={goCategory}
            className="size-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 truncate">
              {selectedCategory.title}
            </p>
            <h2 className="font-semibold text-sm text-gray-900 truncate">
              {selectedModule.title}
            </h2>
          </div>
          {isDone && (
            <span className="text-xs font-medium text-[#008751] bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
              <Check size={12} />
              Done
            </span>
          )}
        </div>
        <div className="px-4 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              {selectedModule.duration} read
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            {selectedModule.content}
          </p>
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Points</h3>
            <div className="space-y-2">
              {selectedModule.keyPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="size-5 rounded-full bg-[#008751] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-4 bg-amber-50 border-amber-200 mb-6">
            <div className="flex items-start gap-2">
              <Star size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">
                  PRO TIP
                </p>
                <p className="text-sm text-amber-900">{selectedModule.tip}</p>
              </div>
            </div>
          </Card>
          {isDone ? (
            <div className="w-full py-3 rounded-xl bg-green-50 border border-green-200 text-center text-[#008751] font-semibold flex items-center justify-center gap-2">
              <Check size={18} /> Module Completed · +10 pts earned
            </div>
          ) : (
            <Button
              onClick={markComplete}
              className="w-full bg-[#008751] hover:bg-[#006d40] text-white py-3 rounded-xl font-semibold"
            >
              Mark as Complete · Earn +10 pts
            </Button>
          )}
        </div>
      </div>
    );
  }

  // ── CATEGORY MODULE LIST ─────────────────────────────────────────────────────
  if (view === "category" && selectedCategory) {
    const cp = catProgress(selectedCategory.id);
    const pct = cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0;
    const Icon = selectedCategory.icon;
    return (
      <div className="h-full overflow-y-auto pb-20 bg-white">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 z-10">
          <button
            onClick={goHome}
            className="size-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="font-bold text-gray-900">{selectedCategory.title}</h2>
        </div>
        <div className="px-4 pt-5">
          <Card className={`p-4 mb-5 ${selectedCategory.color} border-0`}>
            <div className="flex items-center gap-3 mb-3">
              <Icon size={28} />
              <div>
                <p className="font-semibold">
                  {cp.completed}/{cp.total} modules complete
                </p>
                <p className="text-xs opacity-80">
                  {pct}% of this topic mastered
                </p>
              </div>
            </div>
            <Progress value={pct} className="h-2" />
          </Card>
          <div className="space-y-3">
            {selectedCategory.modules.map((mod, i) => {
              const done = state.completedModuleIds.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => openModule(selectedCategory.id, mod.id)}
                  className="w-full text-left"
                >
                  <Card
                    className={`p-4 border ${done ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"} hover:border-[#008751] transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${done ? "bg-[#008751] text-white" : "bg-gray-100 text-gray-600"}`}
                      >
                        {done ? <Check size={14} /> : i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-sm ${done ? "text-[#008751]" : "text-gray-900"}`}
                        >
                          {mod.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {mod.duration} · {done ? "Completed" : "Not started"}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-gray-400 shrink-0"
                      />
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── HOME ────────────────────────────────────────────────────────────────────
  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-gray-900">Learn</h1>
        <span className="text-sm font-medium text-[#008751] bg-green-50 px-3 py-1 rounded-full">
          {state.points} pts
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          placeholder="Search modules..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#008751]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mb-5">
          <h2 className="font-semibold mb-3 text-gray-800">Search Results</h2>
          <div className="space-y-2">
            {searchResults.map(({ module: m, category: cat }) => {
              const done = state.completedModuleIds.includes(m.id);
              return (
                <button
                  key={m.id}
                  onClick={() => openModule(cat.id, m.id)}
                  className="w-full text-left"
                >
                  <Card className="p-3 border border-gray-200 hover:border-[#008751] transition-colors flex items-center gap-3">
                    <div
                      className={`size-7 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-[#008751] text-white" : "bg-gray-100 text-gray-500"}`}
                    >
                      {done ? <Check size={12} /> : <BookOpen size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {m.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {cat.title} · {m.duration}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 shrink-0"
                    />
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Continue Learning */}
      {continueItems.length > 0 && !searchQuery && (
        <div className="mb-5">
          <h2 className="font-semibold mb-3 text-gray-800">
            Continue Learning
          </h2>
          <div className="space-y-3">
            {continueItems.map(({ module: m, category: cat }) => {
              const cp = catProgress(cat.id);
              const pct =
                cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0;
              return (
                <button
                  key={m.id}
                  onClick={() => openModule(cat.id, m.id)}
                  className="w-full text-left"
                >
                  <Card className="p-4 border border-gray-200 hover:border-[#008751] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-sm text-gray-900">
                          {m.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {cat.title} · {m.duration}
                        </p>
                      </div>
                      <ChevronRight
                        size={18}
                        className="text-gray-400 shrink-0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={pct} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium text-[#008751]">
                        {pct}%
                      </span>
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All Topics */}
      {!searchQuery && (
        <div className="mb-4">
          <h2 className="font-semibold mb-3 text-gray-800">All Topics</h2>
          <div className="grid grid-cols-2 gap-3">
            {LEARN_DATA.map((cat) => {
              const Icon = cat.icon;
              const cp = catProgress(cat.id);
              const pct =
                cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => openCategory(cat.id)}
                  className="text-left"
                >
                  <Card className="p-4 border border-gray-200 hover:border-[#008751] transition-colors h-full">
                    <div
                      className={`size-12 rounded-lg ${cat.color} flex items-center justify-center mb-3`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-medium text-sm mb-1 leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {cp.completed}/{cp.total} modules
                    </p>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#008751] rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
