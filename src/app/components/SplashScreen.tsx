import { useNavigate } from "react-router-dom";
import { Shield, BookOpen, Users, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Shield,
    title: "Stay Safe",
    description:
      "Trigger emergency alerts instantly and connect with nearby responders even when offline.",
  },
  {
    icon: BookOpen,
    title: "Learn Your Rights",
    description:
      "Access civic education in your language — Know Your Rights, Civic Duties and more.",
  },
  {
    icon: Brain,
    title: "Daily Quiz",
    description:
      "Sharpen your civic knowledge with bite-sized daily quizzes and earn Unity Points.",
  },
  {
    icon: Users,
    title: "Unity",
    description:
      "Connect with your community, share stories and build a stronger Nigeria together.",
  },
];

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white max-w-md mx-auto px-6 py-10">
      {/* Logo / Brand */}
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="size-16 rounded-2xl bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center shadow-lg">
          <Shield className="text-white" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Unify</h1>
        <p className="text-sm text-gray-500 text-center">
          Your civic companion for a united Nigeria
        </p>
      </div>

      {/* Feature list */}
      <div className="w-full flex flex-col gap-5 my-8">
        {steps.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="size-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-[#008751]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="w-full flex flex-col gap-3">
        <Button
          onClick={() => navigate("/")}
          className="w-full bg-[#008751] hover:bg-[#006d40] text-white font-semibold h-12 rounded-xl flex items-center justify-center gap-2"
        >
          Get Started <ArrowRight size={18} />
        </Button>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

