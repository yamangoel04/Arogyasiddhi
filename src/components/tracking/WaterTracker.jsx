import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplet, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WaterTracker({ current, target, onAdd }) {
  const percentage = (current / target) * 100;

  return (
    <Card className="glass-effect border-0 rounded-2xl h-32">
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplet className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-semibold text-green-900">Water</span>
          </div>
          <Button
            size="sm"
            onClick={onAdd}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 p-0"
            disabled={current >= target}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{current}</div>
            <div className="text-xs text-green-700">/ {target} glasses</div>
          </div>
        </div>

        <div className="flex space-x-1">
          {Array.from({ length: target }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`flex-1 h-2 rounded-full ${
                index < current ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}