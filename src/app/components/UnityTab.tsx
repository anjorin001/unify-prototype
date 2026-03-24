import { Heart, MessageCircle, Flag, Plus, TrendingUp } from "lucide-react";

import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  author: string;
  location: string;
  time: string;
  content: string;
  reactions: {
    hearts: number;
    flags: number;
  };
  comments: number;
  userReacted: boolean;
}

export function UnityTab() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Amina K.",
      location: "Kano State",
      time: "2 hours ago",
      content: "Today I helped my Igbo neighbor understand our Hausa culture, and she taught me about Igbo cuisine. This is what unity looks like! 🤝",
      reactions: { hearts: 45, flags: 12 },
      comments: 8,
      userReacted: false
    },
    {
      id: 2,
      author: "Chidi O.",
      location: "Lagos",
      time: "5 hours ago",
      content: "Witnessed a beautiful moment today - Christians and Muslims celebrating together at a community event. Nigeria's diversity is our strength! 🇳🇬",
      reactions: { hearts: 89, flags: 23 },
      comments: 15,
      userReacted: false
    },
    {
      id: 3,
      author: "Fatima B.",
      location: "Abuja",
      time: "1 day ago",
      content: "Started a cultural exchange program in my neighborhood. We're learning each other's languages and traditions. Unity begins with understanding! 💚",
      reactions: { hearts: 67, flags: 18 },
      comments: 11,
      userReacted: false
    }
  ]);

  const featuredStories = [
    {
      title: "Unity in Action: Cross-Cultural Wedding",
      region: "Port Harcourt",
      image: "wedding ceremony"
    },
    {
      title: "Youth Bridge-Building Initiative",
      region: "Ibadan",
      image: "diverse group"
    },
    {
      title: "Interfaith Dialogue Success",
      region: "Kaduna",
      image: "community gathering"
    }
  ];

  const handleReaction = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          userReacted: !post.userReacted,
          reactions: {
            ...post.reactions,
            hearts: post.userReacted ? post.reactions.hearts - 1 : post.reactions.hearts + 1
          }
        };
      }
      return post;
    }));
  };

  return (
    <div className="h-full overflow-y-auto pb-20 px-4 pt-6 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Unity Forum</h1>
        <p className="text-sm text-gray-600">Share stories, celebrate diversity, build bridges</p>
      </div>

      {/* Featured Stories Carousel */}
      <div className="mb-6">
        <h2 className="font-semibold mb-3 text-gray-800">Featured Unity Stories</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {featuredStories.map((story, index) => (
            <Card
              key={index}
              className="min-w-[280px] p-0 overflow-hidden border border-gray-200 cursor-pointer hover:border-[#008751] transition-colors"
            >
              <div className="h-32 bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center">
                <ImageWithFallback
                  src={`https://source.unsplash.com/400x200/?${encodeURIComponent(story.image)},nigeria`}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-[#008751] mb-1">{story.region}</p>
                <h3 className="font-semibold text-sm leading-tight">{story.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Share Button */}
      <Button className="w-full mb-6 bg-[#008751] hover:bg-[#006d40] text-white">
        <Plus size={20} className="mr-2" />
        Share Your Unity Story
      </Button>

      {/* Community Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 bg-white border border-gray-200">
            {/* Post Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-[#008751] to-[#006d40] flex items-center justify-center text-white font-bold flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{post.author}</p>
                <p className="text-xs text-gray-500">{post.location} • {post.time}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-sm text-gray-800 mb-3 leading-relaxed">{post.content}</p>

            {/* Post Actions */}
            <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleReaction(post.id)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  post.userReacted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={post.userReacted ? "currentColor" : "none"} />
                <span className="font-medium">{post.reactions.hearts}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#008751] transition-colors">
                <MessageCircle size={18} />
                <span className="font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#008751] transition-colors">
                <Flag size={18} />
                <span className="font-medium">{post.reactions.flags}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Community Guidelines Card */}
      <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-sm mb-2 text-blue-900">💙 Community Guidelines</h3>
        <p className="text-xs text-blue-700 leading-relaxed">
          This is a space for respectful dialogue and celebration of Nigeria's diversity. 
          Posts are moderated to ensure positive and constructive conversations.
        </p>
      </Card>

      {/* Trending Topics */}
      <Card className="mt-4 mb-6 p-4 bg-white border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-[#008751]" />
          <h3 className="font-semibold text-sm">Trending Unity Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-green-50 text-[#008751] text-xs font-medium rounded-full">
            #CulturalExchange
          </span>
          <span className="px-3 py-1 bg-green-50 text-[#008751] text-xs font-medium rounded-full">
            #OneNigeria
          </span>
          <span className="px-3 py-1 bg-green-50 text-[#008751] text-xs font-medium rounded-full">
            #UnityInDiversity
          </span>
          <span className="px-3 py-1 bg-green-50 text-[#008751] text-xs font-medium rounded-full">
            #TogetherWeStand
          </span>
        </div>
      </Card>
    </div>
  );
}
