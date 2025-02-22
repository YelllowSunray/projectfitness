"use client"

import React, { useState } from 'react';

const WorkoutLog = () => {
  const workouts = [
    {
      date: "17/02/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "4x6 benchpress 30kg",
            "2x6 tricep extension",
            "1x5 pushups",
            "2x5 bicep curl"
          ]
        },
        {
          time: "14:30",
          exercises: [
            "3x8 squat 16kg",
            "3x8 Leg press 40kg",
            "3x8 R/L lunges 8kg - support",
            "1x8 Squats 20kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "3x3 deadlift 40kg, pr 60kg",
            "2x6 leg lifts 0kg"
          ]
        },
        {
          time: "18:00",
          exercises: [
            "3x8 pushups"
          ]
        }
      ]
    },
    {
      date: "18/02/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "4x6 bench press 25kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "3x8 lat pulldown 70kg",
            "3x7 row 60kg"
          ]
        },
        {
          time: "18:00",
          exercises: [
            "2x4min Running",
            "2x7 Barbell row 20kg",
            "2x7 dumbbell row 8kg"
          ]
        }
      ]
    },
    {
      date: "19/02/2025",
      sessions: [
        {
          time: "11:30",
          exercises: [
            "2x7 bench press 30kg",
            "2x7 incline bench press 10kg"
          ]
        },
        {
          time: "14:30",
          exercises: [
            "1x3min Running",
            "3x5 Bench press 30kg",
            "4x7 Incline dumbbell press 16kg",
            "2x8 lat raises 8kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "4x8 incline dumbbell press 20kg"
          ]
        },
        {
          time: "19:00",
          exercises: [
            "3x8 pushups"
          ]
        }
      ]
    },
    {
      date: "20/02/2025",
      sessions: [
        {
          time: "13:00",
          exercises: [
            "3x6 dumbbell press 20kg",
            "3x6 bench press 30kg",
            "3x6 bicep curl 12kg"
          ]
        }
      ]
    },
    {
      date: "21/02/25",
      sessions: [
        {
          time: "14:30",
          exercises: [
            "1x30min boxing"
          ]
        },
        {
          time: "16;00",
          exercises: [
            "5x8 Squat 30KG"
          ]
        }
      ]
    }
  ];

  const [activeDay, setActiveDay] = useState("17/02/2025");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Workout Log (17-20 Feb 2025)</h1>
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
      </div>
    </div>
  );
};

export default WorkoutLog;