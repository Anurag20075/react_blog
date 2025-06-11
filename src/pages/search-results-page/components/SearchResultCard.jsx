import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const SearchResultCard = ({ result, searchQuery, highlightSearchTerm }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelevanceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <article className="bg-surface border border-border rounded-card p-6 hover:shadow-content nav-transition">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Article Image */}
        <div className="lg:w-48 lg:flex-shrink-0">
          <Link to={result.slug} className="block">
            <div className="aspect-video lg:aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src={result.image}
                alt={result.title}
                className="w-full h-full object-cover hover:scale-105 nav-transition"
              />
            </div>
          </Link>
        </div>

        {/* Article Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium bg-accent/10 text-accent">
                {result.category}
              </span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium ${getRelevanceColor(result.relevanceScore)}`}>
                {result.relevanceScore}% match
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span>{formatDate(result.date)}</span>
              <span>•</span>
              <span>{result.readTime}</span>
            </div>
          </div>

          <Link to={result.slug} className="group">
            <h2 className="font-heading font-bold text-xl text-primary group-hover:text-accent nav-transition mb-3 line-clamp-2">
              {highlightSearchTerm(result.title, searchQuery)}
            </h2>
          </Link>

          <p className="text-text-secondary mb-4 line-clamp-3">
            {highlightSearchTerm(result.excerpt, searchQuery)}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Author Info */}
            <Link 
              to={result.author.profile}
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 overflow-hidden rounded-full">
                <Image
                  src={result.author.avatar}
                  alt={result.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-caption font-medium text-text-primary group-hover:text-accent nav-transition">
                {highlightSearchTerm(result.author.name, searchQuery)}
              </span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-text-secondary hover:text-accent nav-transition">
                <Icon name="Bookmark" size={16} />
                <span className="text-sm font-caption">Save</span>
              </button>
              <button className="flex items-center space-x-1 text-text-secondary hover:text-accent nav-transition">
                <Icon name="Share2" size={16} />
                <span className="text-sm font-caption">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchResultCard;