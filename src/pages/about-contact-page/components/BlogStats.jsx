import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const BlogStats = () => {
  const stats = [
    {
      icon: "FileText",
      value: "2,500+",
      label: "Articles Published",
      color: "text-accent"
    },
    {
      icon: "Users",
      value: "50,000+",
      label: "Monthly Readers",
      color: "text-success"
    },
    {
      icon: "PenTool",
      value: "150+",
      label: "Contributing Writers",
      color: "text-warning"
    },
    {
      icon: "Globe",
      value: "85+",
      label: "Countries Reached",
      color: "text-primary"
    }
  ];

  const achievements = [
    {
      title: "Best Tech Blog 2023",
      organization: "Digital Media Awards",
      icon: "Award"
    },
    {
      title: "Top 50 Blogs to Follow",
      organization: "Content Marketing Institute",
      icon: "Star"
    },
    {
      title: "Excellence in Writing",
      organization: "Blogger\'s Choice Awards",
      icon: "Trophy"
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
    <div className="space-y-6">
      {/* Blog Statistics */}
      <motion.div 
        variants={itemVariants}
        className="bg-surface rounded-card p-6 content-shadow"
      >
        <h3 className="font-heading text-lg font-semibold text-primary mb-6">
          Our Impact
        </h3>
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-background rounded-card flex items-center justify-center">
                <Icon name={stat.icon} size={20} className={stat.color} />
              </div>
              <div>
                <div className="font-heading font-bold text-primary">{stat.value}</div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Awards & Recognition */}
      <motion.div 
        variants={itemVariants}
        className="bg-surface rounded-card p-6 content-shadow"
      >
        <h3 className="font-heading text-lg font-semibold text-primary mb-6">
          Awards & Recognition
        </h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-card flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={achievement.icon} size={16} className="text-accent" />
              </div>
              <div>
                <h4 className="font-heading font-medium text-primary text-sm">
                  {achievement.title}
                </h4>
                <p className="text-text-secondary text-xs">{achievement.organization}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div 
        variants={itemVariants}
        className="bg-accent/5 rounded-card p-6 border border-accent/20"
      >
        <div className="text-center">
          <Icon name="Mail" size={32} className="text-accent mx-auto mb-3" />
          <h3 className="font-heading text-lg font-semibold text-primary mb-2">
            Stay Updated
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            Get our latest articles and insights delivered to your inbox.
          </p>
          <button className="w-full bg-accent text-white px-4 py-2 rounded-button font-heading font-medium nav-transition hover:bg-accent/90 text-sm">
            Subscribe to Newsletter
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogStats;