import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AuthorSidebar = ({ author, relatedAuthors }) => {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-surface rounded-card content-shadow p-6">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4">
          Contact Information
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={16} className="text-accent" />
            </div>
            <a 
              href={`mailto:${author.email}`}
              className="text-text-secondary hover:text-accent nav-transition text-sm"
            >
              {author.email}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-accent" />
            </div>
            <a 
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent nav-transition text-sm"
            >
              {author.website.replace('https://', '')}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-accent" />
            </div>
            <span className="text-text-secondary text-sm">{author.location}</span>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-surface rounded-card content-shadow p-6">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4">
          Recent Achievements
        </h3>
        <div className="space-y-3">
          {author.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                <Icon name="Award" size={12} className="text-success" />
              </div>
              <span className="text-text-secondary text-sm leading-relaxed">
                {achievement}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bio Section */}
      <div className="lg:hidden bg-surface rounded-card content-shadow p-6">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4">
          About {author.name}
        </h3>
        <div className="prose max-w-none text-text-secondary text-sm">
          <p className="mb-4">{author.expandedBio}</p>
        </div>
        
        {/* Expertise Tags */}
        <div className="mt-4">
          <h4 className="font-heading font-medium text-primary mb-3 text-sm">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Authors */}
      <div className="bg-surface rounded-card content-shadow p-6">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4">
          Related Authors
        </h3>
        <div className="space-y-4">
          {relatedAuthors.map((relatedAuthor) => (
            <div key={relatedAuthor.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Image 
                  src={relatedAuthor.avatar}
                  alt={relatedAuthor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-medium text-primary text-sm mb-1">
                  <Link 
                    to="/author-profile-page"
                    className="hover:text-accent nav-transition"
                  >
                    {relatedAuthor.name}
                  </Link>
                </h4>
                <p className="text-text-secondary text-xs mb-2 line-clamp-2">
                  {relatedAuthor.bio}
                </p>
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span>{relatedAuthor.articles} articles</span>
                  <span>{relatedAuthor.followers.toLocaleString()} followers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Link
            to="/author-profile-page"
            className="text-accent hover:text-accent/80 text-sm font-medium nav-transition"
          >
            View All Authors →
          </Link>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-card p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={24} className="text-accent" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Stay Updated
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            Get notified when {author.name.split(' ')[0]} publishes new articles
          </p>
          <button className="w-full bg-accent text-white px-4 py-2 rounded-button font-heading font-medium nav-transition hover:bg-accent/90">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorSidebar;