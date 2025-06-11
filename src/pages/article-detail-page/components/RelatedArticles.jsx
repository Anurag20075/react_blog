import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RelatedArticles = ({ articles }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-surface rounded-card shadow-content p-6 lg:p-8">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BookOpen" size={24} className="text-accent" />
        <h2 className="text-2xl font-heading font-bold text-text-primary">
          Related Articles
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article key={article.id} className="group">
            <Link to="/article-detail-page" className="block">
              {/* Article Image */}
              <div className="aspect-video overflow-hidden rounded-card mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 nav-transition"
                />
              </div>

              {/* Article Content */}
              <div className="space-y-3">
                {/* Category */}
                <div className="flex items-center space-x-2">
                  <span 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-caption font-medium"
                    style={{ 
                      backgroundColor: `${article.category.color}15`,
                      color: article.category.color 
                    }}
                  >
                    {article.category.name}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-text-primary group-hover:text-accent nav-transition line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-caption text-text-secondary">
                      {article.author.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-text-secondary">
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                    <span>•</span>
                    <span>{article.readingTime} min</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-8 text-center">
        <Link
          to="/category-tag-archive-page"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-accent/10 text-accent hover:bg-accent/20 rounded-button nav-transition font-caption font-medium"
        >
          <span>View More Articles</span>
          <Icon name="ArrowRight" size={18} />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;