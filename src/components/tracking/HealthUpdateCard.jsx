import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Flame, Droplet, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HealthScoreCard({ score, streaks }) {
  return (
    <Card className="glass-effect border-0 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-1">
        <div className="bg-white/95 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-green-900">Health Score</h3>
              <p className="text-sm text-green-700">Keep up the great work!</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-4xl font-bold text-green-600"
            >
              {score}
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800 text-xs font-bold">
                {streaks.hydration} Day Streak
              </Badge>
              <p className="text-xs text-gray-600 mt-1">Hydration</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800 text-xs font-bold">
                {streaks.compliance} Day Streak
              </Badge>
              <p className="text-xs text-gray-600 mt-1">Compliance</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-800 text-xs font-bold">
                {streaks.agni} Day Streak
              </Badge>
              <p className="text-xs text-gray-600 mt-1">Agni</p>
            </motion.div>
          </div>
        </div>
      </div>
    </Card>
  );
}