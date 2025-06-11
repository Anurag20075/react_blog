import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NoResults = ({ query, popularArticles }) => {
  const searchSuggestions = [
    "Try different keywords",
    "Check your spelling",
    "Use more general terms",
    "Try searching for author names",
    "Browse categories instead"
  ];

  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        {/* No Results Icon */}
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="SearchX" size={40} className="text-accent" />
        </div>

        {/* No Results Message */}
        <h3 className="font-heading font-bold text-2xl text-primary mb-4">
          No Results Found
        </h3>
        <p className="text-text-secondary mb-8">
          We couldn't find any articles matching <strong>"{query}"</strong>. 
          Try adjusting your search or browse our popular content below.
        </p>

        {/* Search Suggestions */}
        <div className="bg-surface border border-border rounded-card p-6 mb-8">
          <h4 className="font-heading font-semibold text-primary mb-4">
            Search Tips
          </h4>
          <ul className="space-y-2 text-left">
            {searchSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                <span className="text-sm text-text-secondary">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Articles */}
        <div className="bg-surface border border-border rounded-card p-6 mb-8">
          <h4 className="font-heading font-semibold text-primary mb-4">
            Popular Articles
          </h4>
          <div className="space-y-3">
            {popularArticles.map((article) => (
              <Link
                key={article.id}
                to="/article-detail-page"
                className="block text-left p-3 rounded-button hover:bg-accent/5 nav-transition"
              >
                <h5 className="font-caption font-medium text-text-primary hover:text-accent nav-transition mb-1">
                  {article.title}
                </h5>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/category-tag-archive-page"
            className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90"
          >
            <Icon name="FolderOpen" size={18} />
            <span>Browse Categories</span>
          </Link>
          <Link
            to="/home-blog-landing-page"
            className="inline-flex items-center justify-center space-x-2 border border-border text-text-primary px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/5"
          >
            <Icon name="Home" size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoResults;