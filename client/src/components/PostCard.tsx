import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Heart, MessageCircle, Bookmark, ArrowRight } from 'lucide-react';

interface PostCardProps {
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
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
  };

  const getReadTime = () => {
    const wordCount = stripHtml(post.content).split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  };

  return (
    <article className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              {post.categories.name}
            </span>
          </div>

          {/* Bookmark Button */}
          <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
            <Bookmark className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      )}
      
      <div className="p-6">
        {/* Category and Read Time (if no image) */}
        {!post.featured_image && (
          <div className="flex items-center justify-between mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {post.categories.name}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getReadTime()} min read</span>
            </div>
          </div>
        )}

        {/* Title */}
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {getExcerpt()}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-semibold">
                {post.users.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{post.users.name}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(post.created_at)}</span>
                {post.featured_image && (
                  <>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{getReadTime()} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-sm">24</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">8</span>
            </button>
          </div>
          
          <Link
            to={`/posts/${post.id}`}
            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm group"
          >
            <span>Read more</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;