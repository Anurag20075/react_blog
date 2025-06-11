import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TeamMemberCard = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      className="bg-background rounded-card p-6 border border-border nav-transition hover:shadow-content"
    >
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-primary mb-1">{member.name}</h3>
          <p className="text-accent text-sm font-medium mb-2">{member.role}</p>
          <button
            onClick={toggleExpanded}
            className="flex items-center space-x-1 text-text-secondary hover:text-accent nav-transition text-sm"
          >
            <span>{isExpanded ? 'Show less' : 'Learn more'}</span>
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <p className="text-text-secondary text-sm leading-relaxed">
              {member.bio}
            </p>

            {/* Expertise */}
            <div>
              <h4 className="font-heading font-medium text-primary text-sm mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-button"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {member.social.twitter && (
                <a
                  href={`https://twitter.com/${member.social.twitter.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent nav-transition"
                  aria-label={`${member.name} on Twitter`}
                >
                  <Icon name="Twitter" size={16} />
                </a>
              )}
              {member.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${member.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent nav-transition"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Icon name="Linkedin" size={16} />
                </a>
              )}
              {member.social.github && (
                <a
                  href={`https://github.com/${member.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent nav-transition"
                  aria-label={`${member.name} on GitHub`}
                >
                  <Icon name="Github" size={16} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamMemberCard;