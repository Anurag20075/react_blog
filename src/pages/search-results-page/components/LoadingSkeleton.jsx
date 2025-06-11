import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="bg-surface border border-border rounded-card p-6 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Skeleton */}
            <div className="lg:w-48 lg:flex-shrink-0">
              <div className="aspect-video lg:aspect-[4/3] bg-gray-200 rounded-card"></div>
            </div>

            {/* Content Skeleton */}
            <div className="flex-1 min-w-0">
              {/* Tags and Meta */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
                <div className="ml-auto w-24 h-4 bg-gray-200 rounded"></div>
              </div>

              {/* Title */}
              <div className="space-y-2 mb-3">
                <div className="w-full h-6 bg-gray-200 rounded"></div>
                <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2 mb-4">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
              </div>

              {/* Author and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  <div className="w-12 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;