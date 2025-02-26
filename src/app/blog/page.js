"use client"

import React, { useState } from 'react';

// Blog post data
const blogPosts = [
  {
    id: 1,
    slug: '30-minute-hiit-workout',
    category: 'workouts',
    title: 'Deadlift form',
    description: 'Tips to improve deadlift',
    content: () => (
      <div>
        <h1>Deadlift Form Routine</h1>
        <p>The goal of deadlift form is to maximize explosive upwards force with proper posture.</p>
        <p>Follow this routine:</p>
        <ol>
          <li>Bend down normally to lift the weight.</li>
          <li>When down:
            <ul>
              <li>Push your butt out (feel hamstrings).</li>
              <li>Look forward, proud.</li>
              <li>Push your hands down.</li>
              <li>Lift the weight.</li>
            </ul>
          </li>
        </ol>
      </div>
    ),
    readTime: '1 min read',
    date: 'Feb 15, 2025',
    author: {
      name: 'Samir Iyer',
    }
  },
  {
    id: 2,
    slug: 'post-workout-nutrition-guide',
    category: 'nutrition',
    title: 'Post-Workout Nutrition Guide',
    description: 'Learn what to eat after your workout to maximize recovery and muscle growth. Includes meal planning tips and recipes.',
    content: () => (
      <div>
        <h1>Maximize Your Recovery with Proper Post-Workout Nutrition</h1>
        <p>What you eat after your workout is just as important as the workout itself...</p>
        <h2>The Recovery Window</h2>
        <p>For optimal recovery, aim to eat within 30-45 minutes...</p>
        <h2>What to Eat After a Workout</h2>
        <ul>
          <li><strong>Protein:</strong> Essential for muscle repair and growth.</li>
          <li><strong>Carbohydrates:</strong> Replenish glycogen stores and provide energy.</li>
          <li><strong>Fluids:</strong> Rehydrate with water or an electrolyte drink.</li>
        </ul>
        <h2>Quick and Easy Post-Workout Meal Ideas</h2>
        <ul>
          <li>Greek yogurt with berries and honey</li>
          <li>Protein smoothie with banana and spinach</li>
          <li>Turkey and avocado wrap</li>
          <li>Oatmeal with protein powder and fruit</li>
          <li>Grilled chicken with sweet potato and vegetables</li>
        </ul>
      </div>
    ),
    readTime: '8 min read',
    date: 'Feb 12, 2025',
    author: {
      name: 'Mike Chen',
      role: 'Sports Nutritionist',
    }
  }
];


// Individual Post Page Component
const PostPage = ({ post, onBack }) => {
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
          <button 
            onClick={onBack}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            ← Back to all posts
          </button>
        </div>

        {/* Post Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8 mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <span className="ml-4 text-sm text-gray-500">{post.readTime}</span>
            <span className="ml-4 text-sm text-gray-500">{post.date}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center mb-8">
            <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-600">{post.author.role}</p>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden p-8">
          <div className="prose max-w-none">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {blogPosts
              .filter(relatedPost => relatedPost.id !== post.id)
              .slice(0, 1)
              .map(relatedPost => (
                <article 
                  key={relatedPost.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <span className="text-sm font-medium text-blue-600 mb-2 inline-block">
                      {relatedPost.category.charAt(0).toUpperCase() + relatedPost.category.slice(1)}
                    </span>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {relatedPost.description}
                    </p>
                    
                    <button 
                      onClick={() => onViewPost(relatedPost)}
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Read Article
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Blog List Page Component
const BlogList = ({ onViewPost }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'workouts', name: 'Workouts' },
    { id: 'nutrition', name: 'Nutrition' },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full transition-colors
                ${selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2">
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
                
                <div className="mt-4">
                  <button 
                    onClick={() => onViewPost(post)}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Read Full Article
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const FitnessBlog = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPost(null);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {currentView === 'list' ? (
        <BlogList onViewPost={handleViewPost} />
      ) : (
        <PostPage post={selectedPost} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default FitnessBlog;