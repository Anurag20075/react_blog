import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';


const Sidebar = ({ articles }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const popularArticles = articles
    .filter(article => !article.featured)
    .sort((a, b) => b.readTime - a.readTime)
    .slice(0, 5);

  const categories = [
    { name: 'React', count: 15, color: 'bg-blue-500' },
    { name: 'JavaScript', count: 23, color: 'bg-yellow-500' },
    { name: 'CSS', count: 12, color: 'bg-purple-500' },
    { name: 'Node.js', count: 8, color: 'bg-green-500' },
    { name: 'TypeScript', count: 10, color: 'bg-blue-600' },
    { name: 'Performance', count: 6, color: 'bg-red-500' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#', color: 'text-blue-400' },
    { name: 'GitHub', icon: 'Github', url: '#', color: 'text-gray-600' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#', color: 'text-blue-600' },
    { name: 'YouTube', icon: 'Youtube', url: '#', color: 'text-red-500' }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <aside className="space-y-8">
      {/* Popular Articles */}
      <div className="bg-surface rounded-card p-6 content-shadow">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-accent" />
          Popular Articles
        </h3>
        <div className="space-y-4">
          {popularArticles.map((article, index) => (
            <article key={article.id} className="flex space-x-3 group">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-heading text-sm font-medium text-primary group-hover:text-accent nav-transition leading-tight mb-1">
                  <Link to={`/article-detail-page?id=${article.id}`}>
                    {article.title}
                  </Link>
                </h4>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{formatDate(article.publishDate)}</span>
                  <span>•</span>
                  <span>{article.readTime}m read</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-surface rounded-card p-6 content-shadow">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="FolderOpen" size={20} className="mr-2 text-accent" />
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category-tag-archive-page?category=${encodeURIComponent(category.name)}`}
              className="flex items-center justify-between p-2 rounded-button hover:bg-accent/5 nav-transition group"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span className="font-medium text-text-primary group-hover:text-accent nav-transition">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-text-secondary bg-background px-2 py-1 rounded-full">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-card p-6 content-shadow">
        <h3 className="font-heading text-lg font-semibold text-primary mb-2 flex items-center">
          <Icon name="Mail" size={20} className="mr-2 text-accent" />
          Newsletter
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          Get the latest articles and insights delivered to your inbox weekly.
        </p>
        
        {subscribed ? (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-button">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent text-sm"
              required
            />
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-button font-heading font-medium nav-transition hover:bg-accent/90 text-sm"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      {/* Social Media Links */}
      <div className="bg-surface rounded-card p-6 content-shadow">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="Share2" size={20} className="mr-2 text-accent" />
          Follow Us
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-3 rounded-button border border-border hover:border-accent/20 hover:bg-accent/5 nav-transition group"
            >
              <Icon name={social.icon} size={18} className={`${social.color} group-hover:scale-110 nav-transition`} />
              <span className="text-sm font-medium text-text-primary group-hover:text-accent nav-transition">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Archive */}
      <div className="bg-surface rounded-card p-6 content-shadow">
        <h3 className="font-heading text-lg font-semibold text-primary mb-4 flex items-center">
          <Icon name="Archive" size={20} className="mr-2 text-accent" />
          Archive
        </h3>
        <div className="space-y-2">
          {[
            { month: 'January 2024', count: 8 },
            { month: 'December 2023', count: 12 },
            { month: 'November 2023', count: 15 },
            { month: 'October 2023', count: 10 }
          ].map((archive) => (
            <Link
              key={archive.month}
              to={`/category-tag-archive-page?month=${encodeURIComponent(archive.month)}`}
              className="flex items-center justify-between p-2 rounded-button hover:bg-accent/5 nav-transition group"
            >
              <span className="text-text-primary group-hover:text-accent nav-transition">
                {archive.month}
              </span>
              <span className="text-sm text-text-secondary">
                ({archive.count})
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;