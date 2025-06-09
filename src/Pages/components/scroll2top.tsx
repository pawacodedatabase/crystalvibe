import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the location changes
  }, [location]); // Effect runs when the location changes

  return null; // This component doesn't render anything visible
};

export default ScrollToTop;
