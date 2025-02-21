"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading posts...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Forum Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="border p-4 my-2 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-gray-500">by {post.author.name}</p>
          </div>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
