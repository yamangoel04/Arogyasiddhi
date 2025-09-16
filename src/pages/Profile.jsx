"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import Switch from "@/components/ui/Switch"
import {
  Edit,
  TrendingUp,
  LogOut,
  Stethoscope,
  CheckCircle2,
  Bell,
  Clock,
  Droplet,
  Target,
  Award,
  Zap,
  Activity,
  Plus,
  Minus,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { createPageUrl } from "@/utils"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Editable profile states
  const [isEditing, setIsEditing] = useState(false)
  const [age, setAge] = useState(25)
  const [weight, setWeight] = useState(72)
  const [height, setHeight] = useState(160)

  // Switch states
  const [notifications, setNotifications] = useState(true)
  const [reminders, setReminders] = useState(false)

  const [dailyGoal, setDailyGoal] = useState(8)
  const [currentStreak, setCurrentStreak] = useState(7)
  const [totalPoints, setTotalPoints] = useState(1250)
  const [showAchievementAnimation, setShowAchievementAnimation] = useState(false)

  // Fake weekly progress data
  const weeklyData = [
    { day: "Mon", score: 70 },
    { day: "Tue", score: 75 },
    { day: "Wed", score: 80 },
    { day: "Thu", score: 60 },
    { day: "Fri", score: 85 },
    { day: "Sat", score: 90 },
    { day: "Sun", score: 88 },
  ]

  // Fake water intake data (cups/day)
  const [waterData, setWaterData] = useState([
    { day: "Mon", cups: 5 },
    { day: "Tue", cups: 6 },
    { day: "Wed", cups: 7 },
    { day: "Thu", cups: 4 },
    { day: "Fri", cups: 8 },
    { day: "Sat", cups: 6 },
    { day: "Sun", cups: 7 },
  ])

  // Checklist state
  const [tasks, setTasks] = useState([
    { id: 1, text: "Drink 8 glasses of water", done: false },
    { id: 2, text: "30 min walk", done: true },
    { id: 3, text: "Meditation 15 min", done: false },
    { id: 4, text: "Avoid junk food", done: true },
  ])

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    navigate(createPageUrl("Landing"))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log("Profile updated:", { age, weight, height })
  }

  const toggleTask = (id) => {
    setTasks((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          const newTask = { ...t, done: !t.done }
          // Add points when completing a task
          if (!t.done && newTask.done) {
            setTotalPoints((points) => points + 50)
            // Check if all tasks are completed for streak
            const allCompleted = updated.every((task) => (task.id === id ? true : task.done))
            if (allCompleted) {
              setCurrentStreak((streak) => streak + 1)
              setShowAchievementAnimation(true)
              setTimeout(() => setShowAchievementAnimation(false), 2000)
            }
          } else if (t.done && !newTask.done) {
            setTotalPoints((points) => Math.max(0, points - 50))
          }
          return newTask
        }
        return t
      })
      return updated
    })
  }

  const addWater = () => {
    setWaterData((prev) => {
      const updated = [...prev]
      updated[updated.length - 1].cups += 1

      // Add points for reaching daily goal
      if (updated[updated.length - 1].cups === dailyGoal) {
        setTotalPoints((points) => points + 100)
        setShowAchievementAnimation(true)
        setTimeout(() => setShowAchievementAnimation(false), 2000)
      }

      return updated
    })
  }

  const removeWater = () => {
    setWaterData((prev) => {
      const updated = [...prev]
      if (updated[updated.length - 1].cups > 0) {
        updated[updated.length - 1].cups -= 1
      }
      return updated
    })
  }

  const completionPercentage = Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)
  const todayWater = waterData[waterData.length - 1]?.cups || 0
  const waterProgress = Math.min((todayWater / dailyGoal) * 100, 100)

  if (loading) {
    return (
      <div className="p-4 space-y-6 animate-pulse">
        <div className="h-40 bg-green-100 rounded-2xl"></div>
        <div className="h-32 bg-green-100 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {showAchievementAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 text-center animate-bounce">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-green-900">Achievement Unlocked!</h3>
            <p className="text-green-600">+100 Points Earned!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-green-900">Profile</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-green-700 hover:bg-green-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <Card className="border-0 shadow-md rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-900">{totalPoints}</div>
            <div className="text-xs text-blue-600">Points</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-900">{currentStreak}</div>
            <div className="text-xs text-orange-600">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-900">{completionPercentage}%</div>
            <div className="text-xs text-green-600">Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Profile Card */}
      <Card className="ayur-card border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <span className="text-4xl font-bold text-white">{user?.displayName?.charAt(0) || "T"}</span>
            </div>

            {/* Name + Email */}
            <div>
              <h2 className="text-2xl font-bold text-green-900">{user?.displayName || "Tara"}</h2>
              <p className="text-sm text-green-600">{user?.email}</p>
            </div>

            {/* Editable fields */}
            {isEditing ? (
              <div className="space-y-4 pt-4">
                {/* Age */}
                <div className="text-left">
                  <label className="block text-sm font-medium text-green-700 mb-1">Age</label>
                  <Input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-xl border-green-300 focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Weight */}
                <div className="text-left">
                  <label className="block text-sm font-medium text-green-700 mb-1">Weight (kg)</label>
                  <Input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full rounded-xl border-green-300 focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your weight"
                  />
                </div>

                {/* Height */}
                <div className="text-left">
                  <label className="block text-sm font-medium text-green-700 mb-1">Height (cm)</label>
                  <Input
                    type="text"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full rounded-xl border-green-300 focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your height"
                  />
                </div>

                {/* Save / Cancel */}
                <div className="flex space-x-3 pt-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transform hover:scale-105 transition-transform"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-50 rounded-xl font-semibold transform hover:scale-105 transition-transform bg-transparent"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 text-sm text-green-800 pt-2">
                <div className="font-medium">Age: {age || "-"}</div>
                <div className="font-medium">Weight: {weight || "-"}kg</div>
                <div className="font-medium">Height: {height || "-"}cm</div>
              </div>
            )}

            {/* Dosha Badge */}
            <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-3 text-sm hover:bg-green-200 transition-colors">
              Dominant Dosha: VATA–PITTA
            </Badge>

            {/* Buttons */}
            <div className="flex space-x-3 w-full pt-4">
              {isEditing ? (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transform hover:scale-105 transition-transform"
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transform hover:scale-105 transition-transform"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50 rounded-xl font-semibold transform hover:scale-105 transition-transform bg-transparent"
                onClick={() => navigate("/consultation")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ⚡ Preferences */}
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Notifications</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-900">Daily Reminders</span>
            </div>
            <Switch checked={reminders} onCheckedChange={setReminders} />
          </div>
        </CardContent>
      </Card>

      {/* 📊 Weekly Progress Chart */}
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Weekly Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f0fdf4",
                  border: "1px solid #16a34a",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 6, fill: "#16a34a" }}
                activeDot={{ r: 8, fill: "#15803d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 💧 Water Intake Tracker */}
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-bold text-green-900 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" /> Water Intake
            </CardTitle>
            <div className="mt-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>
                  {todayWater} / {dailyGoal} cups
                </span>
                <span>{Math.round(waterProgress)}%</span>
              </div>
              <Progress value={waterProgress} className="h-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full w-8 h-8 p-0 hover:bg-red-50 bg-transparent"
              onClick={removeWater}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 p-0" onClick={addWater}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#eff6ff",
                  border: "1px solid #3b82f6",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="cups"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ✅ Checklist */}
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center justify-between">
            <span>Daily Tasks</span>
            <Badge variant="outline" className="text-green-700">
              {tasks.filter((t) => t.done).length}/{tasks.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors transform hover:scale-102"
              onClick={() => toggleTask(task.id)}
            >
              <span
                className={`text-sm font-medium transition-all ${
                  task.done ? "line-through text-green-500" : "text-green-900"
                }`}
              >
                {task.text}
              </span>
              <div className="flex items-center gap-2">
                {task.done && <span className="text-xs text-green-600">+50pts</span>}
                {task.done && <CheckCircle2 className="w-5 h-5 text-green-600 animate-pulse" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 🎖 Achievements */}
      <Card className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors cursor-pointer transform hover:scale-105">
            🥇 7-Day Streak
          </Badge>
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors cursor-pointer transform hover:scale-105">
            🔥 100% Compliance Day
          </Badge>
          <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 transition-colors cursor-pointer transform hover:scale-105">
            🧘 Meditation Streak
          </Badge>
          {todayWater >= dailyGoal && (
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer transform hover:scale-105 animate-pulse">
              💧 Hydration Hero
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
