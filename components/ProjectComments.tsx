'use client';

import React, { useState } from 'react';
import { AuthService } from '@/lib/auth';
import { MessageCircle, Send, User } from 'lucide-react';

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  type: 'comment' | 'update' | 'milestone';
}

interface ProjectCommentsProps {
  projectId: string;
}

export const ProjectComments: React.FC<ProjectCommentsProps> = ({ projectId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      content: 'Updated the system architecture design to include the new microservices approach. Progress is on track.',
      author: 'John Smith (Tech Lead)',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      type: 'update'
    },
    {
      id: '2',
      content: 'Client review meeting scheduled for next week. We need to prepare the demo for the MVP features.',
      author: 'Sarah Johnson (Project Manager)',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      type: 'comment'
    },
    {
      id: '3',
      content: 'Requirements Analysis Complete milestone has been marked as finished. Great work team!',
      author: 'Mike Chen (Gestorial)',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      type: 'milestone'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const user = AuthService.getCurrentUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment.trim(),
        author: user.name,
        timestamp: new Date(),
        type: 'comment'
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  const getCommentIcon = (type: Comment['type']) => {
    switch (type) {
      case 'milestone':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'update':
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
    }
  };

  return (
    <div className="gestorial-card">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-5 w-5 text-gestorial-primary" />
        <h3 className="text-lg font-semibold text-gestorial-dark">Project Updates & Comments</h3>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment or update..."
            className="gestorial-input min-h-20 resize-none"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Posting as <span className="font-medium">{user?.name}</span>
          </p>
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className="gestorial-button flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {getCommentIcon(comment.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gestorial-dark">{comment.author}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    comment.type === 'milestone' ? 'bg-green-100 text-green-800' :
                    comment.type === 'update' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {comment.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{formatTimestamp(comment.timestamp)}</p>
              </div>
              <p className="text-gray-700 text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
          <p className="text-gray-600">Be the first to add a comment or update.</p>
        </div>
      )}
    </div>
  );
};