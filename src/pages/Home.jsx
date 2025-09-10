import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { User } from "@/entities/User";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

import { Plus, Zap, Camera, Search, Droplet, Moon, Smile, TrendingUp, Award, Sun, Lightbulb, Heart, Target } from "lucide-react";

import { createPageUrl } from "@/utils";
import CalorieProgressBar from "../components/tracking/CalorieProgressBar";
import RasaBalanceSpider from "../components/charts/RasaBalanceSpider";
import DoshaAlignmentRing from "../components/charts/DoshaAlignmentRing";
import WeeklyTrendChart from "../components/charts/WeeklyTrendChart";
import WaterTracker from "../components/tracking/WaterTracker";
import QuickAddMeal from "../components/meal/QuickAddMeal";
import { HealthScoreCard } from "@/components/charts/HealthScoreChart";
import { Stethoscope } from "lucide-react";
export default function Home() {
  const navigate = useNavigate();
  const { authUser, user: dbUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // backend user
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const [todayStats, setTodayStats] = useState({
    calories: 1250,
    targetCalories: 1800,
    protein: 45,
    targetProtein: 80,
    carbs: 155,
    targetCarbs: 200,
    fat: 38,
    targetFat: 60
  });

  const [waterIntake, setWaterIntake] = useState(6);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [moodLevel, setMoodLevel] = useState([4]);
  const [agniLevel, setAgniLevel] = useState([3]);
  const [dailyTip, setDailyTip] = useState("Avoid curd at night, try buttermilk instead");

  const rasaData = [
    { rasa: 'Sweet', value: 35, color: '#22c55e', optimal: 30 },
    { rasa: 'Sour', value: 15, color: '#eab308', optimal: 15 },
    { rasa: 'Salty', value: 12, color: '#f97316', optimal: 10 },
    { rasa: 'Pungent', value: 18, color: '#ef4444', optimal: 15 },
    { rasa: 'Bitter', value: 12, color: '#8b5cf6', optimal: 15 },
    { rasa: 'Astringent', value: 8, color: '#06b6d4', optimal: 15 }
  ];

  const doshaAlignment = {
    vata: { current: 40, target: 35, status: 'balanced' },
    pitta: { current: 25, target: 30, status: 'low' },
    kapha: { current: 35, target: 35, status: 'perfect' }
  };

  const weeklyData = [
    { day: 'Mon', calories: 1650, doshaScore: 78 },
    { day: 'Tue', calories: 1720, doshaScore: 82 },
    { day: 'Wed', calories: 1580, doshaScore: 76 },
    { day: 'Thu', calories: 1680, doshaScore: 85 },
    { day: 'Fri', calories: 1750, doshaScore: 88 },
    { day: 'Sat', calories: 1620, doshaScore: 80 },
    { day: 'Sun', calories: 1250, doshaScore: 72 }
  ];

  const healthScore = 85;
  const streaks = {
    hydration: 7,
    compliance: 12,
    agni: 5
  };

  // Fetch DB user if not already
  useEffect(() => {
    const fetchUser = async () => {
      if (authUser && !dbUser) {
        try {
          const userData = await User.me();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else if (dbUser) {
        setUser(dbUser);
      }
      setLoading(false);
    };
    fetchUser();
  }, [authUser, dbUser]);

  const getFirstName = () => {
    if (authUser?.displayName) return authUser.displayName.split(' ')[0];
    if (user?.full_name) return user.full_name.split(' ')[0];
    if (authUser?.email) {
      const emailName = authUser.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return "there";
  };

  const handleWaterAdd = () => {
    if (waterIntake < 8) setWaterIntake(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6 animate-pulse pb-24">
        <div className="h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl"></div>
        <div className="h-24 bg-green-100 rounded-2xl"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-48 bg-green-100 rounded-2xl"></div>
          <div className="h-48 bg-green-100 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!authUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-4 space-y-6 pb-24">
      {/* Header Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-effect rounded-3xl p-6 border-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-green-900 mb-1">{`Good Morning, ${getFirstName()}! 🌅`}</h1>
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-green-700 font-medium">{dailyTip}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-800">{healthScore}</div>
            <div className="text-xs text-green-600">Health Score</div>
          </div>
        </div>
      </motion.div>

      {/* Diet Controls */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
        <Link to={createPageUrl("Planner")} className="col-span-2">
          <Button className="w-full h-16 gradient-glow text-white font-bold rounded-2xl text-lg shadow-lg hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 mr-2" /> Generate Diet
          </Button>
        </Link>
        <Button onClick={() => setShowQuickAdd(true)} className="h-16 bg-white/90 hover:bg-white text-green-700 border-2 border-green-200 rounded-2xl font-semibold shadow-md hover:scale-105 transition-transform">
          <Plus className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Today's Plan Button */}
      <Link to={createPageUrl("Planner")}>
        <Button variant="outline" className="w-full h-12 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-2xl font-semibold">
          View Today's Plan
        </Button>
      </Link>

      {/* Nutrition Progress */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
        <CalorieProgressBar data={todayStats} />
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-effect border-0 rounded-2xl h-64">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-green-900 flex items-center">
                <Target className="w-4 h-4 mr-2" /> Rasa Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RasaBalanceSpider data={rasaData} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-effect border-0 rounded-2xl h-64">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-green-900 flex items-center">
                <Heart className="w-4 h-4 mr-2" /> Dosha Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DoshaAlignmentRing data={doshaAlignment} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="glass-effect border-0 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-green-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" /> 7-Day Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <WeeklyTrendChart data={weeklyData} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Wellness Grid */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
          <WaterTracker current={waterIntake} target={8} onAdd={handleWaterAdd} />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
          <Card className="glass-effect border-0 rounded-2xl h-32">
            <CardContent className="p-4 text-center">
              <Moon className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
              <div className="text-2xl font-bold text-green-900">{sleepHours}h</div>
              <div className="text-xs text-green-700">Sleep Last Night</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Mood & Agni */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-effect border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Smile className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-semibold text-green-900">Mood Today</span>
            </div>
            <Slider value={moodLevel} onValueChange={setMoodLevel} max={5} min={1} step={1} className="mb-2" />
            <div className="flex justify-between text-xs text-green-600">
              <span>😔</span><span>😐</span><span>😊</span><span>😄</span><span>🤩</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-0 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <Sun className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm font-semibold text-green-900">Agni (Digestion)</span>
            </div>
            <Slider value={agniLevel} onValueChange={setAgniLevel} max={5} min={1} step={1} className="mb-2" />
            <div className="flex justify-between text-xs text-green-600">
              <span>Weak</span><span>Low</span><span>Good</span><span>Strong</span><span>Perfect</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Score */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <HealthScoreCard score={healthScore} streaks={streaks} />
      </motion.div>

      {/* Quick Tools */}
      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-2xl font-semibold shadow-sm">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search Food</span>
        </Button>
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-2xl font-semibold shadow-sm">
          <Camera className="w-5 h-5 mb-1" />
          <span className="text-xs">Scan Food</span>
        </Button>
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-2xl font-semibold shadow-sm">
          <Award className="w-5 h-5 mb-1" />
          <span className="text-xs">Achievements</span>
        </Button>
      </div>

      {/* Daily Tip */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="glass-effect rounded-2xl p-6 border-0">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center float-animation">
            <span className="text-white font-bold">🌿</span>
          </div>
          <div>
            <h3 className="font-bold text-green-900 mb-1">Ayurveda Tip of the Day</h3>
            <p className="text-sm text-green-700 leading-relaxed">
              "Eat your largest meal at lunch when your digestive fire (Agni) is strongest. This supports optimal digestion and prevents accumulation of toxins."
            </p>
          </div>
        </div>
      </motion.div>
      <div className="mt-6">
        <Link to="/consultation">
          <Button
  onClick={() => navigate("/consultation")}
  className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl py-4 px-6 font-semibold shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
>
  <Stethoscope className="w-5 h-5" />
  Book a Doctor Consultation
</Button>
        </Link>
      </div>

      {/* Quick Add Meal Modal */}
      <AnimatePresence>
        {showQuickAdd && <QuickAddMeal onClose={() => setShowQuickAdd(false)} />}
      </AnimatePresence>
    </div>
  );
}
