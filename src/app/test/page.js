"use client"

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter } from "recharts";

const workoutData = {
  maxWeight: [
    { date: "Feb 17", benchPress: 30, squat: 20, deadlift: 40 },
    { date: "Feb 24", benchPress: 32, squat: 30, deadlift: 60 },
    { date: "Mar 03", benchPress: 30, squat: 30, deadlift: 50 },
  ],
  benchPress: [
    { date: "Feb 17", maxWeight: 30, totalVolume: 500 },
    { date: "Feb 24", maxWeight: 32, totalVolume: 1500 },
    { date: "Mar 03", maxWeight: 30, totalVolume: 2400 },
  ],
  totalVolume: [
    { date: "Feb 17", totalVolume: 3500 },
    { date: "Feb 24", totalVolume: 1200 },
    { date: "Mar 03", totalVolume: 4200 },
  ],
};

const Chart = ({ title, data, lines, yLabel }) => (
  <div>
    <h2>{title}</h2>
    <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: yLabel, angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      {lines.map((line, index) => (
        <Line key={index} type="monotone" dataKey={line.key} stroke={line.color} dot={{ r: 3 }} />
      ))}
    </LineChart>
  </div>
);

const App = () => {
  return (
    <div>
      <h1>Workout Progress</h1>
      <Chart
        title="Max Weight Lifted Over Time"
        data={workoutData.maxWeight}
        lines={[{ key: "benchPress", color: "red" }, { key: "squat", color: "blue" }, { key: "deadlift", color: "green" }]}
        yLabel="Max Weight (kg)"
      />
      <Chart
        title="Bench Press Progression Over Time"
        data={workoutData.benchPress}
        lines={[{ key: "maxWeight", color: "red" }, { key: "totalVolume", color: "cyan" }]}
        yLabel="Metric Value"
      />
      <Chart
        title="Total Workout Volume Over Time"
        data={workoutData.totalVolume}
        lines={[{ key: "totalVolume", color: "blue" }]}
        yLabel="Total Volume"
      />
    </div>
  );
};

export default App;
