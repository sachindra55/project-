import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    H5P: any;
    H5PIntegration: any;
  }
}

interface H5PViewerProps {
  contentPath: string;
}

const H5PViewer: React.FC<H5PViewerProps> = ({ contentPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadH5PContent = async () => {
      try {
        const response = await fetch(`${contentPath}/content.json`);
        const content = await response.json();
        
        if (window.H5P && containerRef.current) {
          new window.H5P.ThreeImage(
            content,
            containerRef.current
          );
        }
      } catch (error) {
        console.error('Error loading H5P content:', error);
      }
    };

    // Wait for H5P to be available
    const checkH5P = setInterval(() => {
      if (window.H5P) {
        clearInterval(checkH5P);
        loadH5PContent();
      }
    }, 100);

    return () => {
      clearInterval(checkH5P);
    };
  }, [contentPath]);

  return (
    <div 
      ref={containerRef}
      className="h5p-container"
      style={{ 
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    />
  );
};

export default H5PViewer;
