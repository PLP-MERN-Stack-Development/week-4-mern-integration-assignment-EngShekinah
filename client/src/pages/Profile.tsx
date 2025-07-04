import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  MapPin, 
  Calendar, 
  Link as LinkIcon, 
  Twitter, 
  Github, 
  Linkedin,
  Edit,
  Settings,
  Users,
  BookOpen,
  Heart,
  MessageCircle
} from 'lucide-react';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    // Fetch user profile and posts
    // This would be implemented with actual API calls
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {isOwnProfile && (
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                    <Edit className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentUser?.name || 'John Doe'}
                    </h1>
                    <p className="text-gray-600 mb-4">
                      Passionate writer sharing stories about technology, life, and everything in between.
                    </p>
                  </div>
                  
                  {isOwnProfile ? (
                    <div className="flex space-x-3">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        <Edit className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                        Follow
                      </button>
                      <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                        Message
                      </button>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-8 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">42</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1.2K</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">324</div>
                    <div className="text-sm text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5.4K</div>
                    <div className="text-sm text-gray-500">Likes</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-4 mt-6">
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Joined March 2023</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <LinkIcon className="h-4 w-4 mr-1" />
                    <a href="#" className="text-blue-600 hover:underline">johndoe.com</a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 mt-4">
                  <a href="#" className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors">
                    <Twitter className="h-4 w-4 text-gray-600" />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Github className="h-4 w-4 text-gray-600" />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors">
                    <Linkedin className="h-4 w-4 text-gray-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Posts</span>
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'liked'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>Liked</span>
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'comments'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Comments</span>
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'followers'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Followers</span>
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'posts' && (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Start writing your first story!</p>
              </div>
            )}

            {activeTab === 'liked' && (
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No liked posts</h3>
                <p className="text-gray-600">Posts you like will appear here.</p>
              </div>
            )}

            {activeTab === 'comments' && (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No comments yet</h3>
                <p className="text-gray-600">Your comments on posts will appear here.</p>
              </div>
            )}

            {activeTab === 'followers' && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No followers yet</h3>
                <p className="text-gray-600">People who follow you will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;