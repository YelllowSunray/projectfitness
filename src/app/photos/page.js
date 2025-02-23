"use client"

import React, { useState } from 'react';

const ProgressPhotos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
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
    ],
    videos: [
      {
        date: "2025-02-22",
        path: "videos/220225 Video.MP4"
      }
    ]
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-800">Body Progress Tracker</h1>
          <p className="text-sm text-gray-500">
            Last updated: {formatDate(progressData.date)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressData.photos.map((photo, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">{photo.type} View</h3>
              </div>
            </div>
            <div 
              className="aspect-[3/4] relative cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.path}
                alt={`${photo.type.toLowerCase()} view`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {progressData.videos.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">Progress Videos</h2>
          </div>
          <div className="space-y-4">
            {progressData.videos.map((video, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Progress Video</p>
                  <p className="text-sm text-gray-500">{formatDate(video.date)}</p>
                </div>
                <div className="flex-shrink-0 w-64">
                  <div className="relative pt-[56.25%]">
                    <video
                      controls
                      className="absolute top-0 left-0 w-full h-full rounded-lg object-contain"
                      poster={progressData.photos[0]?.path}
                    >
                      <source src={video.path} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <img
              src={selectedPhoto.path}
              alt={`${selectedPhoto.type.toLowerCase()} view full size`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Progress Video</h3>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
            <div className="relative pt-[100%]">
              <video
                controls
                autoPlay
                className="absolute top-0 left-0 w-full h-full rounded-lg object-contain"
                onClick={e => e.stopPropagation()}
              >
                <source src={selectedVideo.path} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPhotos;