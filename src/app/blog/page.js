"use client"

import React, { useState } from 'react';

const blogPosts = [

  {
    id: 3,
    title: 'Ever try 1 exercise workout',
    date: 'March 4, 2025',
    content: 'Its possible to do one exercise for 1 hour, many times again, give a real nice workout, esp. for compound exercises',
    tags: ['exerise', 'beginners'],
    bgColor: 'bg-teal-100',
    textColor: 'text-teal-800'
  },
  {
    id: 2,
    title: 'The beginner Deadlift Guide',
    date: 'February 27, 2025',
    content: 'It turns out you can create a explosive deadlift strength by pushing your butt out first (for them hamstrings) and then look forward, proud (activating your quads, leg muscles, instead of having a rounded lower back',
    tags: ['exerise', 'beginners'],
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-800'
  },
  {
    id: 1,
    title: 'Using ChatGPT for Recipes for total Noobs',
    date: 'Jan 15, 2025',
    content: 'It turns out you can use ChatGPT for your favorite authentic butter chicken',
    tags: ['food', 'beginners'],
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800'
  }
];

const BlogPost = ({ post, isExpanded, onToggle }) => {
  return (
    <div className={`${post.bgColor} shadow-lg rounded-xl p-6 mb-6 transform transition-all duration-300 hover:scale-105`}>
      <h2 
        className={`text-3xl font-bold ${post.textColor} cursor-pointer mb-3 hover:underline`}
        onClick={onToggle}
      >
        {post.title}
      </h2>
      <div className="text-gray-600 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <span className="mr-4">{post.author}</span>
        <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h1z" clipRule="evenodd" />
        </svg>
        <span>{post.date}</span>
      </div>
      {isExpanded && (
        <>
          <p className="text-gray-700 mt-4 mb-4 leading-relaxed">{post.content}</p>
          <div className="flex flex-wrap">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className={`inline-block ${post.bgColor} ${post.textColor} rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 shadow-md`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Blog = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handlePostToggle = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          My Creative Blog
        </h1>
        {blogPosts.map(post => (
          <BlogPost 
            key={post.id}
            post={post}
            isExpanded={expandedPostId === post.id}
            onToggle={() => handlePostToggle(post.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;