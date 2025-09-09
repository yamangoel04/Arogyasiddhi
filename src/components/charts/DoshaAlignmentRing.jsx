import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function DoshaAlignmentRing({ data }) {
  const chartData = [
    { name: 'Vata', value: data.vata.current, color: '#3b82f6', status: data.vata.status },
    { name: 'Pitta', value: data.pitta.current, color: '#ef4444', status: data.pitta.status },
    { name: 'Kapha', value: data.kapha.current, color: '#22c55e', status: data.kapha.status }
  ];

  const overallAlignment = Math.round(
    (chartData.reduce((sum, dosha) => sum + (dosha.status === 'perfect' ? 100 : dosha.status === 'balanced' ? 80 : 60), 0) / 3)
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0 && payload[0].payload) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
          <p className="text-green-900 font-semibold">{data.name}</p>
          <p className="text-green-700 text-sm">Current: {data.value}%</p>
          <p className="text-green-600 text-sm capitalize">Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-40 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={55}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-800">{overallAlignment}%</div>
          <div className="text-xs text-green-600 font-medium">Aligned</div>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-1">
        {chartData.map((dosha) => (
          <div key={dosha.name} className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: dosha.color }}
              />
              <span className="text-xs font-semibold text-gray-700">{dosha.name}</span>
            </div>
            <div className="text-xs text-gray-600">{dosha.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}