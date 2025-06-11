import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import SearchComponent from 'components/ui/SearchComponent';
import SearchFilters from './components/SearchFilters';
import SearchResultCard from './components/SearchResultCard';
import NoResults from './components/NoResults';
import LoadingSkeleton from './components/LoadingSkeleton';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    contentType: 'all',
    category: 'all',
    dateRange: 'all',
    author: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const resultsPerPage = 10;

  // Mock search results data
  const mockResults = [
    {
      id: 1,
      title: "Getting Started with React Hooks: A Complete Guide",
      excerpt: `React Hooks revolutionized how we write React components by allowing us to use state and other React features without writing a class. This comprehensive guide covers useState, useEffect, and custom hooks with practical examples.`,
      author: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        profile: "/author-profile-page"
      },
      category: "React",
      date: "2024-01-15",
      readTime: "8 min read",
      relevanceScore: 95,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript Best Practices for Modern Development",
      excerpt: `Explore essential JavaScript best practices that every developer should know. From ES6+ features to performance optimization, this article covers the fundamentals of writing clean, maintainable JavaScript code.`,
      author: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        profile: "/author-profile-page"
      },
      category: "JavaScript",
      date: "2024-01-12",
      readTime: "12 min read",
      relevanceScore: 88,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "CSS Grid Layout: Building Responsive Designs",
      excerpt: `Master CSS Grid Layout with this comprehensive tutorial. Learn how to create complex, responsive layouts with ease using CSS Grid properties and techniques.`,
      author: {
        name: "Emily Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        profile: "/author-profile-page"
      },
      category: "CSS",
      date: "2024-01-10",
      readTime: "10 min read",
      relevanceScore: 82,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Node.js Performance Optimization Techniques",
      excerpt: `Discover proven techniques to optimize your Node.js applications for better performance. From memory management to async operations, learn how to build faster backend services.`,
      author: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        profile: "/author-profile-page"
      },
      category: "Node.js",
      date: "2024-01-08",
      readTime: "15 min read",
      relevanceScore: 79,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "TypeScript for Beginners: A Practical Introduction",
      excerpt: `Learn TypeScript from scratch with this beginner-friendly guide. Understand types, interfaces, and how TypeScript can improve your JavaScript development workflow.`,
      author: {
        name: "Lisa Wang",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        profile: "/author-profile-page"
      },
      category: "TypeScript",
      date: "2024-01-05",
      readTime: "11 min read",
      relevanceScore: 75,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Building RESTful APIs with Express.js",
      excerpt: `A comprehensive guide to building robust RESTful APIs using Express.js. Learn about routing, middleware, error handling, and best practices for API development.`,
      author: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        profile: "/author-profile-page"
      },
      category: "Backend",
      date: "2024-01-03",
      readTime: "14 min read",
      relevanceScore: 72,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
    },
    {
      id: 7,
      title: "React State Management: Redux vs Context API",
      excerpt: `Compare different state management solutions in React. Understand when to use Redux, Context API, or other state management libraries in your React applications.`,
      author: {
        name: "Jennifer Lee",
        avatar: "https://randomuser.me/api/portraits/women/38.jpg",
        profile: "/author-profile-page"
      },
      category: "React",
      date: "2024-01-01",
      readTime: "13 min read",
      relevanceScore: 85,
      type: "article",
      slug: "/article-detail-page",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    }
  ];

  const popularArticles = [
    {
      id: 101,
      title: "10 Essential VS Code Extensions for Developers",
      category: "Tools",
      readTime: "6 min read"
    },
    {
      id: 102,
      title: "Understanding Async/Await in JavaScript",
      category: "JavaScript",
      readTime: "9 min read"
    },
    {
      id: 103,
      title: "Git Workflow Best Practices",
      category: "Git",
      readTime: "7 min read"
    }
  ];

  // Simulate search API call
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (query) {
        const searchResults = mockResults.filter(article =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.category.toLowerCase().includes(query.toLowerCase()) ||
          article.author.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(searchResults);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [query]);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...results];

    // Apply filters
    if (filters.contentType !== 'all') {
      filtered = filtered.filter(item => item.type === filters.contentType);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(item => new Date(item.date) >= filterDate);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
      case 'relevance':
      default:
        filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
        break;
    }

    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [results, filters, sortBy]);

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/home-blog-landing-page', isActive: false },
    { label: 'Search', path: '/search-results-page', isActive: false },
    { label: `"${query}"`, path: `/search-results-page?q=${query}`, isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-primary mb-2">
                Search Results
              </h1>
              {query && (
                <p className="text-text-secondary">
                  {isLoading ? 'Searching...' : `${filteredResults.length} results found for "${query}"`}
                </p>
              )}
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-border rounded-button hover:bg-accent/5 nav-transition"
            >
              <Icon name="Filter" size={18} />
              <span className="font-caption font-medium">Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchComponent 
              placeholder="Search articles, authors, categories..."
              autoFocus={!query}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              resultCount={filteredResults.length}
            />
            
            {/* Popular Articles */}
            <div className="mt-8 p-6 bg-surface border border-border rounded-card">
              <h3 className="font-heading font-semibold text-primary mb-4">
                Popular Articles
              </h3>
              <div className="space-y-4">
                {popularArticles.map((article) => (
                  <Link
                    key={article.id}
                    to="/article-detail-page"
                    className="block group"
                  >
                    <h4 className="font-caption font-medium text-text-primary group-hover:text-accent nav-transition text-sm mb-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Results Content */}
          <div className="flex-1">
            {/* Sort Options */}
            {!isLoading && filteredResults.length > 0 && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 p-4 bg-surface border border-border rounded-card">
                <div className="flex items-center space-x-4">
                  <span className="font-caption font-medium text-text-primary text-sm">
                    Sort by:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="border border-border rounded-button px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="popularity">Popularity</option>
                  </select>
                </div>
                
                <div className="text-sm text-text-secondary">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of {filteredResults.length} results
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && <LoadingSkeleton />}

            {/* No Results */}
            {!isLoading && query && filteredResults.length === 0 && (
              <NoResults query={query} popularArticles={popularArticles} />
            )}

            {/* No Query State */}
            {!isLoading && !query && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-primary mb-2">
                  Start Your Search
                </h3>
                <p className="text-text-secondary mb-6">
                  Enter a search term to find articles, authors, and categories.
                </p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && filteredResults.length > 0 && (
              <>
                <div className="space-y-6">
                  {currentResults.map((result) => (
                    <SearchResultCard
                      key={result.id}
                      result={result}
                      searchQuery={query}
                      highlightSearchTerm={highlightSearchTerm}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-text-secondary">
                      Page {currentPage} of {totalPages}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center space-x-1 px-3 py-2 border border-border rounded-button disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/5 nav-transition"
                      >
                        <Icon name="ChevronLeft" size={16} />
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1;
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`w-10 h-10 rounded-button font-caption font-medium nav-transition ${
                                currentPage === page
                                  ? 'bg-accent text-white' :'border border-border hover:bg-accent/5'
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center space-x-1 px-3 py-2 border border-border rounded-button disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/5 nav-transition"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <Icon name="ChevronRight" size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;