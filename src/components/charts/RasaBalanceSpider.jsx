import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

export default function RasaBalanceSpider({ data }) {
  const chartData = data.map(item => ({
    rasa: item.rasa,
    current: item.value,
    optimal: item.optimal,
    fullMark: 40
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      const currentData = payload[0];
      const optimalData = payload[1];
      
      return (
        <div className="bg-white p-3 border border-green-200 rounded-lg shadow-lg">
          <p className="text-green-900 font-semibold">{label}</p>
          {currentData && (
            <p className="text-green-700 text-sm">Current: {currentData.value}%</p>
          )}
          {optimalData && (
            <p className="text-green-600 text-sm">Optimal: {optimalData.value}%</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="rasa" 
            tick={{ fill: '#374151', fontSize: 8, fontWeight: 'bold' }}
          />
          <Radar
            name="Current"
            dataKey="current"
            stroke="#16a34a"
            fill="#16a34a"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{ fill: '#16a34a', strokeWidth: 2, r: 2 }}
          />
          <Radar
            name="Optimal"
            dataKey="optimal"
            stroke="#94a3b8"
            fill="transparent"
            strokeWidth={2}
            strokeDasharray="3,3"
            dot={false}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}