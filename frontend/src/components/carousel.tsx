'use client'; // Ensures this component is a client-side component

import React, { useRef, useState, KeyboardEvent, useEffect } from 'react';
import Item from './item'; // Ensure correct path
import styles from '../styles/carousel.module.css';

interface CarouselProps {
  type: 'anime' | 'watchlist'; // Prop to specify the carousel type
}

export default function Carousel({ type }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Determine the base link based on the carousel type
  const baseLink = type === 'anime' ? '/specific-anime' : '/specific-watchlist';

  // Handle scroll events to manage arrow button visibility
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  // Scroll right
  const scrollRight = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({
        left: carousel.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Scroll left
  const scrollLeft = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.scrollBy({
        left: -carousel.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Handle key presses for navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      scrollRight();
    } else if (e.key === 'ArrowLeft') {
      scrollLeft();
    }
  };

  // Generate 10 items with unique links
  const renderItems = () => {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push(
        <Item
          key={i}
          name={`${type === 'anime' ? 'Anime' : 'Watchlist'} ${i}`}
          link={`${baseLink}/${i}`} // Dynamic link per item (e.g., /specific-anime/3)
        />
      );
    }
    return items;
  };

  // Initial check to set button visibility
  useEffect(() => {
    handleScroll(); // Set initial button states
  }, []);

  return (
    <div
      className={styles.carouselContainer}
      aria-label={`${type === 'anime' ? 'Anime' : 'Watchlist'} Carousel`}
    >
      {canScrollLeft && (
        <button
          className={styles.leftArrow}
          onClick={scrollLeft}
          aria-label="Scroll Left"
        >
          &#9664; {/* Left arrow symbol */}
        </button>
      )}
      <div
        ref={carouselRef}
        className={styles.carousel}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        role="region"
        aria-live="polite"
        tabIndex={0} // Make the carousel focusable
      >
        {renderItems()}
      </div>
      {canScrollRight && (
        <button
          className={styles.rightArrow}
          onClick={scrollRight}
          aria-label="Scroll Right"
        >
          &#9654; {/* Right arrow symbol */}
        </button>
      )}
    </div>
  );
}
