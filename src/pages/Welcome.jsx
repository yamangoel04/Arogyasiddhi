// src/pages/Welcome.jsx
import React from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent } from "../components/ui/card.jsx";
import { ChevronRight, Calendar, Utensils, Database, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Calendar,
    title: "Track Your Diet Plan",
    description: "Monitor your daily Ayurvedic nutrition and progress",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Utensils,
    title: "Create Your Diet Plan",
    description: "AI-powered personalized meal planning based on your Prakriti",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Database,
    title: "View Food Database",
    description: "Explore comprehensive Ayurvedic food properties and recommendations",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function Welcome() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home"); // 👈 Redirect to Home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-green-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-green-900 mb-4">Welcome</h1>
          <p className="text-green-700 text-lg leading-relaxed px-4">
            Explore features to manage your Ayurvedic diet
          </p>
        </div>

        {/* Decorative Bowl with Vegetables */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-48 h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full shadow-2xl border-4 border-amber-700"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-6 h-16 bg-orange-500 rounded-full transform rotate-12 shadow-md"></div>
              <div className="w-12 h-12 bg-green-500 rounded-full shadow-md"></div>
              <div className="w-10 h-10 bg-green-600 rounded-full shadow-md -ml-2"></div>
              <div className="w-8 h-8 bg-red-500 rounded-full shadow-md"></div>
              <div className="w-14 h-10 bg-green-400 rounded-full transform -rotate-12 shadow-md"></div>
            </div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-amber-400 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-2xl ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-green-700 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ✅ Fixed Get Started Button */}
        <Button
          onClick={handleGetStarted}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 text-lg"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>

        <div className="mt-8 h-24 bg-gradient-to-t from-green-200 to-transparent rounded-t-3xl"></div>
      </div>
    </div>
  );
}
