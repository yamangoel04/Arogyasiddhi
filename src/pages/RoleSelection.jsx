"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext" // make sure path is correct
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, Stethoscope, ArrowRight, Shield, Heart } from "lucide-react"

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const navigate = useNavigate()
  const { setRole } = useAuth() // store role globally

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setIsAnimating(true)

    // Small delay for animation effect
    setTimeout(() => {
      setRole(role) // save role in AuthContext
      navigate("/login") // redirect to login
    }, 400)
  }

  const roles = [
    {
      id: "patient",
      title: "Patient",
      description:
        "Access your health records, book appointments, and track your wellness journey",
      icon: Heart,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      iconColor: "text-blue-600",
      features: [
        "Book appointments",
        "View medical records",
        "Track health metrics",
        "Medication reminders",
        "Wellness insights",
      ],
    },
    {
      id: "doctor",
      title: "Doctor",
      description:
        "Manage patients, access medical tools, and provide comprehensive care",
      icon: Stethoscope,
      color: "bg-green-50 hover:bg-green-100 border-green-200",
      iconColor: "text-green-600",
      features: [
        "Patient management",
        "Medical records access",
        "Prescription tools",
        "Appointment scheduling",
        "Clinical insights",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to HealthCare Portal
          </h1>
          <p className="text-gray-600 text-lg">Choose your role to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id

            return (
              <Card
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`
                  cursor-pointer transition-all duration-300 transform
                  hover:scale-105 hover:shadow-xl
                  ${role.color}
                  ${isSelected ? "ring-2 ring-primary shadow-lg scale-105" : ""}
                  ${isAnimating && isSelected ? "animate-pulse" : ""}
                `}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-white shadow-sm">
                      <Icon className={`h-12 w-12 ${role.iconColor}`} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {role.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {role.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${role.iconColor.replace(
                              "text-",
                              "bg-"
                            )}`}
                          />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className={`
                        w-full transition-all duration-200
                        ${isSelected ? "bg-primary hover:bg-primary/90" : ""}
                      `}
                    >
                      {isSelected ? (
                        <>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Continue as {role.title}
                        </>
                      ) : (
                        `Select ${role.title}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <UserCheck className="w-4 h-4" />
              <span>
                Secure authentication powered by advanced encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
