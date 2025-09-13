import React, { useRef, useState, useRef as useReactRef } from 'react';

const Carousel = ({ children }) => {
  const [current, setCurrent] = useState(0);
  const [visited, setVisited] = useState([0]);
  const containerRef = useRef(null);
  const total = React.Children.count(children);


  // Debounce navigation to slow down arrow key
  const lastNavRef = useReactRef(0);
  const NAV_DELAY = 1800; // ms

  const scrollTo = (idx) => {
    setCurrent(idx);
    setVisited((prev) => prev.includes(idx) ? prev : [...prev, idx]);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * idx,
        behavior: 'smooth',
      });
    }
  };

  const canNavigate = () => {
    const now = Date.now();
    if (now - lastNavRef.current > NAV_DELAY) {
      lastNavRef.current = now;
      return true;
    }
    return false;
  };

  const handlePrev = () => {
    if (current > 0 && canNavigate()) scrollTo(current - 1);
  };
  const handleNext = () => {
    if (current < total - 1 && canNavigate()) scrollTo(current + 1);
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <button
          className="z-10 p-2 bg-white/80 rounded-full shadow absolute left-2 top-1/2 -translate-y-1/2 disabled:opacity-30"
          onClick={handlePrev}
          disabled={current === 0}
          aria-label="Previous"
        >
          <span>&larr;</span>
        </button>
        <div
          ref={containerRef}
          className="overflow-x-hidden w-full"
        >
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {React.Children.map(children, (child, idx) => (
              <div className="w-full flex-shrink-0">
                {child}
              </div>
            ))}
          </div>
        </div>
        <button
          className="z-10 p-2 bg-white/80 rounded-full shadow absolute right-2 top-1/2 -translate-y-1/2 disabled:opacity-30"
          onClick={handleNext}
          disabled={current === total - 1}
          aria-label="Next"
        >
          <span>&rarr;</span>
        </button>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: total }).map((_, idx) => {
          let dotClass = 'w-2 h-2 rounded-full transition-colors duration-200 ';
          if (current === idx) {
            dotClass += 'bg-primary';
          } else if (visited.includes(idx)) {
            dotClass += 'bg-muted-foreground/60';
          } else {
            dotClass += 'bg-gray-400';
          }
          return (
            <button
              key={idx}
              className={dotClass}
              style={{ opacity: 1 }}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
