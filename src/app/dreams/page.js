"use client"

import React, { useState } from 'react';
import { PlusCircle, CheckCircle, CircleDashed, Sparkles } from 'lucide-react';

const DreamBoard = () => {
  const categories = [
    {
      title: "Adventures",
      color: "bg-purple-500",
      icon: "✈️",
      dreams: [
        "Move back to London",
        "Watch Champions League in London",
        "Visit Koko again",
        "Travel to Vietnam",
        "Drink Vietnamese red bull",
        "Travel to Morocco and make msemen",
        "Van life in Colorado ski resorts",
        "Go to Bali again for island life",
        "Give Mala a complete vacation to best locations"
      ]
    },
    {
      title: "Career & Creation",
      color: "bg-blue-500",
      icon: "🔧",
      dreams: [
        "Graduate university",
        "Make robots to clean streets",
        "Explore robot engineering",
        "Work cooking/dishwashing nights",
        "Become UCU chef",
        "Make dosa in Hilversum",
        "Start a restaurant somewhere",
        "Convert pickup truck to van"
      ]
    },
    {
      title: "Fitness & Wellness",
      color: "bg-green-500",
      icon: "💪",
      dreams: [
        "Join football team",
        "Train calisthenics",
        "Train swimming",
        "Train UFC",
        "Workout everyday"
      ]
    },
    {
      title: "Family & Relationships",
      color: "bg-amber-500",
      icon: "❤️",
      dreams: [
        "Pay back debts to people",
        "Give a beautiful message to mom",
        "Buy Mom her Porsche",
        "Make a statue/park for Mom's dog"
      ]
    },
    {
      title: "Experiences",
      color: "bg-rose-500",
      icon: "🌟",
      dreams: [
        "Go to a pub",
        "Take shots",
        "Kiss someone special",
        "Experience being hungover in a different city",
        "Go on the tube again",
        "Get really high and see the sky",
        "Blackrock stuff"
      ]
    }
  ];

  const [completedDreams, setCompletedDreams] = useState([]);
  const [focusedCategory, setFocusedCategory] = useState(null);

  const toggleDream = (dream) => {
    if (completedDreams.includes(dream)) {
      setCompletedDreams(completedDreams.filter(d => d !== dream));
    } else {
      setCompletedDreams([...completedDreams, dream]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-50 p-6 rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Chase Dreams</h1>
        <div className="flex items-center justify-center">
          <Sparkles className="text-yellow-500 mr-2" size={20} />
          <p className="text-lg font-medium text-gray-600">Focus on creating some value</p>
          <Sparkles className="text-yellow-500 ml-2" size={20} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category.title}
            className={`px-4 py-2 rounded-full text-white text-sm font-medium transition-all ${
              focusedCategory === category.title 
                ? `${category.color} ring-4 ring-opacity-50 ring-${category.color.split('-')[1]}-300` 
                : `${category.color} opacity-80 hover:opacity-100`
            }`}
            onClick={() => setFocusedCategory(
              focusedCategory === category.title ? null : category.title
            )}
          >
            {category.icon} {category.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories
          .filter(cat => focusedCategory === null || cat.title === focusedCategory)
          .map((category) => (
            <div 
              key={category.title} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
            >
              <div className={`${category.color} px-4 py-3 text-white font-semibold`}>
                {category.icon} {category.title}
              </div>
              <ul className="p-4 space-y-2">
                {category.dreams.map((dream, idx) => (
                  <li 
                    key={idx} 
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => toggleDream(dream)}
                  >
                    {completedDreams.includes(dream) ? (
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                    ) : (
                      <CircleDashed className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    )}
                    <span className={`${completedDreams.includes(dream) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {dream}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Click on any dream to mark it as completed</p>
        <p>Filter dreams by clicking on category buttons</p>
      </div>
    </div>
  );
};

export default DreamBoard;