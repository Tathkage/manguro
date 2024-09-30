'use client';

import React, { useRef, useState, KeyboardEvent, useEffect } from 'react';
import Item from './item';
import styles from '../styles/carousel.module.css';

interface CarouselProps {
  type: 'anime' | 'manga' | 'character' | 'watchlist' | 'recently-watched';
}

export default function Carousel({ type }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Determine the base link and item prefix based on the carousel type
  let baseLink = '';
  let itemPrefix = '';

  switch (type) {
    case 'anime':
      baseLink = '/specific-anime';
      itemPrefix = 'Anime';
      break;
    case 'manga':
      baseLink = '/specific-manga';
      itemPrefix = 'Manga';
      break;
    case 'character':
      baseLink = '/specific-character';
      itemPrefix = 'Character';
      break;
    case 'watchlist':
      baseLink = '/specific-watchlist';
      itemPrefix = 'Watchlist';
      break;
    case 'recently-watched':
      baseLink = '/specific-recent';
      itemPrefix = 'Recently Watched';
      break;
    default:
      baseLink = '/';
      itemPrefix = 'Item';
  }

  // Handle scroll events to manage arrow button visibility
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const { scrollLeft, scrollWidth, clientWidth } = carousel;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // Adjusted for precision
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

  // Generate items based on the carousel type
  const renderItems = () => {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push(
        <Item
          key={i}
          name={`${itemPrefix} ${i}`}
          link={`${baseLink}/${i}`}
        />
      );
    }
    return items;
  };

  // Initial check to set button visibility
  useEffect(() => {
    handleScroll();
    // Add event listener for resize to handle dynamic content
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className={styles.carouselContainer}
      aria-label={`${itemPrefix} Carousel`}
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
        tabIndex={0}
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
