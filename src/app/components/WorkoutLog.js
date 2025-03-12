'use client';
import React, { useState, useEffect } from 'react';

const WorkoutLog = () => {
  const [workouts, setWorkouts] = useState([]);
  const [activeDay, setActiveDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('');

  useEffect(() => {
    // Fetch data from Google Sheets when the component mounts
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const sheetId = '1HGgOSGOcFKdr4GrNHb_ftJSIEH8Vp1RYn2EKiDDGOi8'; // Your Google Sheet ID
        const range = 'ExerciseLogV3!A1:E'; // Using the correct sheet name
        const apiKey = 'AIzaSyBvT3PAmGUn9dVBtERiN2o5sA3-A3M0Rsw';
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data || !data.values) {
          throw new Error('No data received from Google Sheets');
        }
        
        const formattedWorkouts = formatWorkoutData(data.values);
        setWorkouts(formattedWorkouts);
        
        // Set the active day to the first day in the list
        if (formattedWorkouts.length > 0 && !activeDay) {
          setActiveDay(formattedWorkouts[0].date);
        }
        
        // Calculate date range for display
        if (formattedWorkouts.length > 0) {
          const firstDate = formattedWorkouts[0].date;
          const lastDate = formattedWorkouts[formattedWorkouts.length - 1].date;
          setDateRange(`${firstDate} - ${lastDate}`);
        }
        
        setError(null);
      } catch (error) {
        console.error('Error fetching workout data:', error);
        setError('Failed to load workout data. Please try again later.');
        if (error.message && error.message.includes('API key not valid')) {
          setError('API key is invalid or has insufficient permissions');
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Call fetchData initially and then every 5 minutes (300000 ms)
    fetchData(); // Initial call
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes
    
    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, [activeDay]);

  // Function to format the Google Sheets data into the desired structure
  const formatWorkoutData = (data) => {
    // Create a map to store workouts by day
    const workoutsByDay = new Map();
    
    // Skip the header row and process the rest of the data
    data.slice(1).forEach((row) => {
      if (!row[0]) return; // Skip rows without dates
      
      const date = row[0]; // Original date string
      const time = row[1] || "00:00"; // Default time if missing
      const exercise = row[2] || "Unknown";
      const setsReps = row[3] || "";
      const weight = row[4] || "";
      
      // Create or get the day entry
      if (!workoutsByDay.has(date)) {
        workoutsByDay.set(date, {
          date: date,
          sessions: []
        });
      }
      
      const day = workoutsByDay.get(date);
      
      // Find or create session for this time
      let session = day.sessions.find(s => s.time === time);
      if (!session) {
        session = {
          time: time,
          exercises: []
        };
        day.sessions.push(session);
      }
      
      // Format and add the exercise
      const exerciseString = `${setsReps} ${exercise} ${weight}`.trim();
      if (exerciseString) {
        session.exercises.push(exerciseString);
      }
    });
    
    // Convert the map to an array and return
    return Array.from(workoutsByDay.values());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Workout Log {dateRange && `(${dateRange})`}</h1>
        
        {isLoading && <p className="text-gray-600">Loading workout data...</p>}
        
        {error && <p className="p-3 bg-red-100 text-red-700 rounded-md mb-4">{error}</p>}
        
        {!isLoading && !error && workouts.length === 0 && (
          <p className="text-gray-600">No workout sessions found. Start logging your workouts!</p>
        )}
        
        {workouts.length > 0 && (
          <>
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {workouts.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setActiveDay(day.date)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeDay === day.date
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {day.date}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {workouts
                .find((day) => day.date === activeDay)
                ?.sessions.map((session) => (
                  <div
                    key={`${activeDay}-${session.time}`}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      {session.time}
                    </h3>
                    <ul className="list-disc ml-6 space-y-2">
                      {session.exercises.map((exercise, exIdx) => (
                        <li
                          key={`${activeDay}-${session.time}-${exIdx}`}
                          className="text-gray-600"
                        >
                          {exercise}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;