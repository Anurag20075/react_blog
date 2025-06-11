import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroSection = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="relative bg-surface rounded-card overflow-hidden content-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
              <Icon name="Star" size={14} className="mr-1" />
              Featured
            </span>
          </div>
          
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-text-secondary text-lg mb-6 leading-relaxed">
            {article.excerpt}
          </p>
          
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium">{article.author.name}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{article.readTime} min read</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Tag" size={16} />
              <span>{article.category}</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div>
            <Link
              to={`/article-detail-page?id=${article.id}`}
              className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90"
            >
              <span>Read Full Article</span>
              <Icon name="ArrowRight" size={20} />
            </Link>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative order-1 lg:order-2 min-h-[300px] lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden">
            <Image 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;