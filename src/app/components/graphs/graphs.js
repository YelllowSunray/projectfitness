'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter
} from 'recharts';

export default function WorkoutVolumeChart() {
  // Sample data based on the graph
  const data = [
    { date: 'Feb 17', volume: 3600, actualVolume: 3600 },
    { date: 'Feb 18', volume: 3950, actualVolume: 3950 },
    { date: 'Feb 19', volume: 2300, actualVolume: 2230 },
    { date: 'Feb 20', volume: 1600, actualVolume: 1150 },
    { date: 'Feb 21', volume: 1500, actualVolume: 1250 },
    { date: 'Feb 22', volume: 1700, actualVolume: 2450 },
    { date: 'Feb 24', volume: 1650, actualVolume: 1700 },
    { date: 'Feb 25', volume: 1200, actualVolume: 750 },
    { date: 'Feb 26', volume: 700, actualVolume: 0 },
    { date: 'Feb 27', volume: 650, actualVolume: null },
    { date: 'Feb 28', volume: 850, actualVolume: null },
    { date: 'Mar 01', volume: 1300, actualVolume: null },
    { date: 'Mar 02', volume: 2100, actualVolume: null },
    { date: 'Mar 03', volume: 2700, actualVolume: 4500 },
    { date: 'Mar 04', volume: 3100, actualVolume: null },
    { date: 'Mar 05', volume: 3200, actualVolume: 2550 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-center">Total Workout Volume Over Time</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              padding={{ left: 20, right: 20 }} 
              tick={{ fontSize: 12 }}
              label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              domain={[0, 5000]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Total Volume (Sets * Reps * Weight)', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip formatter={(value) => [`${value}`, 'Volume']} />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#2563eb" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 8 }}
            />
            <Scatter 
              dataKey="actualVolume" 
              fill="#000" 
              shape="circle"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}