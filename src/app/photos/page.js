import React from 'react';

// Data structure for progress photos
const progressData = {
  date: "2025-02-17",
  photos: [
    {
      type: "Front",
      path: "bodypics/17:02:25 Front.png"
    },
    {
      type: "Side",
      path: "bodypics/17:02:25 Side.png"
      
    }
  ]
};
const ProgressPhotos = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Body Progress Tracker</h1>
        <p className="text-gray-600 mt-2">
          {new Date(progressData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressData.photos.map((photo, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-700">{photo.type} View</h2>
            </div>
            <div className="aspect-[3/4] relative">
              <img
                src={photo.path}
                alt={`${photo.type.toLowerCase()} view`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Progress Details</h2>
        <ul className="text-gray-600 space-y-2">
          <li>Date: {progressData.date}</li>
          <li>Types: {progressData.photos.map(p => p.type).join(' and ')}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgressPhotos;