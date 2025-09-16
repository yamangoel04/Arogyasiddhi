import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../context/AuthContext";
import { User } from "@/entities/User";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Heart, 
  Activity, 
  Droplets, 
  Moon, 
  TrendingUp, 
  Brain, 
  Leaf, 
  Plus, 
  Zap, 
  Camera, 
  Search, 
  Smile, 
  Sun, 
  Lightbulb, 
  Target,
  Award,
  Stethoscope
} from "lucide-react";

import { createPageUrl } from "@/utils";
import QuickAddMeal from "../components/meal/QuickAddMeal";

export default function Home() {
  const navigate = useNavigate();
  const { authUser, user: dbUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  // Health data state
  const [healthData, setHealthData] = useState({
    bmi: 24.5,
    weight: 70,
    waterIntake: 6,
    sleep: 7.5,
    steps: 8500,
    calories: 1250,
    targetCalories: 1800,
  });

  const [dailyTip] = useState("Avoid curd at night, try buttermilk instead");
  const healthScore = 85;

  // Chart data
  const weightData = [
    { date: "Jan", weight: 72 },
    { date: "Feb", weight: 71.5 },
    { date: "Mar", weight: 71 },
    { date: "Apr", weight: 70.5 },
    { date: "May", weight: 70 },
  ];

  // Weekly tracking data
  const weeklyWeightData = [
    { day: "Mon", weight: 70.2, bmi: 24.3 },
    { day: "Tue", weight: 70.1, bmi: 24.2 },
    { day: "Wed", weight: 70.0, bmi: 24.2 },
    { day: "Thu", weight: 69.8, bmi: 24.1 },
    { day: "Fri", weight: 69.9, bmi: 24.1 },
    { day: "Sat", weight: 70.0, bmi: 24.2 },
    { day: "Sun", weight: 70.1, bmi: 24.2 },
  ];

  const weeklySleepData = [
    { day: "Mon", sleep: 7.5, quality: 85 },
    { day: "Tue", sleep: 8.0, quality: 90 },
    { day: "Wed", sleep: 6.5, quality: 70 },
    { day: "Thu", sleep: 7.8, quality: 88 },
    { day: "Fri", sleep: 7.2, quality: 82 },
    { day: "Sat", sleep: 8.5, quality: 95 },
    { day: "Sun", sleep: 7.5, quality: 85 },
  ];

  const weeklyWaterData = [
    { day: "Mon", water: 7, target: 8 },
    { day: "Tue", water: 8, target: 8 },
    { day: "Wed", water: 6, target: 8 },
    { day: "Thu", water: 9, target: 8 },
    { day: "Fri", water: 7, target: 8 },
    { day: "Sat", water: 8, target: 8 },
    { day: "Sun", water: 6, target: 8 },
  ];

  const doshaData = [
    { name: "Vata", value: 35, color: "#06b6d4" },
    { name: "Pitta", value: 40, color: "#f97316" },
    { name: "Kapha", value: 25, color: "#16a34a" },
  ];

  const rasaData = [
    { name: "Sweet", value: 20, color: "#8b5cf6" },
    { name: "Sour", value: 15, color: "#f59e0b" },
    { name: "Salty", value: 10, color: "#ef4444" },
    { name: "Bitter", value: 25, color: "#10b981" },
    { name: "Pungent", value: 20, color: "#f97316" },
    { name: "Astringent", value: 10, color: "#6b7280" },
  ];

  // Fetch user data
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
    if (healthData.waterIntake < 8) {
      setHealthData(prev => ({...prev, waterIntake: prev.waterIntake + 1}));
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6 animate-pulse">
        <div className="h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl"></div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-green-100 rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-green-100 rounded-xl"></div>
          <div className="h-64 bg-green-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!authUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="space-y-6 p-4 md:p-6 pb-24">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome Back, {getFirstName()}! 🌅
          </h2>
          <div className="flex items-center space-x-2 mt-1">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <p className="text-sm md:text-base text-muted-foreground">{dailyTip}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={createPageUrl("Planner")}>
            <Button className="bg-green-600 hover:bg-green-700">
              <Zap className="h-4 w-4 mr-2" />
              Generate Diet
            </Button>
          </Link>
          <Button 
            onClick={() => setShowQuickAdd(true)}
            variant="outline"
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Health Metrics Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4"
      >
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              BMI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{healthData.bmi}</div>
            <p className="text-xs text-green-600">Normal</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Weight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{healthData.weight}kg</div>
            <p className="text-xs text-blue-600">-2kg this month</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-cyan-600" />
              Water
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{healthData.waterIntake}/8</div>
            <p className="text-xs text-cyan-600">glasses today</p>
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-2 h-6 text-xs"
              onClick={handleWaterAdd}
            >
              + Add
            </Button>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Moon className="h-4 w-4 text-purple-600" />
              Sleep
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{healthData.sleep}h</div>
            <p className="text-xs text-purple-600">last night</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-orange-600" />
              Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{healthData.steps.toLocaleString()}</div>
            <p className="text-xs text-orange-600">today</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4"
      >
        <Link to={createPageUrl("Planner")}>
          <Button variant="outline" className="w-full h-12 border-2 border-green-200 text-green-700 hover:bg-green-50">
            View Today's Plan
          </Button>
        </Link>
        <Link to="/consultation">
          <Button className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
            <Stethoscope className="w-4 h-4 mr-2" />
            Consult Doctor
          </Button>
        </Link>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Weight Progress */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Monthly Weight Progress
              </CardTitle>
              <CardDescription>Weight journey over the last 5 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dosha Balance */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Dosha Balance
              </CardTitle>
              <CardDescription>Your current constitutional balance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie 
                    data={doshaData} 
                    cx="50%" 
                    cy="50%" 
                    innerRadius={40} 
                    outerRadius={80} 
                    dataKey="value"
                  >
                    {doshaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {doshaData.map((dosha) => (
                  <div key={dosha.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dosha.color }} />
                    <span className="text-sm">{dosha.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Weight & BMI */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Weekly Weight & BMI
              </CardTitle>
              <CardDescription>Last 7 days tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklyWeightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="weight" orientation="left" />
                  <YAxis yAxisId="bmi" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="weight"
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Weight (kg)"
                  />
                  <Line 
                    yAxisId="bmi"
                    type="monotone" 
                    dataKey="bmi" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="BMI"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Sleep Analysis */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-600" />
                Weekly Sleep Analysis
              </CardTitle>
              <CardDescription>Sleep hours and quality tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weeklySleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="sleep" orientation="left" />
                  <YAxis yAxisId="quality" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="sleep"
                    type="monotone" 
                    dataKey="sleep" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Sleep (hours)"
                  />
                  <Line 
                    yAxisId="quality"
                    type="monotone" 
                    dataKey="quality" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Quality %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly Water Intake */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-600" />
              Weekly Water Intake
            </CardTitle>
            <CardDescription>Daily water consumption vs target</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyWaterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="water" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  name="Water Intake (glasses)"
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  strokeDasharray="10 5"
                  name="Target (glasses)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-cyan-500 rounded"></div>
                <span className="text-sm">Actual Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-red-500 rounded border-dashed border-2 border-red-500"></div>
                <span className="text-sm">Daily Target</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rasa Balance & Daily Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rasa Balance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Rasa Balance
              </CardTitle>
              <CardDescription>Six taste balance in your diet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rasaData.map((rasa) => (
                  <div key={rasa.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{rasa.name}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={rasa.value * 4} className="w-20" />
                      <span className="text-sm text-muted-foreground">{rasa.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Goals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
              <CardDescription>Track your wellness targets for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-cyan-600" />
                    <span className="text-sm">Water Intake</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(healthData.waterIntake / 8) * 100} className="w-20" />
                    <span className="text-sm">{healthData.waterIntake}/8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Sleep Goal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(healthData.sleep / 8) * 100} className="w-20" />
                    <span className="text-sm">{healthData.sleep}/8h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Steps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(healthData.steps / 10000) * 100} className="w-20" />
                    <span className="text-sm">{(healthData.steps / 1000).toFixed(1)}k/10k</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Calories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={(healthData.calories / healthData.targetCalories) * 100} className="w-20" />
                    <span className="text-sm">{healthData.calories}/{healthData.targetCalories}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">BMI Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-20" />
                    <span className="text-sm">Normal</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Health Score Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Health Score
              </div>
              <div className="text-3xl font-bold text-green-700">{healthScore}</div>
            </CardTitle>
            <CardDescription>Your overall wellness rating</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <div className="text-center">
                <div className="font-semibold text-cyan-600">7 days</div>
                <div className="text-muted-foreground">Hydration</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">12 days</div>
                <div className="text-muted-foreground">Diet Plan</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-orange-600">5 days</div>
                <div className="text-muted-foreground">Exercise</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Tools */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-3 gap-3"
      >
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl font-semibold shadow-sm flex flex-col">
          <Search className="w-5 h-5 mb-1" />
          <span className="text-xs">Search Food</span>
        </Button>
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl font-semibold shadow-sm flex flex-col">
          <Camera className="w-5 h-5 mb-1" />
          <span className="text-xs">Scan Food</span>
        </Button>
        <Button variant="outline" className="h-16 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl font-semibold shadow-sm flex flex-col">
          <Award className="w-5 h-5 mb-1" />
          <span className="text-xs">Achievements</span>
        </Button>
      </motion.div>

      {/* Daily Tip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🌿</span>
              </div>
              <div>
                <h3 className="font-bold text-amber-900 mb-1">Ayurveda Tip of the Day</h3>
                <p className="text-sm text-amber-800 leading-relaxed">
                  "Eat your largest meal at lunch when your digestive fire (Agni) is strongest. This supports optimal digestion and prevents accumulation of toxins."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Add Meal Modal */}
      <AnimatePresence>
        {showQuickAdd && <QuickAddMeal onClose={() => setShowQuickAdd(false)} />}
      </AnimatePresence>
    </div>
  );
}