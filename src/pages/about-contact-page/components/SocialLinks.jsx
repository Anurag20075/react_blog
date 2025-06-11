import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const SocialLinks = () => {
  const socialPlatforms = [
    {
      name: "Twitter",
      icon: "Twitter",
      handle: "@bloghub",
      url: "https://twitter.com/bloghub",
      followers: "25.2K",
      color: "hover:text-blue-500"
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      handle: "BlogHub",
      url: "https://linkedin.com/company/bloghub",
      followers: "18.5K",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: "Instagram",
      handle: "@bloghub_official",
      url: "https://instagram.com/bloghub_official",
      followers: "12.8K",
      color: "hover:text-pink-500"
    },
    {
      name: "YouTube",
      icon: "Youtube",
      handle: "BlogHub Channel",
      url: "https://youtube.com/bloghub",
      followers: "8.3K",
      color: "hover:text-red-500"
    },
    {
      name: "GitHub",
      icon: "Github",
      handle: "bloghub-platform",
      url: "https://github.com/bloghub-platform",
      followers: "2.1K",
      color: "hover:text-gray-700"
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-surface rounded-card p-6 content-shadow"
    >
      <h3 className="font-heading text-lg font-semibold text-primary mb-6">
        Connect With Us
      </h3>
      <div className="space-y-4">
        {socialPlatforms.map((platform, index) => (
          <a
            key={index}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3 rounded-card border border-border nav-transition hover:border-accent/30 hover:bg-accent/5 ${platform.color}`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={platform.icon} size={20} className="text-text-secondary" />
              <div>
                <div className="font-heading font-medium text-primary text-sm">
                  {platform.name}
                </div>
                <div className="text-text-secondary text-xs">{platform.handle}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-heading font-medium text-primary text-sm">
                {platform.followers}
              </div>
              <div className="text-text-secondary text-xs">followers</div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-text-secondary text-sm text-center">
          Follow us for the latest updates, behind-the-scenes content, and community highlights.
        </p>
      </div>
    </motion.div>
  );
};

export default SocialLinks;