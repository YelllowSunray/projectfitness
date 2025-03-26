// components/graphs/graphs3.js

"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";
import { parse, format, isValid } from "date-fns";
import { getWorkoutData } from "lib/googleSheets";

const WorkoutVisualization = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getWorkoutData();
        console.log('Fetched data:', data);
        setWorkoutData(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch workout data", error);
        setError(error.message || "Failed to fetch workout data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process the raw data
  const processedData = useMemo(() => {
    if (!workoutData || !workoutData.length) {
      console.log('No workout data to process');
      return { liftProgression: {}, volumeData: [] };
    }

    console.log('Processing workout data:', workoutData);

    // Ensure we have headers and data rows
    const rows = workoutData.length > 0 && workoutData[0][0] === "DateTime" 
      ? workoutData.slice(1) 
      : workoutData;

    if (!rows.length) {
      console.log('No rows to process after filtering');
      return { liftProgression: {}, volumeData: [] };
    }

    console.log('Processing rows:', rows);

    const liftProgression = {
      deadlift: [],
      benchPress: [],
      squat: [],
    };

    // Total volume calculation
    const volumeByDay = {};

    rows.forEach((row) => {
      // Make sure the row has expected data
      if (!row || row.length < 5) {
        console.warn('Skipping invalid row:', row);
        return;
      }

      const [dateStr, timeStr, exercise, setsxReps, weightOrAssist] = row;

      // Ensure dateStr is defined before parsing
      if (!dateStr) {
        console.warn(`Missing date for row: ${row}`);
        return;
      }

      let parsedDate;
      try {
        // Try parsing with dd/MM/yyyy format
        parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());
        
        // If invalid, try MM/dd/yyyy format
        if (!isValid(parsedDate)) {
          parsedDate = parse(dateStr, "MM/dd/yyyy", new Date());
        }
      } catch (e) {
        console.warn(`Error parsing date ${dateStr}:`, e);
        return;
      }

      // If parsed date is still invalid, skip the row
      if (!isValid(parsedDate)) {
        console.warn(`Invalid date format for: ${dateStr}`);
        return;
      }

      const formattedDate = format(parsedDate, "yyyy-MM-dd");
      const timestamp = new Date(formattedDate).getTime();

      // Extract numeric weight
      const extractWeight = (weightStr) => {
        if (!weightStr || weightStr === "?" || weightStr === "-") return 0;
        const match = weightStr.match(/(\d+)/);
        return match ? parseFloat(match[1]) : 0;
      };

      // Parse sets and reps
      const parseSetsReps = (setsxReps) => {
        if (!setsxReps) return { sets: 0, reps: 0 };
        const match = setsxReps.match(/(\d+)x(\d+)/);
        return match
          ? { sets: parseInt(match[1]), reps: parseInt(match[2]) }
          : { sets: 0, reps: 0 };
      };

      // Track key lifts progression
      const weight = extractWeight(weightOrAssist);
      const { sets, reps } = parseSetsReps(setsxReps);
      const volume = weight * sets * reps;

      if (volume <= 0) {
        console.log(`Skipping zero volume for ${exercise} on ${formattedDate}`);
        return;
      }

      // Categorize lifts
      if (exercise && exercise.toLowerCase().includes("deadlift")) {
        liftProgression.deadlift.push({
          date: timestamp,
          weight,
          volume,
        });
      }
      if (exercise && exercise.toLowerCase().includes("bench press")) {
        liftProgression.benchPress.push({
          date: timestamp,
          weight,
          volume,
        });
      }
      if (exercise && exercise.toLowerCase().includes("squat")) {
        liftProgression.squat.push({
          date: timestamp,
          weight,
          volume,
        });
      }

      // Calculate total daily volume
      volumeByDay[formattedDate] = (volumeByDay[formattedDate] || 0) + volume;
    });

    // Convert volume by day to array for plotting
    const volumeData = Object.entries(volumeByDay)
      .map(([date, volume]) => ({
        date: new Date(date).getTime(),
        volume,
      }))
      .sort((a, b) => a.date - b.date);

    console.log('Processed lift progression:', liftProgression);
    console.log('Processed volume data:', volumeData);

    return { liftProgression, volumeData };
  }, [workoutData]);

  if (loading) {
    return <div className="text-center p-4">Loading workout data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  if (!workoutData || workoutData.length === 0) {
    return <div className="text-center p-4">No workout data available</div>;
  }

  return (
    <div className="w-full">
      <div className="h-96 w-full mb-8">
        <h2 className="text-xl font-bold mb-4">Key Lifts Progression</h2>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid />
            <XAxis
              dataKey="date"
              type="number"
              name="Date"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(timestamp) => format(new Date(timestamp), "yyyy-MM-dd")}
            />
            <YAxis dataKey="weight" type="number" name="Weight (kg)" />
            <Tooltip 
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name) => [value, name === "weight" ? "Weight (kg)" : name]}
              labelFormatter={(timestamp) => format(new Date(timestamp), "yyyy-MM-dd")}
            />
            <Legend />
            <Scatter
              name="Deadlift"
              data={processedData.liftProgression.deadlift}
              fill="#8884d8"
            />
            <Scatter
              name="Bench Press"
              data={processedData.liftProgression.benchPress}
              fill="#82ca9d"
            />
            <Scatter
              name="Squat"
              data={processedData.liftProgression.squat}
              fill="#ffc658"
            />
            <Line
              type="monotone"
              data={processedData.liftProgression.deadlift}
              dataKey="weight"
              stroke="#8884d8"
              strokeWidth={2}
              name="Deadlift Progress"
              dot={false}
            />
            <Line
              type="monotone"
              data={processedData.liftProgression.benchPress}
              dataKey="weight"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Bench Press Progress"
              dot={false}
            />
            <Line
              type="monotone"
              data={processedData.liftProgression.squat}
              dataKey="weight"
              stroke="#ffc658"
              strokeWidth={2}
              name="Squat Progress"
              dot={false}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="h-96 w-full">
        <h2 className="text-xl font-bold mb-4">Daily Exercise Volume</h2>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={processedData.volumeData}>
            <CartesianGrid />
            <XAxis
              dataKey="date"
              tickFormatter={(timestamp) => format(new Date(timestamp), "yyyy-MM-dd")}
            />
            <YAxis label={{ value: "Volume (kg)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              formatter={(value) => [`${value} kg`, "Volume"]}
              labelFormatter={(timestamp) => format(new Date(timestamp), "yyyy-MM-dd")}
            />
            <Legend />
            <Scatter dataKey="volume" fill="#8884d8" name="Daily Volume" />
            <Line 
              type="monotone" 
              dataKey="volume" 
              stroke="#82ca9d" 
              name="Trend Line" 
              dot={false} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutVisualization;
