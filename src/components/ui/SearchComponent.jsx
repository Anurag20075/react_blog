import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchComponent = ({ 
  placeholder = "Search articles...", 
  className = "",
  showRecentSearches = true,
  autoFocus = false 
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions] = useState([
    'React Hooks Tutorial',
    'JavaScript Best Practices',
    'CSS Grid Layout',
    'Node.js Performance',
    'TypeScript Guide'
  ]);
  
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const performSearch = (searchQuery) => {
    // Add to recent searches
    const updatedRecent = [searchQuery, ...recentSearches.filter(item => item !== searchQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
    
    // Navigate to search results
    navigate(`/search-results-page?q=${encodeURIComponent(searchQuery)}`);
    setIsOpen(false);
    setQuery('');
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    performSearch(suggestion);
  };

  const handleRecentSearchClick = (recentSearch) => {
    setQuery(recentSearch);
    performSearch(recentSearch);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase()) && 
    suggestion.toLowerCase() !== query.toLowerCase()
  );

  const showDropdown = isOpen && (query.length > 0 || recentSearches.length > 0);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent nav-transition bg-surface"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>
      </form>

      {/* Search Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-card shadow-content z-dropdown animate-slide-down">
          {/* Recent Searches */}
          {showRecentSearches && recentSearches.length > 0 && query.length === 0 && (
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-caption font-medium text-text-primary text-sm">Recent Searches</h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-text-secondary hover:text-accent text-xs nav-transition"
                >
                  Clear
                </button>
              </div>
              <ul className="space-y-2">
                {recentSearches.map((search, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded-button hover:bg-accent/5 nav-transition"
                    >
                      <Icon name="Clock" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{search}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggestions */}
          {query.length > 0 && filteredSuggestions.length > 0 && (
            <div className="p-4">
              <h4 className="font-caption font-medium text-text-primary text-sm mb-3">Suggestions</h4>
              <ul className="space-y-2">
                {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center space-x-2 w-full text-left px-2 py-1 rounded-button hover:bg-accent/5 nav-transition"
                    >
                      <Icon name="Search" size={14} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{suggestion}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* No Results */}
          {query.length > 0 && filteredSuggestions.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-sm text-text-secondary">No suggestions found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;