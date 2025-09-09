import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search, Camera, Mic, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickAddMeal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        className="w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="glass-effect border-0 rounded-t-3xl">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-green-900">Quick Add Meal</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
              <Input
                placeholder="Search food (e.g., 2 roti, dal)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 border-green-200 rounded-xl focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="h-20 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl flex flex-col items-center justify-center space-y-1"
              >
                <Camera className="w-6 h-6" />
                <span className="text-xs font-medium">Photo</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl flex flex-col items-center justify-center space-y-1"
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs font-medium">Barcode</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl flex flex-col items-center justify-center space-y-1"
              >
                <Mic className="w-6 h-6" />
                <span className="text-xs font-medium">Voice</span>
              </Button>
            </div>

            <Button
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl"
              onClick={onClose}
            >
              Add to Today's Plan
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}