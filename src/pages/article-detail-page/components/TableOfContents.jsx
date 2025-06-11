import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const TableOfContents = ({ items }) => {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-surface rounded-card shadow-content p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="List" size={20} className="text-accent" />
        <h3 className="font-heading font-semibold text-text-primary">
          Table of Contents
        </h3>
      </div>

      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToHeading(item.id)}
                className={`w-full text-left px-3 py-2 rounded-button nav-transition text-sm ${
                  activeId === item.id
                    ? 'bg-accent/10 text-accent font-medium' :'text-text-secondary hover:text-accent hover:bg-accent/5'
                } ${item.level === 3 ? 'ml-4' : ''}`}
              >
                <span className="line-clamp-2">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Reading Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
          <span>Reading Progress</span>
          <span>75%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;