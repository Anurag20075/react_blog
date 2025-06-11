import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ArticleHeader = ({ article }) => {
  const [isLiked, setIsLiked] = useState(article.isLiked);
  const [isBookmarked, setIsBookmarked] = useState(article.isBookmarked);
  const [likes, setLikes] = useState(article.likes);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <header className="p-6 lg:p-8">
      {/* Category Badge */}
      <div className="mb-4">
        <Link
          to={`/category-tag-archive-page?category=${article.category.slug}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-caption font-medium nav-transition"
          style={{ 
            backgroundColor: `${article.category.color}15`,
            color: article.category.color 
          }}
        >
          {article.category.name}
        </Link>
      </div>

      {/* Article Title */}
      <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Article Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Author Info */}
        <div className="flex items-center space-x-3">
          <Link to="/author-profile-page" className="flex-shrink-0">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          <div>
            <Link
              to="/author-profile-page"
              className="font-caption font-medium text-text-primary hover:text-accent nav-transition"
            >
              {article.author.name}
            </Link>
            <div className="flex items-center space-x-3 text-sm text-text-secondary">
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
              <span>•</span>
              <span>{article.readingTime} min read</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-button nav-transition ${
              isLiked
                ? 'bg-accent text-white' :'bg-accent/10 text-accent hover:bg-accent/20'
            }`}
          >
            <Icon 
              name={isLiked ? "Heart" : "Heart"} 
              size={18} 
              className={isLiked ? "fill-current" : ""} 
            />
            <span className="text-sm font-caption font-medium">{likes}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`p-2 rounded-button nav-transition ${
              isBookmarked
                ? 'bg-primary text-white' :'bg-primary/10 text-primary hover:bg-primary/20'
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Icon 
              name="Bookmark" 
              size={18} 
              className={isBookmarked ? "fill-current" : ""} 
            />
          </button>

          <button
            className="p-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-button nav-transition"
            aria-label="Share article"
          >
            <Icon name="Share2" size={18} />
          </button>
        </div>
      </div>

      {/* Article Excerpt */}
      <p className="text-lg text-text-secondary leading-relaxed">
        {article.excerpt}
      </p>
    </header>
  );
};

export default ArticleHeader;