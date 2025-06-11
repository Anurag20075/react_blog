import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-surface rounded-card overflow-hidden content-shadow nav-transition hover:shadow-lg group">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 nav-transition"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface/90 text-accent">
            {article.category}
          </span>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-primary mb-3 leading-tight group-hover:text-accent nav-transition">
          <Link to={`/article-detail-page?id=${article.id}`}>
            {article.title}
          </Link>
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
        
        {/* Article Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-text-secondary font-medium">
              {article.author.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{article.readTime}m</span>
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <Link
              key={index}
              to={`/category-tag-archive-page?tag=${encodeURIComponent(tag)}`}
              className="text-xs text-text-secondary hover:text-accent nav-transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;