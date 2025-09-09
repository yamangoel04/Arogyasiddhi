import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export default function CalorieProgressBar({ data }) {
  const caloriePercentage = (data.calories / data.targetCalories) * 100;
  const proteinPercentage = (data.protein / data.targetProtein) * 100;
  const carbsPercentage = (data.carbs / data.targetCarbs) * 100;
  const fatPercentage = (data.fat / data.targetFat) * 100;

  const nutrients = [
    { name: 'Calories', current: data.calories, target: data.targetCalories, percentage: caloriePercentage, color: 'bg-green-500', unit: 'kcal' },
    { name: 'Protein', current: data.protein, target: data.targetProtein, percentage: proteinPercentage, color: 'bg-blue-500', unit: 'g' },
    { name: 'Carbs', current: data.carbs, target: data.targetCarbs, percentage: carbsPercentage, color: 'bg-yellow-500', unit: 'g' },
    { name: 'Fat', current: data.fat, target: data.targetFat, percentage: fatPercentage, color: 'bg-purple-500', unit: 'g' }
  ];

  return (
    <Card className="glass-effect border-0 rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-green-900">Nutrition Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nutrients.map((nutrient, index) => (
          <motion.div
            key={nutrient.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-green-900">{nutrient.name}</span>
              <span className="text-sm text-green-700 font-medium">
                {nutrient.current} / {nutrient.target} {nutrient.unit}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={nutrient.percentage} 
                className="h-3 bg-gray-100"
              />
              <div 
                className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${nutrient.color}`}
                style={{ width: `${Math.min(nutrient.percentage, 100)}%` }}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}