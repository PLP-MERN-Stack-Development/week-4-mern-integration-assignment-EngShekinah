import React, { createContext, useContext, useState, useEffect } from 'react';
import blogService from '../services/blogService';

interface Category {
  id: string;
  name: string;
  description?: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  categories: { name: string };
  users: { name: string };
  comments?: Comment[];
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: { name: string };
}

interface BlogContextType {
  posts: Post[];
  categories: Category[];
  loading: boolean;
  fetchPosts: (params?: any) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createPost: (postData: any) => Promise<Post>;
  updatePost: (id: string, postData: any) => Promise<Post>;
  deletePost: (id: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<Comment>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (params = {}) => {
    setLoading(true);
    try {
      const data = await blogService.getPosts(params);
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await blogService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const createPost = async (postData: any) => {
    const newPost = await blogService.createPost(postData);
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = async (id: string, postData: any) => {
    const updatedPost = await blogService.updatePost(id, postData);
    setPosts(prev => prev.map(post => post.id === id ? updatedPost : post));
    return updatedPost;
  };

  const deletePost = async (id: string) => {
    await blogService.deletePost(id);
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const createComment = async (postId: string, content: string) => {
    const newComment = await blogService.createComment(postId, content);
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...(post.comments || []), newComment] }
        : post
    ));
    return newComment;
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <BlogContext.Provider value={{
      posts,
      categories,
      loading,
      fetchPosts,
      fetchCategories,
      createPost,
      updatePost,
      deletePost,
      createComment
    }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};