import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AuthorArticles = ({ 
  articles, 
  categories, 
  dateRanges, 
  selectedCategory, 
  selectedDateRange, 
  onCategoryChange, 
  onDateRangeChange 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-surface rounded-card content-shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="font-heading text-2xl font-bold text-primary">
            Articles ({articles.length})
          </h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-button px-4 py-2 pr-8 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent nav-transition"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>

            {/* Date Range Filter */}
            <div className="relative">
              <select
                value={selectedDateRange}
                onChange={(e) => onDateRangeChange(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-button px-4 py-2 pr-8 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent nav-transition"
              >
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-surface rounded-card content-shadow overflow-hidden hover:shadow-lg nav-transition">
              <div className="flex flex-col lg:flex-row">
                {/* Article Thumbnail */}
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div className="h-48 lg:h-full overflow-hidden">
                    <Image 
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 nav-transition"
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
                      {article.category}
                    </span>
                    <time className="text-sm text-text-secondary">
                      {formatDate(article.publishDate)}
                    </time>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-primary mb-3 line-clamp-2 hover:text-accent nav-transition">
                    <Link to="/article-detail-page">
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-text-secondary mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={14} />
                        <span>{article.comments}</span>
                      </div>
                    </div>

                    <Link
                      to="/article-detail-page"
                      className="text-accent hover:text-accent/80 font-medium text-sm nav-transition"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-card content-shadow p-12 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-accent" />
          </div>
          <h3 className="font-heading text-xl font-semibold text-primary mb-2">
            No Articles Found
          </h3>
          <p className="text-text-secondary">
            No articles match your current filter criteria. Try adjusting your filters.
          </p>
        </div>
      )}

      {/* Load More Button (if needed) */}
      {articles.length > 0 && articles.length >= 6 && (
        <div className="text-center">
          <button className="px-8 py-3 border border-border text-text-primary rounded-button font-heading font-medium nav-transition hover:bg-accent/5 hover:border-accent">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorArticles;