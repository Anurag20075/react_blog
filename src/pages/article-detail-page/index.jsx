import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Breadcrumb from 'components/ui/Breadcrumb';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import SocialShare from './components/SocialShare';
import RelatedArticles from './components/RelatedArticles';
import CommentSection from './components/CommentSection';
import TableOfContents from './components/TableOfContents';
import ReadingProgress from './components/ReadingProgress';

const ArticleDetailPage = () => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  // Mock article data
  const article = {
    id: 1,
    title: "Building Scalable React Applications: A Complete Guide to Modern Development Practices",
    slug: "building-scalable-react-applications-guide",
    excerpt: "Learn how to build maintainable and scalable React applications using modern development practices, architectural patterns, and performance optimization techniques.",
    content: `React has revolutionized the way we build user interfaces, but creating scalable applications requires more than just knowing the basics. In this comprehensive guide, we'll explore the essential practices and patterns that will help you build maintainable, performant, and scalable React applications.

## Understanding Component Architecture

The foundation of any scalable React application lies in its component architecture. A well-structured component hierarchy not only makes your code more maintainable but also improves performance and developer experience.

### Component Composition Patterns

When building complex UIs, it's crucial to understand how to compose components effectively. The composition pattern allows you to build flexible and reusable components that can be easily extended and modified without breaking existing functionality.

Consider the following example of a flexible Card component:

\`\`\`jsx
const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={\`bg-white rounded-lg shadow-md \${className}\`} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => {
  return (
    <div className={\`p-6 border-b border-gray-200 \${className}\`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={\`p-6 \${className}\`}>
      {children}
    </div>
  );
};
\`\`\`

This approach allows for maximum flexibility while maintaining consistency across your application.

## State Management Strategies

As your application grows, managing state becomes increasingly complex. Understanding when to use local state, context, or external state management solutions is crucial for maintaining scalability.

### Local State vs Global State

Not all state needs to be global. In fact, keeping state as local as possible often leads to better performance and easier debugging. Use the following guidelines to determine where state should live:

- **Local State**: UI state, form inputs, temporary data
- **Context**: Theme preferences, user authentication, app-wide settings
- **External State Management**: Complex business logic, cached server data, shared application state

### Custom Hooks for State Logic

Custom hooks are an excellent way to encapsulate and reuse stateful logic. They help keep your components clean and focused on rendering while moving complex logic into reusable functions.

\`\`\`jsx
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
\`\`\`

## Performance Optimization Techniques

Performance is a critical aspect of scalable applications. React provides several built-in optimization techniques that you should leverage:

### Memoization and React.memo

Use React.memo to prevent unnecessary re-renders of components when their props haven't changed. This is particularly useful for expensive components or components that render frequently.

### Code Splitting and Lazy Loading

Implement code splitting to reduce your initial bundle size and improve loading times. React's lazy loading feature makes this straightforward:

\`\`\`jsx
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## Testing Strategies

A scalable application requires a comprehensive testing strategy. Focus on:

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **End-to-End Tests**: Test complete user workflows

### Testing Best Practices

- Write tests that focus on behavior, not implementation
- Use testing-library/react for component testing
- Mock external dependencies appropriately
- Maintain good test coverage without obsessing over 100%

## Conclusion

Building scalable React applications is an ongoing process that requires careful planning, consistent patterns, and continuous refactoring. By following these practices and staying up-to-date with the React ecosystem, you'll be well-equipped to build applications that can grow with your needs. Remember that scalability isn't just about handling more users or data—it's also about maintaining developer productivity and code quality as your team and codebase grow. Invest in good practices early, and your future self will thank you.`,
    author: {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Senior Frontend Developer with 8+ years of experience in React and modern web technologies.",
      articlesCount: 42,
      followersCount: 1250
    },
    category: {
      id: 1,
      name: "React Development",
      slug: "react-development",
      color: "#3B82F6"
    },
    tags: [
      { id: 1, name: "React", slug: "react" },
      { id: 2, name: "JavaScript", slug: "javascript" },
      { id: 3, name: "Frontend", slug: "frontend" },
      { id: 4, name: "Performance", slug: "performance" }
    ],
    publishedAt: "2024-01-15T10:30:00Z",
    readingTime: 12,
    heroImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    likes: 156,
    comments: 23,
    shares: 45,
    isLiked: false,
    isBookmarked: false
  };

  // Mock related articles
  const relatedArticles = [
    {
      id: 2,
      title: "Advanced React Hooks: useCallback and useMemo Explained",
      excerpt: "Deep dive into React\'s performance optimization hooks and when to use them effectively.",
      author: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      category: { name: "React Development", color: "#3B82F6" },
      publishedAt: "2024-01-10T14:20:00Z",
      readingTime: 8,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      slug: "advanced-react-hooks-guide"
    },
    {
      id: 3,
      title: "State Management in React: Redux vs Context API",
      excerpt: "Compare different state management solutions and learn when to use each approach.",
      author: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      category: { name: "React Development", color: "#3B82F6" },
      publishedAt: "2024-01-08T09:15:00Z",
      readingTime: 10,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      slug: "react-state-management-comparison"
    },
    {
      id: 4,
      title: "Testing React Components: Best Practices and Tools",
      excerpt: "Learn how to write effective tests for your React components using modern testing tools.",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      category: { name: "Testing", color: "#10B981" },
      publishedAt: "2024-01-05T16:45:00Z",
      readingTime: 15,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      slug: "react-testing-best-practices"
    }
  ];

  // Mock table of contents
  const tableOfContents = [
    { id: "understanding-component-architecture", title: "Understanding Component Architecture", level: 2 },
    { id: "component-composition-patterns", title: "Component Composition Patterns", level: 3 },
    { id: "state-management-strategies", title: "State Management Strategies", level: 2 },
    { id: "local-state-vs-global-state", title: "Local State vs Global State", level: 3 },
    { id: "custom-hooks-for-state-logic", title: "Custom Hooks for State Logic", level: 3 },
    { id: "performance-optimization-techniques", title: "Performance Optimization Techniques", level: 2 },
    { id: "memoization-and-react-memo", title: "Memoization and React.memo", level: 3 },
    { id: "code-splitting-and-lazy-loading", title: "Code Splitting and Lazy Loading", level: 3 },
    { id: "testing-strategies", title: "Testing Strategies", level: 2 },
    { id: "testing-best-practices", title: "Testing Best Practices", level: 3 },
    { id: "conclusion", title: "Conclusion", level: 2 }
  ];

  // Custom breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/home-blog-landing-page', isActive: false },
    { label: article.category.name, path: '/category-tag-archive-page', isActive: false },
    { label: article.title, path: '/article-detail-page', isActive: true }
  ];

  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgress progress={readingProgress} />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="py-6">
            <Breadcrumb customItems={breadcrumbItems} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <main className="lg:col-span-8">
              <article className="bg-surface rounded-card shadow-content overflow-hidden">
                {/* Article Header */}
                <ArticleHeader article={article} />

                {/* Hero Image */}
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={article.heroImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Content */}
                <div className="p-6 lg:p-8">
                  <ArticleContent content={article.content} />
                </div>

                {/* Article Footer */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          to={`/category-tag-archive-page?tag=${tag.slug}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-caption bg-accent/10 text-accent hover:bg-accent/20 nav-transition"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>

                    {/* Article Stats */}
                    <div className="flex items-center space-x-6 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={16} />
                        <span>{article.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={16} />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Share2" size={16} />
                        <span>{article.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Social Share */}
              <div className="mt-8">
                <SocialShare article={article} />
              </div>

              {/* Related Articles */}
              <div className="mt-12">
                <RelatedArticles articles={relatedArticles} />
              </div>

              {/* Comment Section */}
              <div className="mt-12">
                <CommentSection articleId={article.id} />
              </div>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents - Desktop */}
                <div className="hidden lg:block">
                  <TableOfContents items={tableOfContents} />
                </div>

                {/* Author Card */}
                <div className="bg-surface rounded-card shadow-content p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-text-primary mb-2">
                        {article.author.name}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4">
                        {article.author.bio}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                        <span>{article.author.articlesCount} articles</span>
                        <span>{article.author.followersCount} followers</span>
                      </div>
                      <Link
                        to="/author-profile-page"
                        className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 nav-transition font-caption font-medium"
                      >
                        <span>View Profile</span>
                        <Icon name="ArrowRight" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile Table of Contents Toggle */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
                    className="w-full bg-surface rounded-card shadow-content p-4 flex items-center justify-between text-left"
                  >
                    <span className="font-heading font-medium text-text-primary">
                      Table of Contents
                    </span>
                    <Icon 
                      name={isTableOfContentsOpen ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-secondary"
                    />
                  </button>
                  {isTableOfContentsOpen && (
                    <div className="mt-4">
                      <TableOfContents items={tableOfContents} />
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;