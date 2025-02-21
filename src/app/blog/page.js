"use client"

import React, { useState } from 'react';
import { Dumbbell, Utensils, Heart } from 'lucide-react';

const FitnessBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', icon: Heart },
    { id: 'ideas', name: 'Ideas', icon: Dumbbell },
    { id: 'recipes', name: 'Recipes', icon: Utensils },
    
  ];

  const posts = [
    {
      id: 1,
      category: 'workouts',
      title: '30-Minute Full Body HIIT Workout',
      description: 'Boost your metabolism and build strength with this efficient full-body workout routine that you can do at home.',
      readTime: '5 min read',
      date: 'Feb 15, 2025',
      author: {
        name: 'Sarah Johnson',
        role: 'Certified Personal Trainer',
      }
    },
    {
      id: 2,
      category: 'nutrition',
      title: 'Post-Workout Nutrition Guide',
      description: 'Learn what to eat after your workout to maximize recovery and muscle growth. Includes meal planning tips and recipes.',
      readTime: '8 min read',
      date: 'Feb 12, 2025',
      author: {
        name: 'Mike Chen',
        role: 'Sports Nutritionist',
      }
    },
    {
      id: 3,
      category: 'workouts',
      title: 'Beginner\'s Guide to Strength Training',
      description: 'Start your strength training journey with proper form and technique. A complete guide for beginners.',
      readTime: '10 min read',
      date: 'Feb 10, 2025',
      author: {
        name: 'Alex Rivera',
        role: 'Strength Coach',
      }
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fitness & Wellness Blog</h1>
          <p className="text-xl text-gray-600">Expert tips for your fitness journey</p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full transition-colors
                  ${selectedCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600">
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.author.role}</p>
                  </div>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FitnessBlog;