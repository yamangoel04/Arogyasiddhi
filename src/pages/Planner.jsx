import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Calendar, Plus, Settings, TrendingUp, Clock, Replace } from "lucide-react";

export default function Planner() {
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or 'generate'
  const [formData, setFormData] = useState({
    age: '25',
    weight: '72',
    height: '160',
    mealsPerDay: '3',
    lifestyle: 'moderately_active',
    goals: ['maintain_weight', 'improve_digestion'],
    doshaFocus: 'balance_all'
  });

  const weeklyMeals = {
    Monday: {
      breakfast: { name: "Oats with fruits", calories: 320, score: 88 },
      lunch: { name: "Dal rice with vegetables", calories: 450, score: 92 },
      dinner: { name: "Khichdi with ghee", calories: 380, score: 85 }
    },
    Tuesday: {
      breakfast: { name: "Poha with peanuts", calories: 300, score: 86 },
      lunch: { name: "Roti with sabzi", calories: 420, score: 90 },
      dinner: { name: "Moong dal soup", calories: 250, score: 88 }
    },
    Wednesday: {
      breakfast: { name: "Upma with vegetables", calories: 280, score: 84 },
      lunch: { name: "Quinoa bowl", calories: 400, score: 91 },
      dinner: { name: "Vegetable curry with rice", calories: 390, score: 87 }
    },
    Thursday: {
      breakfast: { name: "Dosa with sambar", calories: 350, score: 89 },
      lunch: { name: "Chole with rice", calories: 460, score: 88 },
      dinner: { name: "Palak paneer with roti", calories: 410, score: 86 }
    },
    Friday: {
      breakfast: { name: "Smoothie bowl", calories: 290, score: 85 },
      lunch: { name: "Biryani (small portion)", calories: 380, score: 82 },
      dinner: { name: "Grilled vegetables", calories: 280, score: 90 }
    },
    Saturday: {
      breakfast: { name: "Paratha with curd", calories: 400, score: 83 },
      lunch: { name: "Sambar rice", calories: 420, score: 89 },
      dinner: { name: "Millet kheer", calories: 320, score: 87 }
    },
    Sunday: {
      breakfast: { name: "Idli with coconut chutney", calories: 250, score: 91 },
      lunch: { name: "Mixed vegetable curry", calories: 440, score: 90 },
      dinner: { name: "Light soup with bread", calories: 300, score: 88 }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal) 
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleAISuggestion = () => {
    setViewMode('weekly');
    // Here you would typically call an API to generate the meal plan
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const weeklyInsights = {
    totalCalories: 7840,
    avgDoshaScore: 87,
    rasaDistribution: { sweet: 30, sour: 15, salty: 12, bitter: 18, pungent: 15, astringent: 10 },
    recommendation: "This week, Bitter Rasa was low — try more leafy greens and turmeric."
  };

  if (viewMode === 'generate') {
    return (
      <div className="p-4 space-y-6 pb-24">
        <style>
          {`
            .gradient-bg {
              background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            }
            .ayur-shadow {
              box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
            }
          `}
        </style>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewMode('weekly')}
              className="text-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-green-900">Generate Diet Plan</h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('weekly')}
            className="border-green-300 text-green-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            View Plan
          </Button>
        </div>

        {/* Profile Form */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Age</Label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Weight (kg)</Label>
                <Input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="border-green-200 focus:border-green-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-green-900">Height (cm)</Label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="border-green-200 focus:border-green-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Meals per Day</Label>
                <Select value={formData.mealsPerDay} onValueChange={(value) => handleInputChange('mealsPerDay', value)}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 meals</SelectItem>
                    <SelectItem value="4">4 meals</SelectItem>
                    <SelectItem value="5">5 meals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-green-900">Activity Level</Label>
                <Select value={formData.lifestyle} onValueChange={(value) => handleInputChange('lifestyle', value)}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly_active">Lightly Active</SelectItem>
                    <SelectItem value="moderately_active">Moderately Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Selection */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Health Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'weight_loss', label: 'Weight Loss' },
                { id: 'weight_gain', label: 'Weight Gain' },
                { id: 'maintain_weight', label: 'Maintain Weight' },
                { id: 'improve_energy', label: 'Boost Energy' },
                { id: 'improve_digestion', label: 'Better Digestion' },
                { id: 'better_sleep', label: 'Better Sleep' },
                { id: 'stress_relief', label: 'Stress Relief' },
                { id: 'skin_health', label: 'Skin Health' }
              ].map(goal => (
                <Button
                  key={goal.id}
                  variant={formData.goals.includes(goal.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`text-xs h-10 ${
                    formData.goals.includes(goal.id) 
                      ? 'bg-green-600 text-white' 
                      : 'border-green-300 text-green-700 hover:bg-green-50'
                  }`}
                >
                  {goal.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dosha Focus */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Dosha Balancing Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={formData.doshaFocus} onValueChange={(value) => handleInputChange('doshaFocus', value)}>
              <SelectTrigger className="border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="balance_all">Balance All Doshas</SelectItem>
                <SelectItem value="pacify_vata">Pacify Vata</SelectItem>
                <SelectItem value="pacify_pitta">Pacify Pitta</SelectItem>
                <SelectItem value="pacify_kapha">Pacify Kapha</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <Button
          onClick={handleAISuggestion}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg text-lg"
        >
          <Zap className="w-6 h-6 mr-2" />
          Generate AI-Powered Diet Plan
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      <style>
        {`
          .gradient-bg {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          }
          .ayur-shadow {
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
          }
          .meal-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(34, 197, 94, 0.2);
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
            onClick={() => setViewMode('generate')}
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
        <Button
          onClick={() => setViewMode('generate')}
          className="h-14 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl"
        >
          <Zap className="w-5 h-5 mr-2" />
          Generate New Plan
        </Button>
        <Button
          variant="outline"
          className="h-14 border-2 border-green-300 text-green-700 font-semibold rounded-2xl"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Edit Current Plan
        </Button>
      </div>

      {/* Weekly Insights */}
      <Card className="gradient-bg border-0 ayur-shadow rounded-2xl mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            This Week's Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">{weeklyInsights.totalCalories}</div>
              <div className="text-sm text-green-600">Total Calories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">{weeklyInsights.avgDoshaScore}%</div>
              <div className="text-sm text-green-600">Dosha Score</div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-sm text-amber-800 font-medium">⚡ {weeklyInsights.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar */}
      <div className="space-y-4">
        {Object.entries(weeklyMeals).map(([day, meals]) => (
          <Card key={day} className="meal-card border-0 rounded-2xl ayur-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-green-900">{day}</CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  {Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0)} kcal
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(meals).map(([mealType, meal]) => (
                <div key={mealType} className="flex items-center justify-between p-3 bg-white rounded-xl border border-green-100">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-semibold text-green-900 capitalize">{mealType}</span>
                      <Badge className={`text-xs ${getScoreColor(meal.score)}`}>
                        {meal.score}/100
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700">{meal.name}</p>
                    <p className="text-xs text-green-600">{meal.calories} kcal</p>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                      <Replace className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meal Reminders Setup */}
      <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Meal Reminders
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { meal: 'Breakfast', time: '8:00 AM', emoji: '🌅' },
            { meal: 'Lunch', time: '1:00 PM', emoji: '☀️' },
            { meal: 'Dinner', time: '7:30 PM', emoji: '🌙' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl border border-green-100">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="font-medium text-green-900">{item.meal}</p>
                  <p className="text-sm text-green-600">{item.time}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                Edit
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
