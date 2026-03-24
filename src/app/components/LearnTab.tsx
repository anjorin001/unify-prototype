import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { BookOpen, Search, Globe, ChevronRight, Shield, Scale, Users2, Phone } from "lucide-react";


import { useState } from "react";

export function LearnTab() {
  const [language, setLanguage] = useState("en");

  const categories = [
    {
      id: 1,
      title: "Know Your Rights",
      icon: Scale,
      color: "bg-blue-50 text-blue-600",
      modules: 8,
      completed: 5
    },
    {
      id: 2,
      title: "Civic Responsibilities",
      icon: Shield,
      color: "bg-purple-50 text-purple-600",
      modules: 6,
      completed: 3
    },
    {
      id: 3,
      title: "Unity & Inclusion",
      icon: Users2,
      color: "bg-green-50 text-[#008751]",
      modules: 7,
      completed: 4
    },
    {
      id: 4,
      title: "Emergency Services",
      icon: Phone,
      color: "bg-red-50 text-red-600",
      modules: 4,
      completed: 2
    }
  ];

  const continueModules = [
    {
      title: "Freedom of Expression",
      category: "Know Your Rights",
      progress: 65,
      color: "#008751"
    },
    {
      title: "Cultural Diversity",
      category: "Unity & Inclusion",
      progress: 40,
      color: "#008751"
    }
  ];

  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-white">
      {/* Header with Language Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Learn</h1>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px] border-[#008751]">
              <Globe size={16} className="text-[#008751] mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇬🇧 English</SelectItem>
              <SelectItem value="ha">🇳🇬 Hausa</SelectItem>
              <SelectItem value="yo">🇳🇬 Yoruba</SelectItem>
              <SelectItem value="ig">🇳🇬 Igbo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search topics..." 
            className="pl-10 border-gray-300"
          />
        </div>
      </div>

      {/* Continue Learning Section */}
      {continueModules.length > 0 && (
        <div className="mb-6">
          <h2 className="font-semibold mb-3 text-gray-800">Continue Learning</h2>
          <div className="space-y-3">
            {continueModules.map((module, index) => (
              <Card key={index} className="p-4 bg-white border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-sm">{module.title}</h3>
                    <p className="text-xs text-gray-500">{module.category}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#008751] rounded-full transition-all"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-[#008751]">{module.progress}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Learning Categories */}
      <div className="mb-4">
        <h2 className="font-semibold mb-3 text-gray-800">All Topics</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const progressPercent = (category.completed / category.modules) * 100;
            
            return (
              <Card 
                key={category.id} 
                className="p-4 bg-white border border-gray-200 cursor-pointer hover:border-[#008751] transition-colors"
              >
                <div className={`size-12 rounded-lg ${category.color} flex items-center justify-center mb-3`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-medium text-sm mb-2 leading-tight">{category.title}</h3>
                <p className="text-xs text-gray-500 mb-2">
                  {category.completed}/{category.modules} modules
                </p>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#008751] rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Featured Lesson */}
      <Card className="mb-6 p-5 bg-gradient-to-br from-[#008751] to-[#006d40] text-white border-0">
        <div className="flex items-start gap-3">
          <BookOpen size={24} className="flex-shrink-0 mt-1" />
          <div>
            <p className="text-xs font-medium mb-1 opacity-90">FEATURED LESSON</p>
            <h3 className="font-semibold mb-2">Understanding Nigerian Democracy</h3>
            <p className="text-sm mb-4 opacity-90">
              Learn about the three arms of government and how they work together to serve the nation.
            </p>
            <Button variant="secondary" size="sm" className="bg-white text-[#008751] hover:bg-gray-100">
              Start Lesson
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Access Resources */}
      <div className="mb-4">
        <h2 className="font-semibold mb-3 text-gray-800">Quick Resources</h2>
        <div className="space-y-2">
          <Card className="p-3 bg-white border border-gray-200 flex items-center justify-between cursor-pointer hover:border-[#008751] transition-colors">
            <span className="text-sm font-medium">Nigerian Constitution Guide</span>
            <ChevronRight size={18} className="text-gray-400" />
          </Card>
          <Card className="p-3 bg-white border border-gray-200 flex items-center justify-between cursor-pointer hover:border-[#008751] transition-colors">
            <span className="text-sm font-medium">Emergency Hotlines</span>
            <ChevronRight size={18} className="text-gray-400" />
          </Card>
          <Card className="p-3 bg-white border border-gray-200 flex items-center justify-between cursor-pointer hover:border-[#008751] transition-colors">
            <span className="text-sm font-medium">Know Your Rights FAQ</span>
            <ChevronRight size={18} className="text-gray-400" />
          </Card>
        </div>
      </div>
    </div>
  );
}
