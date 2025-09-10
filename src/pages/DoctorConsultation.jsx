import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
Video,
Phone,
MessageCircle,
Calendar,
Clock,
User,
Star,
Download,
Stethoscope
} from 'lucide-react';
import { generatePdf } from '@/services/pdfService';

const availableDoctors = [
{
id: 1,
name: "Dr. Priya Sharma",
specialization: "Ayurvedic Nutrition",
experience: "15 years",
rating: 4.9,
availability: "Available Now",
consultationFee: "₹500",
image: "👩‍⚕️",
languages: ["Hindi", "English", "Sanskrit"]
},
{
id: 2,
name: "Dr. Rajesh Gupta",
specialization: "Panchakarma & Detox",
experience: "20 years",
rating: 4.8,
availability: "Next: 2:30 PM",
consultationFee: "₹750",
image: "👨‍⚕️",
languages: ["Hindi", "English"]
},
{
id: 3,
name: "Dr. Meera Iyer",
specialization: "Women's Ayurvedic Health",
experience: "12 years",
rating: 4.9,
availability: "Next: Tomorrow 10 AM",
consultationFee: "₹600",
image: "👩‍⚕️",
languages: ["English", "Tamil", "Hindi"]
}
];

export default function DoctorConsultation({ user }) {
const [selectedDoctor, setSelectedDoctor] = useState(null);
const [consultationType, setConsultationType] = useState('video');
const [symptoms, setSymptoms] = useState('');
const [preferredTime, setPreferredTime] = useState('');
const [isBooking, setIsBooking] = useState(false);

const handleBookConsultation = async () => {
setIsBooking(true);

// Simulate booking process
setTimeout(() => {
alert(`✅ Consultation booked with ${selectedDoctor.name}!`);
setIsBooking(false);
generateConsultationPDF();
}, 2000);
};


const generateConsultationPDF = () => {
  const consultationData = {
    doctor: selectedDoctor?.name,
    specialization: selectedDoctor?.specialization,
    patient: user?.displayName || user?.email || "N/A",
    type: consultationType,
    symptoms,
    scheduledTime: preferredTime,
    bookingDate: new Date().toLocaleDateString(),
  };

  generatePdf(consultationData); // <-- Call the service here
};

return (
<div className="space-y-6">
<Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50">
<CardHeader>
<CardTitle className="flex items-center text-xl font-bold text-teal-900">
<Stethoscope className="w-6 h-6 mr-2 text-teal-600" />
Consult Ayurvedic Doctors
</CardTitle>
<p className="text-teal-700">Get personalized guidance from certified Ayurvedic practitioners</p>
</CardHeader>
<CardContent>
{!selectedDoctor ? (
<div className="space-y-4">
{availableDoctors.map((doctor) => (
<div key={doctor.id} className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex items-start space-x-4">
<span className="text-4xl">{doctor.image}</span>
<div className="flex-1">
<h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
<p className="text-teal-600 font-medium">{doctor.specialization}</p>
<p className="text-sm text-gray-600">{doctor.experience} experience</p>

<div className="flex items-center space-x-4 mt-2">
<div className="flex items-center">
<Star className="w-4 h-4 text-yellow-400 fill-current" />
<span className="ml-1 text-sm font-medium">{doctor.rating}</span>
</div>
<Badge className="bg-green-100 text-green-800 text-xs">
{doctor.availability}
</Badge>
</div>

<div className="flex flex-wrap gap-1 mt-2">
{doctor.languages.map((lang) => (
<Badge key={lang} variant="outline" className="text-xs">
{lang}
</Badge>
))}
</div>
</div>
</div>

<div className="text-right">
<p className="text-lg font-bold text-teal-600">{doctor.consultationFee}</p>
<div className="flex flex-col space-y-2 mt-3">
<Button
size="sm"
onClick={() => setSelectedDoctor(doctor)}
className="bg-teal-600 hover:bg-teal-700"
>
Book Now
</Button>
{doctor.availability === "Available Now" && (
<Button
size="sm"
variant="outline"
onClick={() => startInstantConsultation(doctor.id)}
className="border-teal-300 text-teal-600"
>
<Video className="w-3 h-3 mr-1" />
Start Now
</Button>
)}
</div>
</div>
</div>
</div>
))}
</div>
) : (
<div className="space-y-6">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-4">
<span className="text-4xl">{selectedDoctor.image}</span>
<div>
<h3 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h3>
<p className="text-teal-600">{selectedDoctor.specialization}</p>
</div>
</div>
<Button
variant="outline"
onClick={() => setSelectedDoctor(null)}
className="border-gray-300"
>
Choose Different Doctor
</Button>
</div>

{/* Consultation Type */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-3">
Consultation Type
</label>
<div className="grid grid-cols-3 gap-3">
{[
{ type: 'video', icon: Video, label: 'Video Call' },
{ type: 'audio', icon: Phone, label: 'Audio Call' },
{ type: 'chat', icon: MessageCircle, label: 'Chat Only' }
].map(({ type, icon: Icon, label }) => (
<button
key={type}
onClick={() => setConsultationType(type)}
className={`p-3 border rounded-lg flex flex-col items-center space-y-2 transition-colors ${
consultationType === type
? 'border-teal-500 bg-teal-50'
: 'border-gray-200 hover:border-gray-300'
}`}
>
<Icon className={`w-6 h-6 ${consultationType === type ? 'text-teal-600' : 'text-gray-400'}`} />
<span className={`text-sm font-medium ${consultationType === type ? 'text-teal-900' : 'text-gray-600'}`}>
{label}
</span>
</button>
))}
</div>
</div>

{/* Symptoms/Reason */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Describe your symptoms or reason for consultation
</label>
<Textarea
value={symptoms}
onChange={(e) => setSymptoms(e.target.value)}
placeholder="Please describe your current health concerns, symptoms, or what you'd like to discuss..."
rows={4}
/>
</div>

{/* Preferred Time */}
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Preferred Date & Time
</label>
<Input
type="datetime-local"
value={preferredTime}
onChange={(e) => setPreferredTime(e.target.value)}
min={new Date().toISOString().slice(0, 16)}
/>
</div>

{/* Booking Summary */}
<div className="p-4 bg-teal-50 rounded-lg">
<h4 className="font-semibold text-teal-900 mb-2">Booking Summary</h4>
<div className="space-y-1 text-sm text-teal-800">
<p><strong>Doctor:</strong> {selectedDoctor.name}</p>
<p><strong>Consultation:</strong> {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} call</p>
<p><strong>Fee:</strong> {selectedDoctor.consultationFee}</p>
{preferredTime && (
<p><strong>Scheduled:</strong> {new Date(preferredTime).toLocaleString()}</p>
)}
</div>
</div>

<Button
onClick={handleBookConsultation}
disabled={isBooking || !symptoms || !preferredTime}
className="w-full bg-teal-600 hover:bg-teal-700 py-3"
>
{isBooking ? 'Booking...' : `Book Consultation - ${selectedDoctor.consultationFee}`}
</Button>
</div>
)}
<Button
  onClick={() =>
    generatePDF({
      doctor: selectedDoctor,
      patient: user,
      type: consultationType,
      symptoms,
      scheduledTime: preferredTime,
      bookingDate: new Date().toLocaleDateString(),
    })
  }
  className="w-full mt-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-md flex items-center justify-center gap-2"
>
  📄 Generate Consultation PDF
</Button>
</CardContent>
</Card>
</div>
);
}

