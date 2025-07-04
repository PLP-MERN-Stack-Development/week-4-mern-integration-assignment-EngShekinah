import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowRight, Star } from 'lucide-react';

interface FeaturedPostProps {
  post: {
    id: string;
    title: string;
    excerpt?: string;
    content: string;
    featured_image?: string;
    created_at: string;
    categories: { name: string };
    users: { name: string };
  };
  featured?: boolean;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    const plainText = stripHtml(post.content);
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  };

  const getReadTime = () => {
    const wordCount = stripHtml(post.content).split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  if (featured) {
    return (
      <div className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-500">
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            <Star className="h-3 w-3" />
            <span>Featured</span>
          </div>
        </div>
        
        {post.featured_image && (
          <div className="relative h-80 lg:h-96 overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {post.categories.name}
            </span>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{getReadTime()} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>

          <Link to={`/posts/${post.id}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {post.title}
            </h2>
          </Link>

          <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
            {getExcerpt()}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {post.users.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.users.name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
            
            <Link
              to={`/posts/${post.id}`}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold group"
            >
              <span>Read Story</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
      {post.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {post.categories.name}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-3 w-3 mr-1" />
            <span>{getReadTime()} min</span>
          </div>
        </div>

        <Link to={`/posts/${post.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {getExcerpt()}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {post.users.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.users.name}</p>
              <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
            </div>
          </div>
          
          <Link
            to={`/posts/${post.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;