// components/graphs/graphs3.js

"use client";

import { useMemo } from "react";
import React, { useState, useEffect } from "react";
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
import { parse, format, isValid } from "date-fns"; // Import `isValid`
import { getWorkoutData } from "lib/googleSheets";

const WorkoutVisualization = () => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWorkoutData();
        setWorkoutData(data);
      } catch (error) {
        console.error("Failed to fetch workout data", error);
      }
    };

    fetchData();
  }, []);

  // Process the raw data
  const processedData = useMemo(() => {
    if (!workoutData.length) return { liftProgression: {}, volumeData: [] };

    const rows =
      workoutData.length > 0 && workoutData[0][0] === "DateTime"
        ? workoutData.slice(1)
        : workoutData;

    const liftProgression = {
      deadlift: [],
      benchPress: [],
      squat: [],
    };

    // Total volume calculation
    const volumeByDay = {};

    rows.forEach((row) => {
      const [dateStr, timeStr, exercise, setsxReps, weightOrAssist] = row;

      // Ensure dateStr is defined before parsing
      if (!dateStr) {
        console.error(`Missing date for row: ${row}`);
        return;
      }

      // Check if the date is valid before parsing
      const parsedDate = parse(dateStr, "dd/MM/yyyy", new Date());

      // If parsed date is invalid, log the error and skip the row
      if (!isValid(parsedDate)) {
        console.error(`Invalid date format for row: ${row}`);
        return;
      }

      const formattedDate = format(parsedDate, "yyyy-MM-dd");

      // Convert to timestamp for sorting/graphing
      const timestamp = new Date(formattedDate).getTime();

      // Extract numeric weight
      const extractWeight = (weightStr) => {
        if (!weightStr || weightStr === "?" || weightStr === "-") return 0;
        const match = weightStr.match(/(\d+)/);
        return match ? parseFloat(match[1]) : 0;
      };

      // Parse sets and reps
      const parseSetsReps = (setsxReps) => {
        const match = setsxReps.match(/(\d+)x(\d+)/);
        return match
          ? { sets: parseInt(match[1]), reps: parseInt(match[2]) }
          : { sets: 0, reps: 0 };
      };

      // Track key lifts progression
      const weight = extractWeight(weightOrAssist);
      const { sets, reps } = parseSetsReps(setsxReps);
      const volume = weight * sets * reps;

      // Categorize lifts
      if (exercise.toLowerCase().includes("deadlift")) {
        liftProgression.deadlift.push({
          date: timestamp, // Use timestamp for sorting
          weight,
          volume,
        });
      }
      if (exercise.toLowerCase().includes("bench press")) {
        liftProgression.benchPress.push({
          date: timestamp, // Use timestamp for sorting
          weight,
          volume,
        });
      }
      if (exercise.toLowerCase().includes("squat")) {
        liftProgression.squat.push({
          date: timestamp, // Use timestamp for sorting
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
        date: new Date(date).getTime(), // Convert date to timestamp
        volume,
      }))
      .sort((a, b) => a.date - b.date);

    return { liftProgression, volumeData };
  }, [workoutData]);

  // Render only if data is available
  if (workoutData.length === 0) {
    return <div>Loading workout data...</div>;
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
              type="number" // Use number for timestamp
              name="Date"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(timestamp) => format(new Date(timestamp), "yyyy-MM-dd")}
            />
            <YAxis dataKey="weight" type="number" name="Weight (kg)" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
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
            {/* Plot the curves as Lines for each lift */}
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
            <Tooltip />
            <Legend />
            <Scatter dataKey="volume" fill="#8884d8" name="Daily Volume" />
            <Line type="monotone" dataKey="volume" stroke="#82ca9d" name="Trend Line" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutVisualization;
