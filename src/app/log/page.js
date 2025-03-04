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
            "4x6 Bench Press 30kg",
            "2x6 Tricep Extension",
            "1x5 Push-ups Bodyweight",
            "2x5 Bicep Curl"
          ]
        },
        {
          time: "14:30",
          exercises: [
            "3x8 Squat 16kg",
            "3x8 Leg Press 40kg",
            "3x8 Lunges (R/L) 8kg",
            "1x8 Squats 20kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "3x3 Deadlift 40kg, PR 60kg",
            "2x6 Leg Lifts 60kg"
          ]
        },
        {
          time: "18:00",
          exercises: [
            "3x8 Push-ups Bodyweight"
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
            "4x6 Bench Press 25kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "3x8 Lat Pulldown 70kg",
            "3x7 Row 60kg"
          ]
        },
        {
          time: "18:00",
          exercises: [
            "2x4min Running",
            "2x7 Barbell Row 20kg",
            "2x7 Dumbbell Row 8kg"
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
            "2x7 Bench Press 30kg",
            "2x7 Incline Bench Press 10kg"
          ]
        },
        {
          time: "14:30",
          exercises: [
            "1x3min Running",
            "3x5 Bench Press 30kg",
            "4x7 Incline Bench Press 16kg",
            "2x8 Lateral Raises 8kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "4x8 Incline Dumbbell Press 20kg"
          ]
        },
        {
          time: "19:00",
          exercises: [
            "3x8 Push-ups Bodyweight"
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
            "3x6 Dumbbell Press 20kg",
            "3x6 Bench Press 30kg",
            "3x6 Bicep Curl 12kg"
          ]
        }
      ]
    },
    {
      date: "21/02/2025",
      sessions: [
        {
          time: "14:30",
          exercises: [
            "1x30min Boxing"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "5x8 Squat 30kg"
          ]
        }
      ]
    },
    {
      date: "22/02/2025",
      sessions: [
        {
          time: "13:30",
          exercises: [
            "4x6 Deadlift 60kg",
            "3x8 Dip/Pull-ups (Assisted) 20kg",
            "1x8 Tricep Extension",
            "4x8 Bayesian Curl 5kg",
            "3x8 Chest Fly 15kg"
          ]
        }
      ]
    },
    {
      date: "24/02/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "1x30min Boxing",
            "4x3 Bench Press 25kg",
            "2x4 Dumbbell Press 20kg"
          ]
        },
        {
          time: "14:30",
          exercises: [
            "6x6 Bench Press 30kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "2x8 Lunges (R/L) 8kg",
            "2x8 Box Jump"
          ]
        }
      ]
    },
    {
      date: "25/02/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "3x6 Deadlift 50kg",
            "1x16 Standing Cable Hamstring (L/R)"
          ]
        },
        {
          time: "16:30",
          exercises: [
            "3x8 Squat 30kg"
          ]
        }
      ]
    },
    {
      date: "26/02/2025",
      sessions: [
        {
          time: "11:15",
          exercises: [
            "3x6 Bench Press 35kg"
          ]
        },
        {
          time: "14:45",
          exercises: [
            "1x6 Chest Fly 10kg"
          ]
        },
        {
          time: "16:00",
          exercises: [
            "5x3min Running"
          ]
        }
      ]
    },
    {
      date: "27/02/2025",
      sessions: [
        {
          time: "18:00",
          exercises: [
            "5x8 Push-ups Bodyweight"
          ]
        }
      ]
    },
    {
      date: "28/02/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "3x8 Squat 20kg",
            "2x7 Bent Over Row 14kg"
          ]
        },
        {
          time: "14:45",
          exercises: [
            "2x8 Push-ups Bodyweight"
          ]
        }
      ]
    },
    {
      date: "29/02/2025",
      sessions: [
        {
          time: "17:30",
          exercises: [
            "1x30min Beginner Calisthenics Bodyweight"
          ]
        }
      ]
    },
    {
      date: "04/03/2025",
      sessions: [
        {
          time: "11:00",
          exercises: [
            "4x6 Deadlift 50kg"
          ]
        },
        {
          time: "13:00",
          exercises: [
            "4x7 Squat 30kg",
            "3x7 Ball crunch 2kg",
            "1x7 Russian twist 2kg"
          ]
        }
      ]
    }
  ];

  const [activeDay, setActiveDay] = useState("04/03/2025");

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Workout Log (17 Feb - 04 Mar 2025)</h1>
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