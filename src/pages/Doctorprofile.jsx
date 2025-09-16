// src/pages/DoctorProfile.jsx
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Edit,
  Save,
  Award,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

// ✅ FIXED: consistent name
const doctorProfileData = {
  name: "Dr. Maria Rodriguez",
  title: "Cardiologist",
  specialization: "Interventional Cardiology",
  experience: "15 years",
  education: [
    "MD - Harvard Medical School (2008)",
    "Residency - Johns Hopkins Hospital (2012)",
    "Fellowship - Mayo Clinic (2014)",
  ],
  certifications: [
    "Board Certified in Cardiology",
    "Board Certified in Interventional Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
    "Basic Life Support (BLS)",
  ],
  contact: {
    phone: "+1 (555) 987-6543",
    email: "dr.rodriguez@medicare.com",
    address: "123 Medical Center Dr, Suite 400, Healthcare City, HC 12345",
  },
  bio: "Dr. Maria Rodriguez is a highly experienced cardiologist specializing in interventional procedures. She has been practicing for over 15 years and has performed thousands of cardiac catheterizations and interventions.",
  achievements: [
    "Top Doctor Award 2023",
    "Excellence in Patient Care 2022",
    "Research Publication Award 2021",
    "Community Service Recognition 2020",
  ],
};

export default function DoctorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctorProfileData); // ✅ FIXED

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved:", formData);
    // TODO: send to backend
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/doctor-avatar.jpg" alt="Doctor" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{formData.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {formData.title} • {formData.specialization}
            </p>
            <p className="text-sm">{formData.experience} experience</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() =>
              isEditing ? handleSave() : setIsEditing(true)
            }
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
          </Button>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="about">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {/* About */}
        <TabsContent value="about">
          <Card>
            <CardContent className="p-4">
              {isEditing ? (
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              ) : (
                <p>{formData.bio}</p>
              )}

              <div className="mt-4">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" /> Achievements
                </h3>
                <ul className="list-disc ml-5">
                  {formData.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education">
          <Card>
            <CardContent className="p-4 space-y-2">
              {formData.education.map((edu, i) => (
                <div key={i} className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {edu}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact */}
        <TabsContent value="contact">
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" /> {formData.contact.phone}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" /> {formData.contact.email}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> {formData.contact.address}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
