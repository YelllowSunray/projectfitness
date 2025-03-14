"use client"

import React, { useState } from 'react';

const GymNotes = () => {
  const [activeExercise, setActiveExercise] = useState(null);

  const exercises = [
    {
      name: "Running (like an Ethiopian)",
      tips: [
        "Bounce from the ground",
        "Take long strides",
        "Pull the ground away, taking jumpy long strides, proud",
        "Lean forward?",
      ]
    },
    {
      name: "Bench Press",
      tips: [
        "Tuck elbow 45 degrees",
        "Arc and proud chest, keep shoulders rolled back",
        "Brace abs, take breath in",
        "Leg drive",
        "Lift!"
      ]
    },
    {
      name: "Deadlift",
      tips: [
        "Bring your hands to the bar",
        "Put that butt out, stretch them hamstrings",
        "Look forward and be proud instead of down and slouch",
        "Drive them legs bro/sis.",
        "Lift!"
      ],
      description: "Totally changes how you go to gym, product: a powerful deadlift and nice feeling in back/legs"
    },
    {
      name: "Flies",
      tips: [
        "Roll shoulders back",
        "Chest out proud",
        "Stretch arms as if pointing in a cute groom",
        "Squeeze pecs when weight is on top",
        "Should you go fully up?",
        "Lift!"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">Form</h1>
      <p className="text-center mb-6 italic text-gray-700">Every exercise has tips to maximise power output and reduce injury</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exercise tabs */}
        <div className="md:col-span-1 flex flex-col gap-2">
          {exercises.map((exercise, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg text-left font-semibold transition-all ${
                activeExercise === index 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white hover:bg-blue-100 text-blue-800'
              }`}
              onClick={() => setActiveExercise(index)}
            >
              {exercise.name}
            </button>
          ))}
        </div>
        
        {/* Tips display */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-5">
          {activeExercise !== null ? (
            <>
              <h2 className="text-2xl font-bold mb-4 text-blue-800">{exercises[activeExercise].name}</h2>
              {exercises[activeExercise].description && (
                <p className="italic mb-4 text-gray-600">{exercises[activeExercise].description}</p>
              )}
              <ul className="space-y-2">
                {exercises[activeExercise].tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2 mt-1 text-blue-600">•</span>
                    <span>
                      {tip.includes("**") 
                        ? <span>
                            {tip.split("**")[0]}
                            <strong className="font-bold text-blue-800">{tip.split("**")[1]}</strong>
                            {tip.split("**")[2] || ""}
                          </span>
                        : tip}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Select an exercise to view form tips</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymNotes;