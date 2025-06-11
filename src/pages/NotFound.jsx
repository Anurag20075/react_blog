import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="FileX" size={48} className="text-accent" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/home-blog-landing-page"
            className="inline-flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/90 w-full"
          >
            <Icon name="Home" size={20} />
            <span>Back to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center space-x-2 border border-border text-text-primary px-6 py-3 rounded-button font-heading font-medium nav-transition hover:bg-accent/5 w-full"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;