"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Filter,
  X,
  Heart,
  Clock,
  Leaf,
  Star,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  BookOpen,
  Sparkles,
} from "lucide-react"

// Comprehensive food database with Ayurvedic properties
const foodDatabase = [
  {
    id: "1",
    name: "Paneer",
    category: "dairy",
    image: "🧀",
    nutrients: {
      calories_per_100g: 300,
      protein: 18,
      carbs: 4,
      fat: 25,
      fiber: 0,
      iron: 0.2,
      calcium: 208,
      vitamin_c: 0,
    },
    ayurvedic_properties: {
      rasa: ["madhura"],
      virya: "shita",
      vipaka: "madhura",
      guna: ["guru", "snigdha"],
      digestibility: "easy",
      dosha_effects: {
        vata: "decrease",
        pitta: "decrease",
        kapha: "increase",
      },
    },
    best_time: ["morning", "afternoon"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Don't eat at night", "Avoid with citrus fruits"],
    substitutions: ["Tofu", "Cottage cheese", "Soaked chana"],
    ayur_score: 88,
    tags: ["high_protein", "cooling", "building"],
  },
  {
    id: "2",
    name: "Basmati Rice",
    category: "grains",
    image: "🍚",
    nutrients: {
      calories_per_100g: 365,
      protein: 8.9,
      carbs: 78.2,
      fat: 1.4,
      fiber: 1.3,
      iron: 0.8,
      calcium: 33,
      vitamin_c: 0,
    },
    ayurvedic_properties: {
      rasa: ["madhura"],
      virya: "shita",
      vipaka: "madhura",
      guna: ["guru", "snigdha"],
      digestibility: "moderate",
      dosha_effects: {
        vata: "decrease",
        pitta: "decrease",
        kapha: "increase",
      },
    },
    best_time: ["afternoon"],
    seasonal_suitability: ["all"],
    contraindications: ["Avoid if diabetic", "Don't overeat"],
    substitutions: ["Quinoa", "Brown rice", "Millet"],
    ayur_score: 85,
    tags: ["energy", "cooling", "staple"],
  },
  {
    id: "3",
    name: "Spinach",
    category: "vegetables",
    image: "🥬",
    nutrients: {
      calories_per_100g: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      iron: 2.7,
      calcium: 99,
      vitamin_c: 28.1,
    },
    ayurvedic_properties: {
      rasa: ["tikta", "kashaya"],
      virya: "shita",
      vipaka: "katu",
      guna: ["laghu", "ruksha"],
      digestibility: "moderate",
      dosha_effects: {
        vata: "increase",
        pitta: "decrease",
        kapha: "decrease",
      },
    },
    best_time: ["afternoon", "evening"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Kidney stones", "High oxalate sensitivity"],
    substitutions: ["Kale", "Fenugreek leaves", "Amaranth leaves"],
    ayur_score: 92,
    tags: ["iron_rich", "detox", "cooling", "light"],
  },
  {
    id: "4",
    name: "Almonds",
    category: "nuts_seeds",
    image: "🌰",
    nutrients: {
      calories_per_100g: 579,
      protein: 21.2,
      carbs: 21.6,
      fat: 49.9,
      fiber: 12.5,
      iron: 3.7,
      calcium: 269,
      vitamin_c: 0,
    },
    ayurvedic_properties: {
      rasa: ["madhura"],
      virya: "ushna",
      vipaka: "madhura",
      guna: ["guru", "snigdha"],
      digestibility: "moderate",
      dosha_effects: {
        vata: "decrease",
        pitta: "neutral",
        kapha: "increase",
      },
    },
    best_time: ["morning"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Soak overnight before eating", "Don't eat skin"],
    substitutions: ["Walnuts", "Cashews", "Sunflower seeds"],
    ayur_score: 90,
    tags: ["brain_food", "high_protein", "warming"],
  },
  {
    id: "5",
    name: "Turmeric",
    category: "spices",
    image: "🌿",
    nutrients: {
      calories_per_100g: 354,
      protein: 7.8,
      carbs: 64.9,
      fat: 9.9,
      fiber: 21,
      iron: 41.4,
      calcium: 183,
      vitamin_c: 25.9,
    },
    ayurvedic_properties: {
      rasa: ["tikta", "katu"],
      virya: "ushna",
      vipaka: "katu",
      guna: ["laghu", "ruksha"],
      digestibility: "easy",
      dosha_effects: {
        vata: "neutral",
        pitta: "increase",
        kapha: "decrease",
      },
    },
    best_time: ["morning", "evening"],
    seasonal_suitability: ["all"],
    contraindications: ["Avoid in high pitta", "Don't use with blood thinners"],
    substitutions: ["Ginger", "Cumin", "Coriander"],
    ayur_score: 95,
    tags: ["anti_inflammatory", "warming", "healing", "immunity"],
  },
]

export default function Foods() {
  const [searchTerm, setSearchTerm] = useState("")
  const [foods, setFoods] = useState(foodDatabase)
  const [filteredFoods, setFilteredFoods] = useState(foodDatabase)
  const [loading, setLoading] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState(["1", "3"])
  const [selectedFood, setSelectedFood] = useState(null)

  const [dailyMeals, setDailyMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  })
  const [showMealPlan, setShowMealPlan] = useState(false)
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
  })
  const [showComparison, setShowComparison] = useState(false)
  const [comparisonFoods, setComparisonFoods] = useState([])
  const [recentSearches, setRecentSearches] = useState(["Turmeric", "Spinach"])
  const [showNutritionChart, setShowNutritionChart] = useState(false)
  const [animatingCards, setAnimatingCards] = useState(new Set())

  const filterFoods = useCallback(() => {
    let filtered = foods.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (activeFilters.length > 0) {
      filtered = filtered.filter((food) => {
        return activeFilters.some((filter) => {
          if (filter.type === "dosha") {
            return food.ayurvedic_properties.dosha_effects[filter.value] === "decrease"
          }
          if (filter.type === "rasa") {
            return food.ayurvedic_properties.rasa.includes(filter.value)
          }
          if (filter.type === "tag") {
            return food.tags && food.tags.includes(filter.value)
          }
          if (filter.type === "virya") {
            return food.ayurvedic_properties.virya === filter.value
          }
          return false
        })
      })
    }

    setFilteredFoods(filtered)
  }, [foods, searchTerm, activeFilters])

  useEffect(() => {
    filterFoods()
  }, [filterFoods])

  const toggleFilter = (filter) => {
    setActiveFilters((prev) => {
      const exists = prev.find((f) => f.type === filter.type && f.value === filter.value)
      if (exists) {
        return prev.filter((f) => !(f.type === filter.type && f.value === filter.value))
      }
      return [...prev, filter]
    })
  }

  const toggleFavorite = (foodId) => {
    setFavorites((prev) => (prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]))
  }

  const getDoshaEffectText = (dosha, effect) => {
    if (effect === "decrease") return `Balances ${dosha}`
    if (effect === "increase") return `May aggravate ${dosha}`
    return `Neutral for ${dosha}`
  }

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const filterOptions = [
    { type: "dosha", label: "Balances Vata", value: "vata" },
    { type: "dosha", label: "Balances Pitta", value: "pitta" },
    { type: "dosha", label: "Balances Kapha", value: "kapha" },
    { type: "rasa", label: "Sweet", value: "madhura" },
    { type: "rasa", label: "Sour", value: "amla" },
    { type: "rasa", label: "Bitter", value: "tikta" },
    { type: "tag", label: "High Protein", value: "high_protein" },
    { type: "tag", label: "Iron Rich", value: "iron_rich" },
    { type: "tag", label: "Cooling", value: "cooling" },
    { type: "virya", label: "Heating", value: "ushna" },
    { type: "virya", label: "Cooling", value: "shita" },
  ]

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term && !recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev.slice(0, 4)])
    }
  }

  const addToMeal = (food, mealType) => {
    setAnimatingCards((prev) => new Set([...prev, food.id]))
    setTimeout(() => {
      setDailyMeals((prev) => ({
        ...prev,
        [mealType]: [...prev[mealType], food],
      }))
      setAnimatingCards((prev) => {
        const newSet = new Set(prev)
        newSet.delete(food.id)
        return newSet
      })
    }, 300)
  }

  const getDailyNutrition = () => {
    const allMeals = [...dailyMeals.breakfast, ...dailyMeals.lunch, ...dailyMeals.dinner]
    return allMeals.reduce(
      (total, food) => ({
        calories: total.calories + food.nutrients.calories_per_100g,
        protein: total.protein + food.nutrients.protein,
        carbs: total.carbs + food.nutrients.carbs,
        fat: total.fat + food.nutrients.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    )
  }

  const toggleComparison = (food) => {
    setComparisonFoods((prev) => {
      const exists = prev.find((f) => f.id === food.id)
      if (exists) {
        return prev.filter((f) => f.id !== food.id)
      }
      return prev.length < 3 ? [...prev, food] : prev
    })
  }

  if (selectedFood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24">
          <style>
            {`
              .gradient-bg {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
              }
              .ayur-shadow {
                box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
              }
              .pulse-animation {
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
              }
              .slide-in {
                animation: slideIn 0.3s ease-out;
              }
              @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}
          </style>

          {/* Header */}
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedFood(null)}
              className="text-green-700 shrink-0 hover:bg-green-100 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold text-green-900 truncate">{selectedFood.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(selectedFood.id)}
              className="ml-auto shrink-0 hover:bg-red-50 transition-colors"
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${favorites.includes(selectedFood.id) ? "text-red-500 fill-red-500 scale-110" : "text-gray-400"}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleComparison(selectedFood)}
              className="shrink-0 hover:bg-blue-50 transition-colors"
            >
              <BarChart3
                className={`w-4 h-4 sm:w-5 sm:h-5 ${comparisonFoods.find((f) => f.id === selectedFood.id) ? "text-blue-500" : "text-gray-400"}`}
              />
            </Button>
          </div>

          {/* Food Image & Basic Info */}
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl slide-in">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 pulse-animation">{selectedFood.image}</div>
              <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-2">{selectedFood.name}</h2>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <Badge
                  className={`${getScoreColor(selectedFood.ayur_score)} hover:scale-105 transition-transform cursor-pointer`}
                >
                  <Star className="w-3 h-3 mr-1" />
                  Ayur Score: {selectedFood.ayur_score}/100
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 hover:scale-105 transition-transform cursor-pointer">
                  <Zap className="w-3 h-3 mr-1" />
                  {selectedFood.nutrients.calories_per_100g} kcal/100g
                </Badge>
              </div>
              <p className="text-green-700 capitalize flex items-center justify-center">
                <Leaf className="w-4 h-4 mr-1" />
                {selectedFood.category}
              </p>
            </CardContent>
          </Card>

          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl slide-in">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Nutritional Facts (per 100g)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-2 sm:p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-lg sm:text-xl font-bold text-green-800">{selectedFood.nutrients.protein}g</div>
                  <div className="text-xs sm:text-sm text-green-600">Protein</div>
                  <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedFood.nutrients.protein / 25) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-lg sm:text-xl font-bold text-blue-800">{selectedFood.nutrients.carbs}g</div>
                  <div className="text-xs sm:text-sm text-blue-600">Carbs</div>
                  <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedFood.nutrients.carbs / 80) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-lg sm:text-xl font-bold text-orange-800">{selectedFood.nutrients.fat}g</div>
                  <div className="text-xs sm:text-sm text-orange-600">Fat</div>
                  <div className="w-full bg-orange-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedFood.nutrients.fat / 50) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-lg sm:text-xl font-bold text-red-800">{selectedFood.nutrients.iron}mg</div>
                  <div className="text-xs sm:text-sm text-red-600">Iron</div>
                  <div className="w-full bg-red-100 rounded-full h-2 mt-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedFood.nutrients.iron / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ayurvedic Properties */}
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900">Ayurvedic Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-2">Rasa (Taste)</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedFood.ayurvedic_properties.rasa.map((taste, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                        {taste}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900 mb-2">Virya (Energy)</p>
                  <Badge
                    className={
                      selectedFood.ayurvedic_properties.virya === "ushna"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {selectedFood.ayurvedic_properties.virya === "ushna" ? "Heating" : "Cooling"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-green-900 mb-2">Dosha Effects</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Object.entries(selectedFood.ayurvedic_properties.dosha_effects).map(([dosha, effect]) => (
                    <Badge
                      key={dosha}
                      className={`text-xs justify-center ${
                        effect === "decrease"
                          ? "bg-green-100 text-green-800"
                          : effect === "increase"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <span className="truncate">{getDoshaEffectText(dosha, effect)}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-green-900 mb-2">Best Time to Eat</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFood.best_time.map((time, index) => (
                    <Badge key={index} className="bg-amber-100 text-amber-800 text-xs">
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contraindications & Substitutions */}
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900">Important Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm font-semibold text-green-900 mb-2">⚠️ Contraindications</p>
                <div className="space-y-1">
                  {selectedFood.contraindications.map((item, index) => (
                    <p key={index} className="text-xs sm:text-sm text-red-700">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-900 mb-2">🔄 Substitutions</p>
                <div className="flex flex-wrap gap-1">
                  {selectedFood.substitutions.map((sub, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
            <Button
              className="h-10 sm:h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm hover:scale-105 transition-all"
              onClick={() => addToMeal(selectedFood, "breakfast")}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Breakfast
              {dailyMeals.breakfast.length > 0 && (
                <Badge className="ml-2 bg-green-800 text-white text-xs">{dailyMeals.breakfast.length}</Badge>
              )}
            </Button>
            <Button
              className="h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm hover:scale-105 transition-all"
              onClick={() => addToMeal(selectedFood, "lunch")}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Lunch
              {dailyMeals.lunch.length > 0 && (
                <Badge className="ml-2 bg-blue-800 text-white text-xs">{dailyMeals.lunch.length}</Badge>
              )}
            </Button>
            <Button
              className="h-10 sm:h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm hover:scale-105 transition-all"
              onClick={() => addToMeal(selectedFood, "dinner")}
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Dinner
              {dailyMeals.dinner.length > 0 && (
                <Badge className="ml-2 bg-purple-800 text-white text-xs">{dailyMeals.dinner.length}</Badge>
              )}
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMealPlan(true)}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              View Meal Plan
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComparison(true)}
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Compare Foods
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 pb-20 sm:pb-24">
        <style>
          {`
            .gradient-bg {
              background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            }
            .ayur-shadow {
              box-shadow: 0 4px 20px rgba(34, 197, 94, 0.15);
            }
            .food-card {
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(34, 197, 94, 0.2);
              transition: all 0.3s ease;
            }
            .food-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 30px rgba(34, 197, 94, 0.2);
            }
            .animate-bounce-in {
              animation: bounceIn 0.5s ease-out;
            }
            @keyframes bounceIn {
              0% { transform: scale(0.3); opacity: 0; }
              50% { transform: scale(1.05); }
              70% { transform: scale(0.9); }
              100% { transform: scale(1); opacity: 1; }
            }
            .slide-up {
              animation: slideUp 0.3s ease-out;
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}
        </style>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-green-900 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-green-600" />
                Food Database
              </h1>
              <p className="text-sm text-green-700 mt-1">
                {filteredFoods.length} foods • {favorites.length} favorites
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowMealPlan(!showMealPlan)}
                className={`border-green-300 text-green-700 shrink-0 transition-colors ${showMealPlan ? "bg-green-100" : ""}`}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className={`border-green-300 text-green-700 shrink-0 transition-colors ${showFilters ? "bg-green-100" : ""}`}
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              placeholder="Search by name or property..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 sm:pl-12 py-2 sm:py-3 border-green-200 rounded-2xl focus:border-green-500 focus:ring-green-500 bg-white text-sm sm:text-base transition-all"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchTerm("")}
                className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-green-600 h-7 w-7 sm:h-8 sm:w-8 hover:bg-green-100"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            )}

            {!searchTerm && recentSearches.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-green-200 z-10 slide-up">
                <div className="p-2">
                  <p className="text-xs text-green-600 mb-2">Recent searches</p>
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSearch(search)}
                      className="w-full justify-start text-left text-sm hover:bg-green-50"
                    >
                      <Clock className="w-3 h-3 mr-2 text-green-500" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {(dailyMeals.breakfast.length > 0 || dailyMeals.lunch.length > 0 || dailyMeals.dinner.length > 0) && (
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl animate-bounce-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Today's Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const dailyNutrition = getDailyNutrition()
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-lg font-bold text-green-800">{Math.round(dailyNutrition.calories)}</div>
                      <div className="text-xs text-green-600">Calories</div>
                      <div className="w-full bg-green-100 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((dailyNutrition.calories / nutritionGoals.calories) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-lg font-bold text-blue-800">{Math.round(dailyNutrition.protein)}g</div>
                      <div className="text-xs text-blue-600">Protein</div>
                      <div className="w-full bg-blue-100 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((dailyNutrition.protein / nutritionGoals.protein) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-lg font-bold text-orange-800">{Math.round(dailyNutrition.carbs)}g</div>
                      <div className="text-xs text-orange-600">Carbs</div>
                      <div className="w-full bg-orange-100 rounded-full h-2 mt-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${Math.min((dailyNutrition.carbs / nutritionGoals.carbs) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-xl">
                      <div className="text-lg font-bold text-red-800">{Math.round(dailyNutrition.fat)}g</div>
                      <div className="text-xs text-red-600">Fat</div>
                      <div className="w-full bg-red-100 rounded-full h-2 mt-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${Math.min((dailyNutrition.fat / nutritionGoals.fat) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </CardContent>
          </Card>
        )}

        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-green-300 text-green-700 text-xs sm:text-sm shrink-0 hover:bg-green-50 hover:scale-105 transition-all bg-transparent"
            onClick={() => setFilteredFoods(foods.filter((f) => favorites.includes(f.id)))}
          >
            ❤️ Favorites ({favorites.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-green-300 text-green-700 text-xs sm:text-sm shrink-0 hover:bg-green-50 hover:scale-105 transition-all bg-transparent"
            onClick={() => toggleFilter({ type: "tag", value: "high_protein" })}
          >
            💪 High Protein
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-green-300 text-green-700 text-xs sm:text-sm shrink-0 hover:bg-green-50 hover:scale-105 transition-all bg-transparent"
            onClick={() => toggleFilter({ type: "tag", value: "cooling" })}
          >
            ❄️ Cooling
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap border-green-300 text-green-700 text-xs sm:text-sm shrink-0 hover:bg-green-50 hover:scale-105 transition-all bg-transparent"
            onClick={() => toggleFilter({ type: "tag", value: "iron_rich" })}
          >
            ⚡ Iron Rich
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`whitespace-nowrap text-xs sm:text-sm shrink-0 hover:scale-105 transition-all ${
              showComparison
                ? "bg-blue-100 border-blue-300 text-blue-700"
                : "border-green-300 text-green-700 hover:bg-green-50"
            }`}
            onClick={() => setShowComparison(!showComparison)}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Compare ({comparisonFoods.length}/3)
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge
                key={index}
                className="bg-green-100 text-green-800 cursor-pointer text-xs"
                onClick={() => toggleFilter(filter)}
              >
                {filter.label} <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters([])}
              className="text-green-600 h-6 text-xs"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filterOptions.map((filter, index) => (
                  <Button
                    key={index}
                    variant={
                      activeFilters.some((f) => f.type === filter.type && f.value === filter.value)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => toggleFilter(filter)}
                    className={`text-xs h-8 ${
                      activeFilters.some((f) => f.type === filter.type && f.value === filter.value)
                        ? "bg-green-600 text-white"
                        : "border-green-300 text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {showComparison && comparisonFoods.length > 0 && (
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl slide-up">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg font-bold text-green-900 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Food Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {comparisonFoods.map((food) => (
                  <div key={food.id} className="bg-white rounded-xl p-3 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleComparison(food)}
                      className="absolute top-1 right-1 h-6 w-6"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                    <div className="text-center mb-3">
                      <div className="text-2xl mb-1">{food.image}</div>
                      <h4 className="font-bold text-sm">{food.name}</h4>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Calories:</span>
                        <span className="font-bold">{food.nutrients.calories_per_100g}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <span className="font-bold">{food.nutrients.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ayur Score:</span>
                        <span className="font-bold">{food.ayur_score}/100</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-3 sm:space-y-4">
          {loading ? (
            <div className="space-y-3 sm:space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 sm:h-32 bg-green-100 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((food, index) => (
              <Card
                key={food.id}
                className={`food-card border-0 rounded-2xl ayur-shadow cursor-pointer ${
                  animatingCards.has(food.id) ? "animate-bounce-in" : ""
                } ${comparisonFoods.find((f) => f.id === food.id) ? "ring-2 ring-blue-300" : ""}`}
                onClick={() => setSelectedFood(food)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-3xl sm:text-4xl shrink-0 hover:scale-110 transition-transform">
                      {food.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-green-900 truncate">{food.name}</h3>
                        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                          {showComparison && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleComparison(food)
                              }}
                              className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-blue-50"
                            >
                              <BarChart3
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${comparisonFoods.find((f) => f.id === food.id) ? "text-blue-500" : "text-gray-400"}`}
                              />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(food.id)
                            }}
                            className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-red-50"
                          >
                            <Heart
                              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all ${favorites.includes(food.id) ? "text-red-500 fill-red-500 scale-110" : "text-gray-400"}`}
                            />
                          </Button>
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                        <Badge className={`${getScoreColor(food.ayur_score)} hover:scale-105 transition-transform`}>
                          <Star className="w-3 h-3 mr-1" />
                          {food.ayur_score}/100
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 text-xs hover:scale-105 transition-transform">
                          <Zap className="w-3 h-3 mr-1" />
                          {food.nutrients.calories_per_100g} kcal
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 text-xs hover:scale-105 transition-transform">
                          💪 {food.nutrients.protein}g protein
                        </Badge>
                      </div>

                      {Object.entries(food.ayurvedic_properties.dosha_effects).map(([dosha, effect]) => (
                        <Badge
                          key={dosha}
                          className={`text-xs ${
                            effect === "decrease"
                              ? "bg-green-100 text-green-700"
                              : effect === "increase"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span className="truncate">{getDoshaEffectText(dosha, effect)}</span>
                        </Badge>
                      ))}

                      <p className="text-xs sm:text-sm text-green-600 mb-2 sm:mb-3 flex items-center">
                        {food.ayurvedic_properties.virya === "ushna" ? "🔥 Heating" : "❄️ Cooling"} •
                        {food.ayurvedic_properties.digestibility === "easy"
                          ? " Easy to digest"
                          : food.ayurvedic_properties.digestibility === "moderate"
                            ? " Moderate digestion"
                            : " Heavy to digest"}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
                        <Button
                          size="sm"
                          className="h-7 sm:h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs hover:scale-105 transition-all"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToMeal(food, "breakfast")
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Breakfast
                          {dailyMeals.breakfast.filter((f) => f.id === food.id).length > 0 && (
                            <Badge className="ml-1 bg-green-800 text-white text-xs">
                              {dailyMeals.breakfast.filter((f) => f.id === food.id).length}
                            </Badge>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 sm:h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs hover:scale-105 transition-all"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToMeal(food, "lunch")
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Lunch
                          {dailyMeals.lunch.filter((f) => f.id === food.id).length > 0 && (
                            <Badge className="ml-1 bg-blue-800 text-white text-xs">
                              {dailyMeals.lunch.filter((f) => f.id === food.id).length}
                            </Badge>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          className="h-7 sm:h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs hover:scale-105 transition-all"
                          onClick={(e) => {
                            e.stopPropagation()
                            addToMeal(food, "dinner")
                          }}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Dinner
                          {dailyMeals.dinner.filter((f) => f.id === food.id).length > 0 && (
                            <Badge className="ml-1 bg-purple-800 text-white text-xs">
                              {dailyMeals.dinner.filter((f) => f.id === food.id).length}
                            </Badge>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="gradient-bg border-0 ayur-shadow rounded-2xl p-6 sm:p-8 text-center slide-up">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-base sm:text-lg font-bold text-green-900 mb-2">No Foods Found</h3>
              <p className="text-sm sm:text-base text-green-700 mb-3 sm:mb-4">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setActiveFilters([])
                }}
                className="bg-green-600 hover:bg-green-700 text-white text-sm hover:scale-105 transition-all"
              >
                Clear All Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
