import React from 'react';

const LoadingSkeletons = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-surface rounded-card overflow-hidden content-shadow animate-pulse">
          {/* Image Skeleton */}
          <div className="h-48 bg-gray-200"></div>
          
          {/* Content Skeleton */}
          <div className="p-6">
            {/* Category */}
            <div className="h-4 bg-gray-200 rounded w-16 mb-3"></div>
            
            {/* Title */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            {/* Excerpt */}
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            
            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-3 bg-gray-200 rounded w-12"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex space-x-2 mt-4">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-10"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletons;