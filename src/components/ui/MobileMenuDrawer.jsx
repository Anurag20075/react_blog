import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileMenuDrawer = ({ 
  isOpen, 
  onClose, 
  navigationItems = [],
  className = "" 
}) => {
  const location = useLocation();
  const drawerRef = useRef(null);

  const defaultNavigationItems = [
    { label: 'Home', path: '/home-blog-landing-page', icon: 'Home' },
    { label: 'Categories', path: '/category-tag-archive-page', icon: 'FolderOpen' },
    { label: 'Authors', path: '/author-profile-page', icon: 'Users' },
    { label: 'About', path: '/about-contact-page', icon: 'Info' },
  ];

  const menuItems = navigationItems.length > 0 ? navigationItems : defaultNavigationItems;

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector('button, a');
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 mobile-menu-backdrop z-backdrop lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface shadow-elevated z-mobile-menu transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link 
              to="/home-blog-landing-page" 
              onClick={handleLinkClick}
              className="flex items-center space-x-2 nav-transition hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                BlogHub
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-accent nav-transition rounded-button hover:bg-accent/5"
              aria-label="Close navigation menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 py-4" role="navigation">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-button nav-transition ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                    aria-current={isActivePath(item.path) ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-heading font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-text-secondary font-caption">
                © 2024 BlogHub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenuDrawer;