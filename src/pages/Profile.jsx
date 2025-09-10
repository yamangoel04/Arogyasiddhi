import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input"; // ✅ for editing fields
import { Edit, MessageCircle, TrendingUp, LogOut, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createPageUrl } from "@/utils";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Editable profile states
  const [isEditing, setIsEditing] = useState(false);
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(160);

  // ✅ Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate(createPageUrl("Landing"));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // ✅ later: update Firestore here
    console.log("Profile updated:", { age, weight, height });
  };

  if (loading) {
    return (
      <div className="p-4 space-y-6 animate-pulse">
        <div className="h-40 bg-green-100 rounded-2xl"></div>
        <div className="h-32 bg-green-100 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-green-900">Profile</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-green-700"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="ayur-card border-0 shadow-lg rounded-2xl">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              <span className="text-4xl font-bold text-white">
                {user?.displayName?.charAt(0) || "T"}
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-900">
                {user?.displayName || "Tara"}
              </h2>
              <p className="text-sm text-green-600">{user?.email}</p>
            </div>

            {/* Editable fields */}
            {isEditing ? (
  <div className="space-y-4 pt-4">
    {/* Age */}
    <div className="text-left">
      <label className="block text-sm font-medium text-green-700 mb-1">
        Age
      </label>
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
      <label className="block text-sm font-medium text-green-700 mb-1">
        Weight (kg)
      </label>
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
      <label className="block text-sm font-medium text-green-700 mb-1">
        Height (cm)
      </label>
      <Input
        type="text"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="w-full rounded-xl border-green-300 focus:ring-2 focus:ring-green-500"
        placeholder="Enter your height"
      />
    </div>

    {/* Save / Cancel Buttons */}
    <div className="flex space-x-3 pt-2">
      <Button
        className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
        onClick={handleSaveProfile}
      >
        Save Changes
      </Button>
      <Button
        variant="outline"
        className="flex-1 border-green-300 text-green-700 hover:bg-green-50 rounded-xl font-semibold"
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


            <Badge className="bg-green-100 text-green-800 border-green-200 py-1 px-3 text-sm">
              Dominant Dosha: VATA–PITTA
            </Badge>

            <div className="flex space-x-3 w-full pt-4">
              {isEditing ? (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl font-semibold"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
              <Button
                variant="outline"
                className="flex-1 border-green-300 text-green-700 hover:bg-green-50 rounded-xl font-semibold"
                onClick={() => navigate("/consultation")}
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Consultation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diet History */}
      <Card className="ayur-card border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-green-900">
            Diet History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-green-700 font-medium">Compliance Rate</span>
            <span className="text-green-900 font-bold">90%</span>
          </div>
          <Progress value={90} className="h-2 bg-green-100" />
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <Card className="ayur-card border-0 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-green-900">
            <TrendingUp className="w-5 h-5" />
            Health Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-900">7</div>
              <div className="text-sm text-green-700">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-900">85%</div>
              <div className="text-sm text-blue-700">Agni Score</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <Badge className="bg-green-100 text-green-800 justify-center">
              Balanced Vata
            </Badge>
            <Badge className="bg-red-100 text-red-800 justify-center">
              High Pitta
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 justify-center">
              Low Kapha
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
