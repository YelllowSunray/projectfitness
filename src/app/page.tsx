"use client"

import React, { useState } from 'react';

const DreamsVisionBoard = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const dreamSections = [
    {
      id: "section1",
      content: "Get drunk again? Go a pub. Take shots? Lots of shots. Kiss? Move back to London. Use Nos again? watch champions league there. Graduate uni ! Get drunk again. Hungover in a different 🌆. Nos, Go on the tube again. Dancing @ KOKO again. Spooky Halloween.🎃 left over pizza in morning. Have friends to call. Drunk."
    },
    {
      id: "section2",
      content: "Make robots to make streets clean again. Robot engineering? Would love to make things. Figure out how to make circuit."
    },
    {
      id: "section3",
      content: "Join footbal team. Travel to New York and work for restaurants. Run away from parents, make a living somewhere."
    },
    {
      id: "section4",
      content: "Graduate uni ! train calithetics swimming and UFC. Make a statue, a park for Mom's dog. Workout everyday. Calithenics and swimming. Take a punch."
    },
    {
      id: "section5",
      content: "Pay back debts to people. Give a beautiful message to mom. Buy Mom her porsche. Clean Utrecht and graffiti."
    },
    {
      id: "section6",
      content: "Getting really high and seeing sky 🌌 Blackrock stuff."
    },
    {
      id: "section7",
      content: "Make nights cooking/dishwashing. Become ucu chef, work dishwashing nights. Make dosa in Hilversum (mag)"
    },
    {
      id: "section8",
      content: "Travel to Vietnam. Meet new people. Drink Vietnamese red bull. run away from papa, and make a restaurant somewhere, send 90% money back. Travel to Morrocco and make msemen. Make a Pickup Truck converted to Van, and van life Colorado Ski resorts bum. go to Bali again island life. travel to New York and work for illegal restaurants."
    },
    {
      id: "section9",
      content: "Give Mala a complete vacation, to all best locations."
    }
  ];
  
  const toggleSection = (id) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
    }
  };
  
  const getRandomGradient = (id) => {
    const gradients = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-blue-500',
      'from-yellow-500 to-red-500',
      'from-indigo-500 to-pink-500',
      'from-purple-500 to-red-500',
      'from-green-500 to-yellow-500',
      'from-red-500 to-blue-500',
      'from-pink-500 to-orange-500',
      'from-teal-500 to-indigo-500'
    ];
    
    // Get consistent color based on id
    const index = id.charCodeAt(id.length - 1) % gradients.length;
    return gradients[index];
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Chase Dreams</h1>
        
        <div className="space-y-4">
          {dreamSections.map((section) => (
            <div 
              key={section.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 ${expandedSection === section.id ? 'transform scale-102' : ''}`}
              onClick={() => toggleSection(section.id)}
            >
              <div className={`h-2 bg-gradient-to-r ${getRandomGradient(section.id)}`}></div>
              <div className="p-6">
                <p className={`text-gray-800 leading-relaxed ${expandedSection === section.id ? 'text-lg' : 'text-base line-clamp-2'}`}>
                  {section.content}
                </p>
                
                {expandedSection === section.id && (
                  <div className="mt-4 flex justify-end">
                    <span className="text-sm text-gray-500 italic">Click to collapse</span>
                  </div>
                )}
                
                {expandedSection !== section.id && section.content.length > 100 && (
                  <div className="mt-2 flex justify-end">
                    <span className="text-sm text-blue-500">Read more...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">Click on any dream to expand it.</p>
        </div>
      </div>
    </div>
  );
};

export default DreamsVisionBoard;