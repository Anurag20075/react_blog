import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const CommentSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Alex Thompson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      content: "Excellent article! The section on component composition patterns was particularly insightful. I\'ve been struggling with this in my current project and your examples really helped clarify the best approach.",
      timestamp: "2024-01-15T14:30:00Z",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 2,
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          },
          content: "Thank you, Alex! I\'m glad you found it helpful. Component composition is definitely one of those concepts that clicks once you see it in practice.",
          timestamp: "2024-01-15T15:45:00Z",
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: 3,
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      content: "Great breakdown of state management strategies! I\'ve been using Redux for everything, but your explanation of when to use local state vs context vs external state management really opened my eyes. Will definitely be more thoughtful about this going forward.",
      timestamp: "2024-01-15T16:20:00Z",
      likes: 8,
      isLiked: true,
      replies: []
    },
    {
      id: 4,
      author: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      content: "The custom hooks example is gold! I\'ve been writing similar logic in multiple components. Time to refactor and create some reusable hooks. Do you have any recommendations for testing custom hooks?",
      timestamp: "2024-01-15T17:10:00Z",
      likes: 6,
      isLiked: false,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInHours = Math.floor((now - commentTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const comment = {
        id: Date.now(),
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        },
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
        replies: []
      };

      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleSubmitReply = async (e, parentId) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const reply = {
        id: Date.now(),
        author: {
          name: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        },
        content: replyContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false
      };

      setComments(comments.map(comment => 
        comment.id === parentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      
      setReplyContent('');
      setReplyingTo(null);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { 
                      ...reply, 
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
            }
          : comment
      ));
    }
  };

  return (
    <section className="bg-surface rounded-card shadow-content p-6 lg:p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageCircle" size={24} className="text-accent" />
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-4">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            alt="Your avatar"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              className="w-full p-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-text-secondary">
                Be respectful and constructive in your comments.
              </p>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className="px-4 py-2 bg-accent text-white rounded-button hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed nav-transition font-caption font-medium"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            {/* Main Comment */}
            <div className="flex space-x-4">
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-caption font-medium text-text-primary">
                    {comment.author.name}
                  </h4>
                  <span className="text-sm text-text-secondary">
                    {formatTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p className="text-text-primary mb-3 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-1 text-sm nav-transition ${
                      comment.isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                    }`}
                  >
                    <Icon 
                      name="Heart" 
                      size={16} 
                      className={comment.isLiked ? 'fill-current' : ''} 
                    />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="text-sm text-text-secondary hover:text-accent nav-transition"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <form 
                    onSubmit={(e) => handleSubmitReply(e, comment.id)} 
                    className="mt-4 ml-4 pl-4 border-l-2 border-border"
                  >
                    <div className="flex space-x-3">
                      <Image
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                        alt="Your avatar"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`Reply to ${comment.author.name}...`}
                          rows={2}
                          className="w-full p-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none text-sm"
                        />
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            type="submit"
                            disabled={!replyContent.trim() || isSubmitting}
                            className="px-3 py-1 bg-accent text-white rounded-button hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed nav-transition text-sm font-caption"
                          >
                            {isSubmitting ? 'Replying...' : 'Reply'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyContent('');
                            }}
                            className="px-3 py-1 text-text-secondary hover:text-text-primary nav-transition text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-4 pl-4 border-l-2 border-border space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-3">
                        <Image
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-caption font-medium text-text-primary text-sm">
                              {reply.author.name}
                            </h5>
                            <span className="text-xs text-text-secondary">
                              {formatTimeAgo(reply.timestamp)}
                            </span>
                          </div>
                          <p className="text-text-primary text-sm mb-2 leading-relaxed">
                            {reply.content}
                          </p>
                          <button
                            onClick={() => handleLikeComment(reply.id, true, comment.id)}
                            className={`flex items-center space-x-1 text-xs nav-transition ${
                              reply.isLiked ? 'text-accent' : 'text-text-secondary hover:text-accent'
                            }`}
                          >
                            <Icon 
                              name="Heart" 
                              size={14} 
                              className={reply.isLiked ? 'fill-current' : ''} 
                            />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      <div className="mt-8 text-center">
        <button className="px-6 py-3 border border-border text-text-primary hover:border-accent hover:text-accent rounded-button nav-transition font-caption font-medium">
          Load More Comments
        </button>
      </div>
    </section>
  );
};

export default CommentSection;