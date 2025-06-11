import React from 'react';

const ReadingProgress = ({ progress }) => {
  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      <div 
        className="h-1 bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgress;