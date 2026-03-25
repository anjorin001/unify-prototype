import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Flag,
  Heart,
  MapPin,
  MessageCircle,
  Plus,
  Send,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

const NIGERIAN_LOCATIONS = [
  "Lagos",
  "Abuja",
  "Kano State",
  "Rivers State",
  "Ogun State",
  "Kaduna",
  "Oyo State",
  "Enugu",
  "Anambra",
  "Delta State",
  "Sokoto",
  "Borno State",
  "Plateau State",
  "Cross River",
  "Edo State",
];

const FEATURED_STORIES = [
  {
    title: "Unity in Action: Cross-Cultural Wedding",
    region: "Port Harcourt",
    emoji: "💍",
  },
  { title: "Youth Bridge-Building Initiative", region: "Ibadan", emoji: "🌉" },
  { title: "Interfaith Dialogue Success", region: "Kaduna", emoji: "🕊️" },
  { title: "Women Across Tribes Forum", region: "Enugu", emoji: "👩‍👩‍👧" },
];

export function UnityTab() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newLocation, setNewLocation] = useState(NIGERIAN_LOCATIONS[0]);

  const handleSubmitPost = () => {
    const trimmed = newContent.trim();
    if (!trimmed) return;
    dispatch({
      type: "ADD_POST",
      payload: { content: trimmed, location: newLocation },
    });
    setNewContent("");
    setNewLocation(NIGERIAN_LOCATIONS[0]);
    setShowForm(false);
  };

  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Unity Forum</h1>
        <p className="text-sm text-gray-600">
          Share stories, celebrate diversity, build bridges
        </p>
      </div>

      {/* Featured Stories Carousel */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">
          Featured Unity Stories
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {FEATURED_STORIES.map((story, index) => (
            <Card
              key={index}
              className="min-w-[220px] p-0 overflow-hidden border border-gray-200 cursor-pointer hover:border-[#008751] transition-colors shrink-0"
            >
              <div className="h-24 bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center text-5xl">
                {story.emoji}
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-[#008751] mb-1">
                  {story.region}
                </p>
                <h3 className="font-semibold text-xs leading-tight">
                  {story.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Share / Post Form */}
      {!showForm ? (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 bg-[#008751] hover:bg-[#006d40] text-white"
        >
          <Plus size={20} className="mr-2" />
          Share Your Unity Story
        </Button>
      ) : (
        <Card className="mb-6 p-4 bg-white border-2 border-[#008751]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Share Your Story</h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="What unity story do you want to share with Nigeria? 🇳🇬"
            rows={4}
            maxLength={280}
            className="w-full text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-[#008751] placeholder-gray-400"
          />
          <div className="flex items-center justify-between mt-1 mb-3">
            <span className="text-xs text-gray-400">
              {newContent.length}/280
            </span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-[#008751] shrink-0" />
            <select
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#008751]"
            >
              {NIGERIAN_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleSubmitPost}
            disabled={!newContent.trim()}
            className="w-full bg-[#008751] hover:bg-[#006d40] text-white disabled:bg-gray-300"
          >
            <Send size={16} className="mr-2" /> Post Story
          </Button>
        </Card>
      )}

      {/* Community Posts Feed */}
      <div className="space-y-4">
        {state.posts.map((post) => (
          <Card
            key={post.id}
            className={`p-4 bg-white border ${post.isOwn ? "border-[#008751]/30" : "border-gray-200"}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center text-white font-bold shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm">{post.author}</p>
                  {post.isOwn && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-[#008751] rounded-full font-medium">
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  {post.location} • {post.time}
                </p>
              </div>
              {post.isOwn && (
                <button
                  onClick={() =>
                    dispatch({ type: "DELETE_POST", payload: post.id })
                  }
                  className="text-gray-300 hover:text-red-400 transition-colors p-1"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-800 mb-3 leading-relaxed">
              {post.content}
            </p>
            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_REACTION", payload: post.id })
                }
                className={`flex items-center gap-1.5 text-sm transition-colors ${post.userReacted ? "text-red-500" : "text-gray-500 hover:text-red-400"}`}
              >
                <Heart
                  size={18}
                  fill={post.userReacted ? "currentColor" : "none"}
                />
                <span className="font-medium">{post.reactions.hearts}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#008751] transition-colors">
                <MessageCircle size={18} />
                <span className="font-medium">{post.comments}</span>
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "TOGGLE_FLAG", payload: post.id })
                }
                className={`flex items-center gap-1.5 text-sm transition-colors ${post.userFlagged ? "text-[#008751]" : "text-gray-500 hover:text-[#008751]"}`}
              >
                <Flag
                  size={18}
                  fill={post.userFlagged ? "currentColor" : "none"}
                />
                <span className="font-medium">{post.reactions.flags}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-sm mb-2 text-blue-900">
          💙 Community Guidelines
        </h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          This is a space for respectful dialogue and celebration of Nigeria's
          diversity. Posts are moderated to ensure positive and constructive
          conversations.
        </p>
      </Card>

      {/* Trending Topics */}
      <Card className="mt-4 mb-6 p-4 bg-white border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-[#008751]" />
          <h3 className="font-semibold text-sm">Trending Unity Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "#CulturalExchange",
            "#OneNigeria",
            "#UnityInDiversity",
            "#TogetherWeStand",
            "#NaijaProud",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-green-50 text-[#008751] text-xs font-medium rounded-full cursor-pointer hover:bg-green-100 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
