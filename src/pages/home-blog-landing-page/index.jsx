import React, { useState, useEffect } from 'react';

import Icon from 'components/AppIcon';

import Breadcrumb from 'components/ui/Breadcrumb';
import HeroSection from './components/HeroSection';
import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';
import LoadingSkeletons from './components/LoadingSkeletons';

const HomeBlogLandingPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const articlesPerPage = 9;

  // Mock data for articles
  const mockArticles = [
    {
      id: 1,
      title: "Getting Started with React 18: A Complete Guide",
      excerpt: "Learn the fundamentals of React 18 including new features like concurrent rendering, automatic batching, and Suspense improvements.",
      content: `React 18 introduces several groundbreaking features that revolutionize how we build user interfaces. This comprehensive guide covers everything you need to know about the latest version of React.

Concurrent rendering is perhaps the most significant addition, allowing React to prepare multiple versions of the UI at the same time. This means better user experience with smoother interactions and improved performance.

Automatic batching is another game-changer, grouping multiple state updates into a single re-render for better performance. Previously, this only worked for React event handlers, but now it works everywhere.`,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      category: "React",
      author: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        bio: "Senior Frontend Developer with 8+ years of experience in React ecosystem"
      },
      publishDate: "2024-01-15",
      readTime: 8,
      tags: ["React", "JavaScript", "Frontend"],
      featured: true
    },
    {
      id: 2,
      title: "Modern CSS Grid Layouts: Beyond the Basics",
      excerpt: "Explore advanced CSS Grid techniques for creating complex, responsive layouts that adapt beautifully to any screen size.",
      content: `CSS Grid has transformed how we approach web layouts, offering unprecedented control over both rows and columns. This article dives deep into advanced Grid techniques that will elevate your design skills.

We'll explore subgrid, a powerful feature that allows nested grids to participate in the sizing of their parent grid. This creates more cohesive and flexible layouts than ever before.

Container queries represent the future of responsive design, allowing components to respond to their container's size rather than the viewport. Combined with Grid, this opens up new possibilities for truly modular design systems.`,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      category: "CSS",
      author: {
        name: "Michael Chen",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        bio: "UI/UX Designer and CSS specialist with a passion for modern web standards"
      },
      publishDate: "2024-01-12",
      readTime: 6,
      tags: ["CSS", "Grid", "Responsive Design"],
      featured: false
    },
    {
      id: 3,
      title: "Node.js Performance Optimization Strategies",
      excerpt: "Discover proven techniques to boost your Node.js application performance, from memory management to database optimization.",
      content: `Performance optimization in Node.js requires a deep understanding of the event loop, memory management, and asynchronous programming patterns. This guide provides actionable strategies for building high-performance applications.

Memory leaks are one of the most common performance killers in Node.js applications. We'll explore tools like clinic.js and 0x for profiling and identifying bottlenecks in your application.

Database optimization plays a crucial role in overall application performance. From connection pooling to query optimization, we'll cover best practices for working with both SQL and NoSQL databases.`,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      category: "Node.js",
      author: {
        name: "David Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        bio: "Backend architect with expertise in scalable Node.js applications"
      },
      publishDate: "2024-01-10",
      readTime: 12,
      tags: ["Node.js", "Performance", "Backend"],
      featured: false
    },
    {
      id: 4,
      title: "TypeScript Best Practices for Large Applications",
      excerpt: "Learn how to structure and maintain TypeScript codebases that scale with your team and project requirements.",
      content: `TypeScript has become the de facto standard for large-scale JavaScript applications, providing type safety and enhanced developer experience. This article covers best practices for enterprise-level TypeScript development.

Proper type organization is crucial for maintainable codebases. We'll explore strategies for organizing types, interfaces, and utility types across your application architecture.

Advanced TypeScript features like conditional types, mapped types, and template literal types can significantly improve code quality and developer productivity when used correctly.`,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
      category: "TypeScript",
      author: {
        name: "Emily Watson",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        bio: "TypeScript evangelist and software architect"
      },
      publishDate: "2024-01-08",
      readTime: 10,
      tags: ["TypeScript", "JavaScript", "Architecture"],
      featured: false
    },
    {
      id: 5,
      title: "Building Accessible Web Components",
      excerpt: "Create inclusive web experiences by implementing proper accessibility patterns in your custom components.",
      content: `Web accessibility is not just a legal requirement—it's a moral imperative that ensures your applications are usable by everyone. This guide focuses on building accessible custom components from the ground up. ARIA attributes provide semantic meaning to assistive technologies, but they must be used correctly to be effective. We'll explore common patterns and anti-patterns in ARIA implementation.Keyboard navigation is often overlooked in modern web development, yet it's crucial for users who cannot use a mouse. We'll cover focus management, keyboard shortcuts, and navigation patterns.`,
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
      category: "Accessibility",
      author: {
        name: "Alex Thompson",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        bio: "Accessibility consultant and inclusive design advocate"
      },
      publishDate: "2024-01-05",
      readTime: 7,
      tags: ["Accessibility", "Web Components", "UX"],
      featured: false
    },
    {
      id: 6,
      title: "GraphQL vs REST: Choosing the Right API Strategy",
      excerpt: "Compare GraphQL and REST APIs to make informed decisions about your application\'s data fetching strategy.",
      content: `The choice between GraphQL and REST isn't always straightforward. Each approach has its strengths and trade-offs that must be carefully considered based on your specific use case and team constraints.

GraphQL excels in scenarios where you need flexible data fetching, have multiple client applications with different data requirements, or want to minimize over-fetching and under-fetching of data.

REST APIs remain the gold standard for many applications, especially when you need simplicity, have well-defined resources, or are working with teams that have extensive REST experience.`,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      category: "API Design",
      author: {
        name: "Maria Garcia",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        bio: "API architect and backend systems specialist"
      },
      publishDate: "2024-01-03",
      readTime: 9,
      tags: ["GraphQL", "REST", "API Design"],
      featured: false
    },
    {
      id: 7,
      title: "Micro-Frontends: Architecture for Scale",
      excerpt: "Explore micro-frontend architecture patterns that enable large teams to work independently while maintaining a cohesive user experience.",
      content: `Micro-frontends extend the microservices concept to frontend development, allowing teams to work independently on different parts of a web application while maintaining a unified user experience.

Module federation in Webpack 5 has revolutionized how we approach micro-frontend architecture, enabling runtime composition of applications from independently deployed modules.

The key to successful micro-frontend implementation lies in establishing clear boundaries, shared design systems, and robust communication patterns between different frontend applications.`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      category: "Architecture",
      author: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        bio: "Frontend architect specializing in large-scale application design"
      },
      publishDate: "2024-01-01",
      readTime: 11,
      tags: ["Micro-frontends", "Architecture", "Webpack"],
      featured: false
    },
    {
      id: 8,
      title: "Web Performance Optimization in 2024",
      excerpt: "Master the latest techniques for optimizing web performance, from Core Web Vitals to advanced caching strategies.",
      content: `Web performance directly impacts user experience, SEO rankings, and business metrics. This comprehensive guide covers the latest optimization techniques and tools for 2024.

Core Web Vitals have become crucial ranking factors for Google, making performance optimization more important than ever. We'll explore strategies for improving LCP, FID, and CLS metrics.

Advanced caching strategies, including service workers, CDN optimization, and browser caching policies, can dramatically improve perceived performance and reduce server load.`,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
      category: "Performance",
      author: {
        name: "Lisa Anderson",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
        bio: "Performance engineer and web optimization specialist"
      },
      publishDate: "2023-12-28",
      readTime: 8,
      tags: ["Performance", "Web Vitals", "Optimization"],
      featured: false
    },
    {
      id: 9,
      title: "Serverless Architecture with AWS Lambda",
      excerpt: "Build scalable, cost-effective applications using serverless architecture patterns and AWS Lambda functions.",
      content: `Serverless architecture has transformed how we build and deploy applications, offering automatic scaling, reduced operational overhead, and pay-per-use pricing models.

AWS Lambda provides a robust platform for serverless computing, but success requires understanding its limitations, cold start optimization, and proper architecture patterns.

Event-driven architecture is at the heart of effective serverless design, enabling loose coupling between services and natural scalability patterns that align with business logic.`,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      category: "Serverless",
      author: {
        name: "Robert Kim",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
        bio: "Cloud architect and serverless computing expert"
      },
      publishDate: "2023-12-25",
      readTime: 10,
      tags: ["Serverless", "AWS", "Lambda"],
      featured: false
    },
    {
      id: 10,
      title: "Advanced React Patterns and Hooks",
      excerpt: "Dive deep into advanced React patterns, custom hooks, and performance optimization techniques for complex applications.",
      content: `Advanced React development requires mastery of patterns that promote code reusability, maintainability, and performance. This article explores sophisticated techniques for experienced developers.

Custom hooks are one of React's most powerful features, enabling logic reuse across components while maintaining the benefits of the hooks paradigm. We'll explore patterns for building robust, reusable hooks.

Performance optimization in React goes beyond basic memoization. We'll cover advanced techniques like virtualization, code splitting, and strategic use of React's concurrent features.`,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      category: "React",
      author: {
        name: "Jennifer Lee",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        bio: "React core team contributor and frontend consultant"
      },
      publishDate: "2023-12-22",
      readTime: 13,
      tags: ["React", "Hooks", "Performance"],
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    const loadArticles = () => {
      setLoading(true);
      setTimeout(() => {
        const startIndex = (currentPage - 1) * articlesPerPage;
        const endIndex = startIndex + articlesPerPage;
        const newArticles = mockArticles.slice(startIndex, endIndex);
        
        if (currentPage === 1) {
          setArticles(newArticles);
        } else {
          setArticles(prev => [...prev, ...newArticles]);
        }
        
        setHasMore(endIndex < mockArticles.length);
        setLoading(false);
      }, 1000);
    };

    loadArticles();
  }, [currentPage]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const featuredArticle = mockArticles.find(article => article.featured);
  const displayedArticles = articles.filter(article => !article.featured);

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Hero Section */}
        {featuredArticle && (
          <HeroSection article={featuredArticle} />
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Articles Grid */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                Latest Articles
              </h2>
              <p className="text-text-secondary">
                Discover our latest insights and tutorials
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Loading Skeletons */}
            {loading && <LoadingSkeletons count={4} />}

            {/* Load More Button */}
            {!loading && hasMore && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90"
                >
                  <span>Load More Articles</span>
                  <Icon name="ChevronDown" size={20} />
                </button>
              </div>
            )}

            {/* No More Articles */}
            {!loading && !hasMore && articles.length > 0 && (
              <div className="text-center py-8">
                <p className="text-text-secondary">
                  You've reached the end of our articles
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar articles={mockArticles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBlogLandingPage;