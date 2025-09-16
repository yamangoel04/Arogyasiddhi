import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Video,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  User,
  Star,
  Download,
  Stethoscope,
  Mic,
  MicOff,
  Play,
  Pause,
  StopCircle,
  Volume2,
  Plus,
  X,
  FileText,
  Camera,
  Upload,
  Zap,
  Brain,
  Heart,
  Activity
} from 'lucide-react';

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
    languages: ["Hindi", "English", "Sanskrit"],
    nextSlot: "2:00 PM Today"
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
    languages: ["Hindi", "English"],
    nextSlot: "2:30 PM Today"
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
    languages: ["English", "Tamil", "Hindi"],
    nextSlot: "10:00 AM Tomorrow"
  }
];

const commonSymptoms = [
  "Digestive issues", "Sleep problems", "Stress & anxiety", "Joint pain",
  "Headaches", "Fatigue", "Skin problems", "Weight management",
  "Cold & cough", "Back pain", "Allergies", "Hair loss",
  "Acidity", "Constipation", "High BP", "Diabetes management"
];

const quickHealthChecks = [
  { id: 1, question: "How is your energy level?", options: ["Very Low", "Low", "Moderate", "High", "Very High"] },
  { id: 2, question: "How is your sleep quality?", options: ["Poor", "Fair", "Good", "Excellent"] },
  { id: 3, question: "How is your digestion?", options: ["Poor", "Irregular", "Good", "Excellent"] },
  { id: 4, question: "Stress level?", options: ["Very High", "High", "Moderate", "Low", "Very Low"] }
];

export default function DoctorConsultation({ user }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState('video');
  const [symptoms, setSymptoms] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  // Health assessment states
  const [showHealthCheck, setShowHealthCheck] = useState(false);
  const [healthAnswers, setHealthAnswers] = useState({});
  const [aiSuggestion, setAiSuggestion] = useState('');

  // UI states
  const [showSymptomHelper, setShowSymptomHelper] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      alert('Microphone access denied. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const generateAISuggestion = () => {
    const suggestions = [
      "Based on your symptoms, consider discussing stress management techniques and digestive health.",
      "Your symptoms suggest you might benefit from Panchakarma therapy and dietary adjustments.",
      "Consider discussing sleep hygiene and herbal remedies for your concerns.",
      "Your health profile indicates potential dosha imbalance - discuss personalized diet plan."
    ];
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, { file, url: e.target.result }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBookConsultation = async () => {
    setIsBooking(true);
    setTimeout(() => {
      alert(`✅ Consultation booked with ${selectedDoctor.name}!`);
      setIsBooking(false);
    }, 2000);
  };

  const startInstantConsultation = (doctorId) => {
    alert(`Starting instant consultation with doctor ${doctorId}...`);
  };

  return (
    <div className="space-y-6 p-4">
      {/* AI Health Assistant */}
      <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-bold text-purple-900">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI Health Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={() => setShowHealthCheck(!showHealthCheck)}
              variant="outline" 
              className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Activity className="w-4 h-4 mr-2" />
              Quick Health Check
            </Button>
            <Button 
              onClick={generateAISuggestion}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get AI Suggestion
            </Button>
          </div>
          
          {aiSuggestion && (
            <div className="p-3 bg-purple-100 rounded-lg text-purple-800 text-sm">
              <strong>💡 AI Suggestion:</strong> {aiSuggestion}
            </div>
          )}

          {showHealthCheck && (
            <div className="space-y-4 mt-4">
              {quickHealthChecks.map((check) => (
                <div key={check.id} className="p-3 bg-white rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">{check.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {check.options.map((option) => (
                      <Button
                        key={option}
                        size="sm"
                        variant={healthAnswers[check.id] === option ? "default" : "outline"}
                        onClick={() => setHealthAnswers(prev => ({ ...prev, [check.id]: option }))}
                        className="text-xs"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Consultation Card */}
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
                <div key={doctor.id} className="p-4 bg-white rounded-xl border hover:shadow-md transition-all hover:border-teal-200">
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
                          <Badge className={`text-xs ${doctor.availability.includes('Available Now') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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

                        <p className="text-xs text-gray-500 mt-1">Next available: {doctor.nextSlot}</p>
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
                            className="border-teal-300 text-teal-600 hover:bg-teal-50"
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
              {/* Doctor Info */}
              <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{selectedDoctor.image}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-teal-600">{selectedDoctor.specialization}</p>
                    <p className="text-sm text-gray-600">{selectedDoctor.consultationFee}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedDoctor(null)}
                  className="border-gray-300"
                >
                  Change Doctor
                </Button>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Consultation Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'video', icon: Video, label: 'Video Call', desc: 'Face-to-face consultation' },
                    { type: 'audio', icon: Phone, label: 'Audio Call', desc: 'Voice only consultation' },
                    { type: 'chat', icon: MessageCircle, label: 'Chat + Voice', desc: 'Text with voice notes' }
                  ].map(({ type, icon: Icon, label, desc }) => (
                    <button
                      key={type}
                      onClick={() => setConsultationType(type)}
                      className={`p-4 border rounded-lg flex flex-col items-center space-y-2 transition-all ${
                        consultationType === type
                          ? 'border-teal-500 bg-teal-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${consultationType === type ? 'text-teal-600' : 'text-gray-400'}`} />
                      <span className={`text-sm font-medium ${consultationType === type ? 'text-teal-900' : 'text-gray-600'}`}>
                        {label}
                      </span>
                      <span className="text-xs text-gray-500 text-center">{desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Symptom Helper */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">
                    Describe Your Health Concerns
                  </label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSymptomHelper(!showSymptomHelper)}
                    className="text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Symptom Helper
                  </Button>
                </div>

                {showSymptomHelper && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800 mb-3">Select common symptoms:</p>
                    <div className="flex flex-wrap gap-2">
                      {commonSymptoms.map((symptom) => (
                        <Button
                          key={symptom}
                          size="sm"
                          variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                          onClick={() => handleSymptomToggle(symptom)}
                          className="text-xs"
                        >
                          {symptom}
                          {selectedSymptoms.includes(symptom) && <X className="w-3 h-3 ml-1" />}
                        </Button>
                      ))}
                    </div>
                    {selectedSymptoms.length > 0 && (
                      <div className="mt-3 p-2 bg-white rounded border">
                        <p className="text-xs text-gray-600">Selected: {selectedSymptoms.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}

                <Textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Please describe your current health concerns, symptoms, or what you'd like to discuss... You can also use voice recording below if typing is difficult."
                  rows={4}
                  className="mb-4"
                />

                {/* Voice Recording Section */}
                {(consultationType === 'chat' || consultationType === 'audio') && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Voice Recording</span>
                      {isRecording && (
                        <div className="flex items-center text-red-600 text-sm">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
                          Recording: {formatTime(recordingTime)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {!isRecording ? (
                        <Button
                          onClick={startRecording}
                          className="bg-red-600 hover:bg-red-700 flex-1"
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Start Recording
                        </Button>
                      ) : (
                        <Button
                          onClick={stopRecording}
                          className="bg-gray-600 hover:bg-gray-700 flex-1"
                        >
                          <StopCircle className="w-4 h-4 mr-2" />
                          Stop Recording
                        </Button>
                      )}
                      
                      {audioBlob && (
                        <Button
                          onClick={playAudio}
                          variant="outline"
                          className="flex-1"
                          disabled={isPlaying}
                        >
                          {isPlaying ? (
                            <Volume2 className="w-4 h-4 mr-2" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          {isPlaying ? 'Playing...' : 'Play Recording'}
                        </Button>
                      )}
                    </div>

                    {audioBlob && (
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                        ✅ Voice recording ready to send to doctor
                      </div>
                    )}
                    
                    <audio ref={audioRef} className="hidden" />
                  </div>
                )}

                {/* Image Upload */}
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Upload Images (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm"
                    >
                      <Camera className="w-4 h-4" />
                      Add Photos
                    </label>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img.url}
                            alt={`Upload ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                  <p><strong>Consultation:</strong> {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} consultation</p>
                  <p><strong>Fee:</strong> {selectedDoctor.consultationFee}</p>
                  {selectedSymptoms.length > 0 && (
                    <p><strong>Symptoms:</strong> {selectedSymptoms.slice(0, 3).join(', ')}{selectedSymptoms.length > 3 && '...'}</p>
                  )}
                  {preferredTime && (
                    <p><strong>Scheduled:</strong> {new Date(preferredTime).toLocaleString()}</p>
                  )}
                  {audioBlob && (
                    <p><strong>Voice Note:</strong> ✅ Recorded</p>
                  )}
                  {uploadedImages.length > 0 && (
                    <p><strong>Images:</strong> {uploadedImages.length} uploaded</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleBookConsultation}
                  disabled={isBooking || (!symptoms && selectedSymptoms.length === 0 && !audioBlob) || !preferredTime}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 py-3"
                >
                  {isBooking ? 'Booking...' : `Book Consultation - ${selectedDoctor.consultationFee}`}
                </Button>
                
                <Button
                  variant="outline"
                  className="px-6 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}