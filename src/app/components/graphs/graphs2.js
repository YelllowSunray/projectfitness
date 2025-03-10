'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter
} from 'recharts';

export default function MaxWeightChart() {
  // Sample data based on the graph
  const data = [
    { date: 'Feb 17', deadlift: 40, benchPress: 29, squat: 16, benchPressActual: 30, deadliftActual: null, squatActual: null },
    { date: 'Feb 18', deadlift: 44, benchPress: 28, squat: 18, benchPressActual: 25, deadliftActual: null, squatActual: null },
    { date: 'Feb 19', deadlift: 48, benchPress: 29, squat: 21, benchPressActual: 30, deadliftActual: null, squatActual: null },
    { date: 'Feb 20', deadlift: 52, benchPress: 30, squat: 24, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 21', deadlift: 56, benchPress: 31, squat: 27, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 22', deadlift: 59, benchPress: 32, squat: 30, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 23', deadlift: 60, benchPress: 31, squat: 31, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 24', deadlift: 58, benchPress: 30, squat: 31, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 25', deadlift: 55, benchPress: 30, squat: 30, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 26', deadlift: 53, benchPress: 31, squat: 28, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Feb 27', deadlift: 50, benchPress: 33, squat: 25, benchPressActual: 35, deadliftActual: null, squatActual: null },
    { date: 'Feb 28', deadlift: 49, benchPress: 34, squat: 23, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Mar 01', deadlift: 48, benchPress: 34, squat: 20, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Mar 02', deadlift: 49, benchPress: 33, squat: 25, benchPressActual: null, deadliftActual: null, squatActual: null },
    { date: 'Mar 03', deadlift: 50, benchPress: 30, squat: 30, benchPressActual: null, deadliftActual: 50, squatActual: null },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-center">Max Weight Lifted Over Time</h2>
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
              domain={[10, 65]}
              tick={{ fontSize: 12 }}
              label={{ value: 'Max Weight (kg)', angle: -90, position: 'insideLeft', offset: 10 }}
            />
            <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
            <Legend verticalAlign="top" height={36} />
            
            {/* Lines for trend data */}
            <Line 
              type="monotone" 
              dataKey="benchPress" 
              stroke="#ff4d4d" 
              strokeWidth={2} 
              dot={false} 
              name="Bench Press"
            />
            <Line 
              type="monotone" 
              dataKey="deadlift" 
              stroke="#00b300" 
              strokeWidth={2} 
              dot={false}
              name="Deadlift" 
            />
            <Line 
              type="monotone" 
              dataKey="squat" 
              stroke="#3399ff" 
              strokeWidth={2} 
              dot={false}
              name="Squat" 
            />
            
            {/* Scatter points for actual data points */}
            <Scatter 
              dataKey="benchPressActual" 
              fill="#ff4d4d" 
              name="Bench Press (Actual)" 
              shape="circle"
              legendType="none"
            />
            <Scatter 
              dataKey="deadliftActual" 
              fill="#00b300" 
              name="Deadlift (Actual)" 
              shape="circle"
              legendType="none"
            />
            <Scatter 
              dataKey="squatActual" 
              fill="#3399ff" 
              name="Squat (Actual)" 
              shape="circle"
              legendType="none"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}