import React from 'react';
import Icon from 'components/AppIcon';

const SearchFilters = ({ filters, onFilterChange, resultCount }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      contentType: 'all',
      category: 'all',
      dateRange: 'all',
      author: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  const filterSections = [
    {
      title: 'Content Type',
      key: 'contentType',
      options: [
        { value: 'all', label: 'All Content' },
        { value: 'article', label: 'Articles' },
        { value: 'tutorial', label: 'Tutorials' },
        { value: 'guide', label: 'Guides' }
      ]
    },
    {
      title: 'Category',
      key: 'category',
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'react', label: 'React' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'css', label: 'CSS' },
        { value: 'node.js', label: 'Node.js' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'backend', label: 'Backend' }
      ]
    },
    {
      title: 'Date Range',
      key: 'dateRange',
      options: [
        { value: 'all', label: 'All Time' },
        { value: 'week', label: 'Past Week' },
        { value: 'month', label: 'Past Month' },
        { value: 'year', label: 'Past Year' }
      ]
    }
  ];

  return (
    <div className="bg-surface border border-border rounded-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-primary">
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-accent hover:text-accent/80 nav-transition"
          >
            Clear All
          </button>
        )}
      </div>

      {resultCount > 0 && (
        <div className="mb-6 p-3 bg-accent/5 border border-accent/20 rounded-button">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-accent" />
            <span className="text-sm font-caption text-accent">
              {resultCount} results found
            </span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filterSections.map((section) => (
          <div key={section.key}>
            <h4 className="font-caption font-medium text-text-primary mb-3">
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name={section.key}
                    value={option.value}
                    checked={filters[section.key] === option.value}
                    onChange={(e) => handleFilterChange(section.key, e.target.value)}
                    className="w-4 h-4 text-accent border-border focus:ring-accent/20 focus:ring-2"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary nav-transition">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-caption font-medium text-text-primary mb-3">
          Quick Filters
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('dateRange', 'week')}
            className={`px-3 py-1 text-xs rounded-full border nav-transition ${
              filters.dateRange === 'week' ?'bg-accent text-white border-accent' :'border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => handleFilterChange('category', 'react')}
            className={`px-3 py-1 text-xs rounded-full border nav-transition ${
              filters.category === 'react' ?'bg-accent text-white border-accent' :'border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            React
          </button>
          <button
            onClick={() => handleFilterChange('category', 'javascript')}
            className={`px-3 py-1 text-xs rounded-full border nav-transition ${
              filters.category === 'javascript' ?'bg-accent text-white border-accent' :'border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
          >
            JavaScript
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;