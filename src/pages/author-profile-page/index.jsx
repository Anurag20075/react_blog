import React, { useState, useEffect } from 'react';



import Breadcrumb from 'components/ui/Breadcrumb';
import AuthorHeader from './components/AuthorHeader';
import AuthorArticles from './components/AuthorArticles';
import AuthorSidebar from './components/AuthorSidebar';
import ContactForm from './components/ContactForm';

const AuthorProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Mock author data
  const authorData = {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Senior Frontend Developer and Technical Writer with 8+ years of experience in React, JavaScript, and modern web technologies. Passionate about creating intuitive user experiences and sharing knowledge through writing.",
    expandedBio: `I'm a passionate software engineer with over 8 years of experience specializing in frontend development. My journey in technology began with a fascination for building things that people interact with daily. This curiosity led me to pursue a degree in Computer Science and eventually specialize in creating intuitive, efficient, and beautiful web applications.

What drives me is the intersection of technology and human experience – finding ways to make complex systems feel simple and intuitive for users while maintaining technical excellence behind the scenes.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or writing about the latest trends in web development. I believe in the power of community and knowledge sharing, which is why I regularly speak at conferences and mentor aspiring developers.`,
    location: "San Francisco, CA",
    website: "https://sarahjohnson.dev",
    email: "sarah@sarahjohnson.dev",
    joinDate: "January 2020",
    socialLinks: {
      twitter: "https://twitter.com/sarahdev",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      github: "https://github.com/sarahdev",
      instagram: "https://instagram.com/sarahcodes"
    },
    stats: {
      totalArticles: 47,
      followers: 2840,
      totalViews: 125000,
      avgReadTime: "6 min"
    },
    achievements: [
      "Top Writer in Technology 2023",
      "Featured in Dev.to Weekly",
      "Speaker at React Conference 2023",
      "Open Source Contributor"
    ],
    expertise: ["React", "JavaScript", "TypeScript", "Node.js", "UI/UX Design", "Technical Writing"]
  };

  // Mock articles data
  const articlesData = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Hooks",
      excerpt: "Learn how to leverage React\'s latest hooks to build maintainable and scalable applications that can grow with your team.",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
      publishDate: "2024-01-15",
      category: "React",
      readTime: "8 min read",
      views: 3420,
      likes: 156,
      comments: 23
    },
    {
      id: 2,
      title: "The Complete Guide to TypeScript in 2024",
      excerpt: "Everything you need to know about TypeScript, from basic types to advanced patterns and best practices for modern development.",
      thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop",
      publishDate: "2024-01-08",
      category: "TypeScript",
      readTime: "12 min read",
      views: 5680,
      likes: 234,
      comments: 45
    },
    {
      id: 3,
      title: "Optimizing Web Performance: A Developer\'s Guide",
      excerpt: "Practical techniques and tools to improve your website\'s performance, from code splitting to image optimization.",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      publishDate: "2023-12-28",
      category: "Performance",
      readTime: "10 min read",
      views: 4230,
      likes: 189,
      comments: 34
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use Which",
      excerpt: "A comprehensive comparison of CSS Grid and Flexbox with practical examples and use cases for modern web layouts.",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      publishDate: "2023-12-20",
      category: "CSS",
      readTime: "7 min read",
      views: 2890,
      likes: 142,
      comments: 28
    },
    {
      id: 5,
      title: "Building Accessible Web Applications",
      excerpt: "Essential accessibility principles and techniques to make your web applications usable by everyone.",
      thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      publishDate: "2023-12-12",
      category: "Accessibility",
      readTime: "9 min read",
      views: 3150,
      likes: 167,
      comments: 31
    },
    {
      id: 6,
      title: "Modern JavaScript ES2024 Features",
      excerpt: "Explore the latest JavaScript features and how they can improve your development workflow and code quality.",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop",
      publishDate: "2023-12-05",
      category: "JavaScript",
      readTime: "6 min read",
      views: 4560,
      likes: 203,
      comments: 42
    }
  ];

  // Mock related authors
  const relatedAuthors = [
    {
      id: 2,
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Full-stack developer specializing in Node.js and React",
      articles: 32,
      followers: 1840
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "UX Engineer passionate about design systems",
      articles: 28,
      followers: 2150
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "DevOps engineer and cloud architecture expert",
      articles: 41,
      followers: 3200
    }
  ];

  const categories = ['all', 'React', 'JavaScript', 'TypeScript', 'CSS', 'Performance', 'Accessibility'];
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 3 Months' },
    { value: '365', label: 'Last Year' }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/home-blog-landing-page', isActive: false },
    { label: 'Authors', path: '/author-profile-page', isActive: false },
    { label: authorData.name, path: '/author-profile-page', isActive: true }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleContactClick = () => {
    setShowContactForm(true);
  };

  const filteredArticles = articlesData.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    
    let dateMatch = true;
    if (selectedDateRange !== 'all') {
      const articleDate = new Date(article.publishDate);
      const daysAgo = parseInt(selectedDateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
      dateMatch = articleDate >= cutoffDate;
    }
    
    return categoryMatch && dateMatch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="animate-pulse">
            <div className="h-8 bg-border rounded w-64 mb-8"></div>
            <div className="bg-surface rounded-card p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="w-32 h-32 bg-border rounded-full"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-border rounded w-48"></div>
                  <div className="h-4 bg-border rounded w-96"></div>
                  <div className="h-4 bg-border rounded w-80"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-surface rounded-card p-6">
                    <div className="h-48 bg-border rounded mb-4"></div>
                    <div className="h-6 bg-border rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-border rounded w-full mb-2"></div>
                    <div className="h-4 bg-border rounded w-2/3"></div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="bg-surface rounded-card p-6">
                  <div className="h-6 bg-border rounded w-32 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-4 bg-border rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <Breadcrumb customItems={breadcrumbItems} />
        
        <AuthorHeader 
          author={authorData}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onContact={handleContactClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <AuthorArticles 
              articles={filteredArticles}
              categories={categories}
              dateRanges={dateRanges}
              selectedCategory={selectedCategory}
              selectedDateRange={selectedDateRange}
              onCategoryChange={setSelectedCategory}
              onDateRangeChange={setSelectedDateRange}
            />
          </div>
          
          <div className="lg:col-span-1">
            <AuthorSidebar 
              author={authorData}
              relatedAuthors={relatedAuthors}
            />
          </div>
        </div>
      </div>

      {showContactForm && (
        <ContactForm 
          author={authorData}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
};

export default AuthorProfilePage;