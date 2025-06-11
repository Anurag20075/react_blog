import React from 'react';

const ArticleContent = ({ content }) => {
  // Convert markdown-like content to JSX
  const renderContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentElement = null;
    let codeBlock = false;
    let codeContent = '';

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.trim().startsWith('```')) {
        if (!codeBlock) {
          codeBlock = true;
          codeContent = '';
          return;
        } else {
          codeBlock = false;
          elements.push(
            <div key={`code-${index}`} className="my-6 bg-gray-900 rounded-card overflow-hidden">
              <div className="px-4 py-2 bg-gray-800 text-gray-300 text-sm font-caption">
                Code
              </div>
              <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
          return;
        }
      }

      if (codeBlock) {
        codeContent += line + '\n';
        return;
      }

      // Handle headings
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-heading font-bold text-text-primary mt-8 mb-4 first:mt-0">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-heading font-semibold text-text-primary mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.trim() === '') {
        // Skip empty lines
        return;
      } else {
        // Regular paragraphs
        elements.push(
          <p key={index} className="text-text-primary leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {renderContent(content)}
    </div>
  );
};

export default ArticleContent;