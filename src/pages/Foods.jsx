import React, { useState, useEffect, useCallback } from "react";
import { Food } from "@/entities/Food";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  {Button}  from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";


import { Search, Plus, Filter, X, Heart, Clock, Leaf, Star, ChevronRight } from "lucide-react";

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
      vitamin_c: 0
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
        kapha: "increase"
      }
    },
    best_time: ["morning", "afternoon"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Don't eat at night", "Avoid with citrus fruits"],
    substitutions: ["Tofu", "Cottage cheese", "Soaked chana"],
    ayur_score: 88,
    tags: ["high_protein", "cooling", "building"]
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
      vitamin_c: 0
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
        kapha: "increase"
      }
    },
    best_time: ["afternoon"],
    seasonal_suitability: ["all"],
    contraindications: ["Avoid if diabetic", "Don't overeat"],
    substitutions: ["Quinoa", "Brown rice", "Millet"],
    ayur_score: 85,
    tags: ["energy", "cooling", "staple"]
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
      vitamin_c: 28.1
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
        kapha: "decrease"
      }
    },
    best_time: ["afternoon", "evening"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Kidney stones", "High oxalate sensitivity"],
    substitutions: ["Kale", "Fenugreek leaves", "Amaranth leaves"],
    ayur_score: 92,
    tags: ["iron_rich", "detox", "cooling", "light"]
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
      vitamin_c: 0
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
        kapha: "increase"
      }
    },
    best_time: ["morning"],
    seasonal_suitability: ["winter", "spring"],
    contraindications: ["Soak overnight before eating", "Don't eat skin"],
    substitutions: ["Walnuts", "Cashews", "Sunflower seeds"],
    ayur_score: 90,
    tags: ["brain_food", "high_protein", "warming"]
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
      vitamin_c: 25.9
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
        kapha: "decrease"
      }
    },
    best_time: ["morning", "evening"],
    seasonal_suitability: ["all"],
    contraindications: ["Avoid in high pitta", "Don't use with blood thinners"],
    substitutions: ["Ginger", "Cumin", "Coriander"],
    ayur_score: 95,
    tags: ["anti_inflammatory", "warming", "healing", "immunity"]
  }
];

export default function Foods() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(['1', '3']); // Sample favorites
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const filterFoods = useCallback(() => {
    let filtered = foods.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (activeFilters.length > 0) {
      filtered = filtered.filter(food => {
        return activeFilters.some(filter => {
          if (filter.type === 'dosha') {
            return food.ayurvedic_properties.dosha_effects[filter.value] === 'decrease';
          }
          if (filter.type === 'rasa') {
            return food.ayurvedic_properties.rasa.includes(filter.value);
          }
          if (filter.type === 'tag') {
            return food.tags && food.tags.includes(filter.value);
          }
          if (filter.type === 'virya') {
            return food.ayurvedic_properties.virya === filter.value;
          }
          return false;
        });
      });
    }

    setFilteredFoods(filtered);
  }, [foods, searchTerm, activeFilters]);

  useEffect(() => {
    filterFoods();
  }, [filterFoods]);

  const loadFoods = async () => {
    setLoading(true);
    try {
      const foodList = await Food.list();
      setFoods(foodList.length > 0 ? foodList : foodDatabase);
    } catch (error) {
      setFoods(foodDatabase);
    }
    setLoading(false);
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => {
      const exists = prev.find(f => f.type === filter.type && f.value === filter.value);
      if (exists) {
        return prev.filter(f => !(f.type === filter.type && f.value === filter.value));
      }
      return [...prev, filter];
    });
  };

  const toggleFavorite = (foodId) => {
    setFavorites(prev =>
      prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
    );
  };

  const getDoshaEffectText = (dosha, effect) => {
    if (effect === 'decrease') return `Balances ${dosha}`;
    if (effect === 'increase') return `May aggravate ${dosha}`;
    return `Neutral for ${dosha}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filterOptions = [
    { type: 'dosha', label: 'Balances Vata', value: 'vata' },
    { type: 'dosha', label: 'Balances Pitta', value: 'pitta' },
    { type: 'dosha', label: 'Balances Kapha', value: 'kapha' },
    { type: 'rasa', label: 'Sweet', value: 'madhura' },
    { type: 'rasa', label: 'Sour', value: 'amla' },
    { type: 'rasa', label: 'Bitter', value: 'tikta' },
    { type: 'tag', label: 'High Protein', value: 'high_protein' },
    { type: 'tag', label: 'Iron Rich', value: 'iron_rich' },
    { type: 'tag', label: 'Cooling', value: 'cooling' },
    { type: 'virya', label: 'Heating', value: 'ushna' },
    { type: 'virya', label: 'Cooling', value: 'shita' }
  ];

  if (selectedFood) {
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
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSelectedFood(null)}
            className="text-green-700"
          >
            <X className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-green-900">{selectedFood.name}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(selectedFood.id)}
            className="ml-auto"
          >
            <Heart className={`w-5 h-5 ${favorites.includes(selectedFood.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
          </Button>
        </div>

        {/* Food Image & Basic Info */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardContent className="p-6 text-center">
            <div className="text-6xl mb-4">{selectedFood.image}</div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">{selectedFood.name}</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <Badge className={getScoreColor(selectedFood.ayur_score)}>
                Ayur Score: {selectedFood.ayur_score}/100
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {selectedFood.nutrients.calories_per_100g} kcal/100g
              </Badge>
            </div>
            <p className="text-green-700 capitalize">{selectedFood.category}</p>
          </CardContent>
        </Card>

        {/* Nutritional Facts */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Nutritional Facts (per 100g)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-white rounded-xl">
              <div className="text-xl font-bold text-green-800">{selectedFood.nutrients.protein}g</div>
              <div className="text-sm text-green-600">Protein</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl">
              <div className="text-xl font-bold text-green-800">{selectedFood.nutrients.carbs}g</div>
              <div className="text-sm text-green-600">Carbs</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl">
              <div className="text-xl font-bold text-green-800">{selectedFood.nutrients.fat}g</div>
              <div className="text-sm text-green-600">Fat</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl">
              <div className="text-xl font-bold text-green-800">{selectedFood.nutrients.iron}mg</div>
              <div className="text-sm text-green-600">Iron</div>
            </div>
          </CardContent>
        </Card>

        {/* Ayurvedic Properties */}
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Ayurvedic Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <Badge className={selectedFood.ayurvedic_properties.virya === 'ushna' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                  {selectedFood.ayurvedic_properties.virya === 'ushna' ? 'Heating' : 'Cooling'}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-green-900 mb-2">Dosha Effects</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(selectedFood.ayurvedic_properties.dosha_effects).map(([dosha, effect]) => (
                  <Badge 
                    key={dosha} 
                    className={`text-xs justify-center ${
                      effect === 'decrease' ? 'bg-green-100 text-green-800' :
                      effect === 'increase' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {getDoshaEffectText(dosha, effect)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-green-900 mb-2">Best Time to Eat</p>
              <div className="flex space-x-1">
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
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-green-900 mb-2">⚠️ Contraindications</p>
              {selectedFood.contraindications.map((item, index) => (
                <p key={index} className="text-sm text-red-700 mb-1">• {item}</p>
              ))}
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

        {/* Add to Meal Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button className="h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            Breakfast
          </Button>
          <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            Lunch
          </Button>
          <Button className="h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            Dinner
          </Button>
        </div>
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
          .food-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(34, 197, 94, 0.2);
          }
        `}
      </style>

      {/* Header & Search */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-900">Food Database</h1>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className="border-green-300 text-green-700"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
          <Input
            placeholder="Search by name or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 border-green-200 rounded-2xl focus:border-green-500 focus:ring-green-500 bg-white"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchTerm("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 h-8 w-8"
            >
              <X className="w-4 h-4"/>
            </Button>
          )}
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap border-green-300 text-green-700"
          onClick={() => setFilteredFoods(foods.filter(f => favorites.includes(f.id)))}
        >
          ❤️ Favorites
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap border-green-300 text-green-700"
          onClick={() => toggleFilter({ type: 'tag', value: 'high_protein' })}
        >
          💪 High Protein
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap border-green-300 text-green-700"
          onClick={() => toggleFilter({ type: 'tag', value: 'cooling' })}
        >
          ❄️ Cooling
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="whitespace-nowrap border-green-300 text-green-700"
          onClick={() => toggleFilter({ type: 'tag', value: 'iron_rich' })}
        >
          ⚡ Iron Rich
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              className="bg-green-100 text-green-800 cursor-pointer"
              onClick={() => toggleFilter(filter)}
            >
              {filter.label} <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setActiveFilters([])}
            className="text-green-600 h-6"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="gradient-bg border-0 ayur-shadow rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-green-900">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.map((filter, index) => (
                <Button
                  key={index}
                  variant={activeFilters.some(f => f.type === filter.type && f.value === filter.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(filter)}
                  className={`text-xs h-8 ${
                    activeFilters.some(f => f.type === filter.type && f.value === filter.value)
                      ? 'bg-green-600 text-white' 
                      : 'border-green-300 text-green-700 hover:bg-green-50'
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Food Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-green-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Card 
              key={food.id} 
              className="food-card border-0 rounded-2xl ayur-shadow cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setSelectedFood(food)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{food.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-green-900">{food.name}</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(food.id);
                          }}
                          className="h-8 w-8"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(food.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                        </Button>
                        <ChevronRight className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getScoreColor(food.ayur_score)}>
                        {food.ayur_score}/100
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {food.nutrients.calories_per_100g} kcal
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        {food.nutrients.protein}g protein
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {Object.entries(food.ayurvedic_properties.dosha_effects).map(([dosha, effect]) => (
                        <Badge 
                          key={dosha} 
                          className={`text-xs ${
                            effect === 'decrease' ? 'bg-green-100 text-green-700' :
                            effect === 'increase' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {getDoshaEffectText(dosha, effect)}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-sm text-green-600 mb-3">
                      {food.ayurvedic_properties.virya === 'ushna' ? '🔥 Heating' : '❄️ Cooling'} • 
                      {food.ayurvedic_properties.digestibility === 'easy' ? ' Easy to digest' : 
                       food.ayurvedic_properties.digestibility === 'moderate' ? ' Moderate digestion' : ' Heavy to digest'}
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        className="h-8 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="w-3 h-3 mr-1" /> Breakfast
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="w-3 h-3 mr-1" /> Lunch
                      </Button>
                      <Button 
                        size="sm" 
                        className="h-8 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="w-3 h-3 mr-1" /> Dinner
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="gradient-bg border-0 ayur-shadow rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-green-900 mb-2">No Foods Found</h3>
            <p className="text-green-700 mb-4">Try adjusting your search or filters</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setActiveFilters([]);
              }}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Clear All Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
