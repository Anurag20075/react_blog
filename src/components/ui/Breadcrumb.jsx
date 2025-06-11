import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/home-blog-landing-page': 'Home',
    '/article-detail-page': 'Article',
    '/category-tag-archive-page': 'Categories',
    '/search-results-page': 'Search Results',
    '/author-profile-page': 'Authors',
    '/about-contact-page': 'About',
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Home', path: '/home-blog-landing-page', isActive: false }
    ];

    if (location.pathname !== '/home-blog-landing-page') {
      const currentRoute = `/${pathSegments.join('/')}`;
      const currentLabel = routeMap[currentRoute] || pathSegments[pathSegments.length - 1];
      
      breadcrumbs.push({
        label: currentLabel,
        path: currentRoute,
        isActive: true
      });
    } else {
      breadcrumbs[0].isActive = true;
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1 && breadcrumbs[0].isActive) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary mx-2" 
              />
            )}
            {item.isActive ? (
              <span className="font-caption text-text-primary font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="font-caption text-text-secondary hover:text-accent nav-transition"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;