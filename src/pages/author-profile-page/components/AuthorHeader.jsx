import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AuthorHeader = ({ author, isFollowing, onFollow, onContact }) => {
  const socialIcons = {
    twitter: 'Twitter',
    linkedin: 'Linkedin',
    github: 'Github',
    instagram: 'Instagram'
  };

  return (
    <div className="bg-surface rounded-card content-shadow p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image 
              src={author.avatar}
              alt={author.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-border"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full border-4 border-surface flex items-center justify-center">
              <Icon name="Check" size={16} color="white" />
            </div>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-2">
                {author.name}
              </h1>
              
              <p className="text-text-secondary text-lg mb-4 leading-relaxed">
                {author.bio}
              </p>

              {/* Author Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{author.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {author.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={16} />
                  <a 
                    href={author.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    {author.website.replace('https://', '')}
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center sm:text-left">
                  <div className="font-heading text-2xl font-bold text-primary">
                    {author.stats.totalArticles}
                  </div>
                  <div className="text-sm text-text-secondary">Articles</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-heading text-2xl font-bold text-primary">
                    {author.stats.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary">Followers</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-heading text-2xl font-bold text-primary">
                    {(author.stats.totalViews / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-text-secondary">Total Views</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-heading text-2xl font-bold text-primary">
                    {author.stats.avgReadTime}
                  </div>
                  <div className="text-sm text-text-secondary">Avg Read</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {Object.entries(author.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-accent/10 hover:bg-accent/20 rounded-full flex items-center justify-center nav-transition"
                    aria-label={`Follow on ${platform}`}
                  >
                    <Icon name={socialIcons[platform]} size={18} className="text-accent" />
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:ml-6">
              <button
                onClick={onFollow}
                className={`px-6 py-3 rounded-button font-heading font-medium nav-transition ${
                  isFollowing
                    ? 'bg-success text-white hover:bg-success/90' :'bg-accent text-white hover:bg-accent/90'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={isFollowing ? "UserCheck" : "UserPlus"} size={18} />
                  <span>{isFollowing ? 'Following' : 'Follow'}</span>
                </div>
              </button>
              
              <button
                onClick={onContact}
                className="px-6 py-3 border border-border text-text-primary rounded-button font-heading font-medium nav-transition hover:bg-accent/5 hover:border-accent"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={18} />
                  <span>Contact</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Bio for Desktop */}
      <div className="hidden lg:block mt-8 pt-8 border-t border-border">
        <h3 className="font-heading text-xl font-semibold text-primary mb-4">About {author.name}</h3>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">{author.expandedBio}</p>
        </div>
        
        {/* Expertise Tags */}
        <div className="mt-6">
          <h4 className="font-heading font-medium text-primary mb-3">Expertise</h4>
          <div className="flex flex-wrap gap-2">
            {author.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorHeader;