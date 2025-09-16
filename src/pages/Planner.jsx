import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Zap,
  Calendar,
  Plus,
  Settings,
  TrendingUp,
  Clock,
  Replace,
  Droplet,
  Smile,
  Trophy,
} from "lucide-react";
import Switch from "@/components/ui/Switch";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Planner() {
  const [viewMode, setViewMode] = useState("weekly"); // 'weekly', 'generate'
  const [reminders, setReminders] = useState({
    breakfast: true,
    lunch: false,
    dinner: true,
  });

  // Mock progress chart
  const progressData = [
    { day: "Mon", score: 70 },
    { day: "Tue", score: 80 },
    { day: "Wed", score: 85 },
    { day: "Thu", score: 75 },
    { day: "Fri", score: 90 },
    { day: "Sat", score: 88 },
    { day: "Sun", score: 92 },
  ];

  const weeklyMeals = {
    Monday: {
      breakfast: { name: "Oats with fruits", calories: 320, score: 88 },
      lunch: { name: "Dal rice with vegetables", calories: 450, score: 92 },
      dinner: { name: "Khichdi with ghee", calories: 380, score: 85 },
    },
    Tuesday: {
      breakfast: { name: "Poha with peanuts", calories: 300, score: 86 },
      lunch: { name: "Roti with sabzi", calories: 420, score: 90 },
      dinner: { name: "Moong dal soup", calories: 250, score: 88 },
    },
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <style>
        {`
          .gradient-bg {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          }
          .meal-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(34, 197, 94, 0.2);
            transition: transform 0.2s;
          }
          .meal-card:hover {
            transform: scale(1.01);
          }
        `}
      </style>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-900">Weekly Planner</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode("generate")}
            className="border-green-300 text-green-700"
          >
            <Zap className="w-4 h-4 mr-1" />
            Generate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-green-300 text-green-700"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button className="h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl">
          <Zap className="w-5 h-5 mr-2" />
          Generate Plan
        </Button>
        <Button
          variant="outline"
          className="h-14 border-2 border-green-300 text-green-700 font-semibold rounded-2xl"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Edit Plan
        </Button>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="gradient-bg border-0 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Mood & Energy Tracker */}
      <Card className="gradient-bg border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <Smile className="w-5 h-5 mr-2 text-yellow-500" />
            Daily Mood & Energy
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          {["😴", "🙂", "😃", "🔥"].map((emoji, i) => (
            <Button
              key={i}
              size="sm"
              className="flex-1 bg-white rounded-xl border border-green-200"
            >
              {emoji}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        {Object.entries(weeklyMeals).map(([day, meals]) => (
          <Card
            key={day}
            className="meal-card border-0 rounded-2xl shadow-sm"
          >
            <CardHeader className="pb-2 flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-green-900">
                {day}
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">
                {Object.values(meals).reduce(
                  (sum, meal) => sum + meal.calories,
                  0
                )}{" "}
                kcal
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(meals).map(([mealType, meal]) => (
                <div
                  key={mealType}
                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-green-100"
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold text-green-900 capitalize">
                        {mealType}
                      </span>
                      <Badge
                        className={`text-xs ${getScoreColor(meal.score)}`}
                      >
                        {meal.score}/100
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700">{meal.name}</p>
                    <p className="text-xs text-green-600">{meal.calories} kcal</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-green-600"
                    >
                      <Replace className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-green-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hydration & Reminders */}
      <Card className="gradient-bg border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <Droplet className="w-5 h-5 mr-2 text-blue-500" />
            Hydration & Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { meal: "Breakfast", time: "8:00 AM", key: "breakfast" },
            { meal: "Lunch", time: "1:00 PM", key: "lunch" },
            { meal: "Dinner", time: "7:30 PM", key: "dinner" },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between bg-white p-3 rounded-xl border border-green-100"
            >
              <div>
                <p className="font-medium text-green-900">{item.meal}</p>
                <p className="text-sm text-green-600">{item.time}</p>
              </div>
              <Switch
                checked={reminders[item.key]}
                onCheckedChange={(val) =>
                  setReminders((prev) => ({ ...prev, [item.key]: val }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="gradient-bg border-0 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge className="bg-yellow-100 text-yellow-800">🥇 7-Day Streak</Badge>
          <Badge className="bg-purple-100 text-purple-800">🔥 100% Compliance</Badge>
          <Badge className="bg-pink-100 text-pink-800">🧘 Meditation Streak</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
