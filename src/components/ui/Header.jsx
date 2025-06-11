import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Home', path: '/home-blog-landing-page', icon: 'Home' },
    { label: 'Categories', path: '/category-tag-archive-page', icon: 'FolderOpen' },
    { label: 'Authors', path: '/author-profile-page', icon: 'Users' },
    { label: 'About', path: '/about-contact-page', icon: 'Info' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search-results-page?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-16">
            {/* Logo */}
            <Link 
              to="/home-blog-landing-page" 
              className="flex items-center space-x-2 nav-transition hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary hidden sm:block">
                BlogHub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-heading font-medium nav-transition px-3 py-2 rounded-button ${
                    isActivePath(item.path)
                      ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Search & Mobile Controls */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search */}
              <div className="hidden lg:block relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <div className="relative">
                      <input
                        ref={searchRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search articles..."
                        className="w-64 pl-10 pr-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent nav-transition"
                      />
                      <Icon 
                        name="Search" 
                        size={18} 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                      />
                    </div>
                    <button
                      type="button"
                      onClick={closeSearch}
                      className="ml-2 p-2 text-text-secondary hover:text-text-primary nav-transition"
                    >
                      <Icon name="X" size={18} />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={toggleSearch}
                    className="p-2 text-text-secondary hover:text-accent nav-transition rounded-button hover:bg-accent/5"
                    aria-label="Open search"
                  >
                    <Icon name="Search" size={20} />
                  </button>
                )}
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={toggleSearch}
                className="lg:hidden p-2 text-text-secondary hover:text-accent nav-transition rounded-button hover:bg-accent/5"
                aria-label="Search"
              >
                <Icon name="Search" size={20} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-text-secondary hover:text-accent nav-transition rounded-button hover:bg-accent/5"
                aria-label="Toggle menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-slide-down">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                  <Icon 
                    name="Search" 
                    size={18} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 mobile-menu-backdrop z-backdrop lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-surface shadow-elevated z-mobile-menu transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-card flex items-center justify-center">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                BlogHub
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-text-secondary hover:text-accent nav-transition rounded-button hover:bg-accent/5"
              aria-label="Close menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <nav className="flex-1 px-6 py-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-button nav-transition ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10' :'text-text-primary hover:text-accent hover:bg-accent/5'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span className="font-heading font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;