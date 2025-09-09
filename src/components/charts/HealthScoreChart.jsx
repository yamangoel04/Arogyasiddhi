import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function HealthScoreCard({ data }) {
  const score = data?.score ?? 0;
  const compliance = data?.compliance ?? 0;
  const doshaBalance = data?.doshaBalance ?? 0;
  const agni = data?.agni ?? 0;


  const pieData = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const COLORS = ["#16a34a", "#e5e7eb"]; // green + gray

  return (
    <div className="relative h-60 w-full flex flex-col items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={true}
            animationDuration={1000}
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Center score display */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl md:text-5xl font-bold text-green-800">
          {score}%
        </div>
        <div className="text-sm font-medium text-green-700">
          Health Score
        </div>
      </div>

      {/* Breakdown section */}
      <div className="grid grid-cols-3 gap-4 text-center w-full mt-[-15px]">
        <div>
          <div className="font-bold text-lg text-green-900">{compliance}%</div>
          <div className="text-xs text-green-700">Compliance</div>
        </div>
        <div>
          <div className="font-bold text-lg text-green-900">{doshaBalance}%</div>
          <div className="text-xs text-green-700">Dosha Balance</div>
        </div>
        <div>
          <div className="font-bold text-lg text-green-900">{agni}%</div>
          <div className="text-xs text-green-700">Agni Score</div>
        </div>
      </div>
    </div>
  );
}
