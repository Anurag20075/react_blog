import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialShare = ({ article }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/article-detail-page`;
  const shareText = `Check out this article: ${article.title}`;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: '#4267B2'
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: '#0077B5'
    },
    {
      name: 'Reddit',
      icon: 'MessageSquare',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}`,
      color: '#FF4500'
    }
  ];

  const handleShare = (platform) => {
    window.open(platform.url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="bg-surface rounded-card shadow-content p-6">
      <h3 className="font-heading font-semibold text-text-primary mb-4">
        Share this article
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Social Platform Buttons */}
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className="flex items-center space-x-2 px-4 py-2 rounded-button border border-border hover:border-accent/50 nav-transition group"
            style={{ '--hover-color': platform.color }}
          >
            <Icon 
              name={platform.icon} 
              size={18} 
              className="text-text-secondary group-hover:text-accent nav-transition" 
            />
            <span className="text-sm font-caption text-text-primary group-hover:text-accent nav-transition">
              {platform.name}
            </span>
          </button>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className="flex items-center space-x-2 px-4 py-2 rounded-button border border-border hover:border-accent/50 nav-transition group"
        >
          <Icon 
            name={copied ? "Check" : "Link"} 
            size={18} 
            className={`nav-transition ${copied ? 'text-success' : 'text-text-secondary group-hover:text-accent'}`}
          />
          <span className={`text-sm font-caption nav-transition ${copied ? 'text-success' : 'text-text-primary group-hover:text-accent'}`}>
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>

      {/* Mobile Share API */}
      {navigator.share && (
        <button
          onClick={() => {
            navigator.share({
              title: article.title,
              text: article.excerpt,
              url: shareUrl
            });
          }}
          className="mt-3 w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-accent text-white rounded-button hover:bg-accent/90 nav-transition"
        >
          <Icon name="Share" size={18} />
          <span className="text-sm font-caption font-medium">Share</span>
        </button>
      )}
    </div>
  );
};

export default SocialShare;