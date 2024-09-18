"use client"; // Ensures this component is a client-side component

import React, { useEffect, useRef, useState } from 'react';
import Item from './item'; // Import the updated Item component
import styles from '../styles/carousel.module.css';

interface CarouselProps {
    type: 'anime' | 'watchlist'; // New prop to specify the carousel type
}

export default function Carousel({ type }: CarouselProps) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    // Determine the link based on the carousel type
    const link = type === 'anime' ? '/anime' : '/watchlist';

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const numItems = 10;
        const itemWidth = carousel.firstElementChild?.clientWidth || 0;
        const scrollThreshold = itemWidth * numItems;

        // Clone items to create infinite scroll effect
        const cloneItems = () => {
            const clonedItems = Array.from(carousel.children).slice(0, numItems); // Convert HTMLCollection to array
            clonedItems.forEach((item) => {
                carousel.appendChild(item.cloneNode(true));
            });
        };
        cloneItems();

        const handleScroll = () => {
            // Infinite scrolling logic
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollLeft = 0;
            }

            // Determine if left arrow should be shown
            setCanScrollLeft(carousel.scrollLeft > 0);
        };

        // Initial scroll to the beginning
        carousel.scrollLeft = 0;
        carousel.addEventListener('scroll', handleScroll);

        return () => {
            carousel.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll right (e.g., when the right arrow is clicked)
    const scrollRight = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollBy({
                left: carousel.firstElementChild?.clientWidth || 0,
                behavior: 'smooth',
            });
        }
    };

    // Scroll left (e.g., when the left arrow is clicked)
    const scrollLeft = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.scrollBy({
                left: -(carousel.firstElementChild?.clientWidth || 0),
                behavior: 'smooth',
            });
        }
    };

    const renderItems = () => {
        const items = [];
        for (let i = 1; i <= 10; i++) {
            items.push(<Item key={i} name={`Name ${i}`} link={link} />);
        }
        return items;
    };

    return (
        <div className={styles.carouselContainer}>
            {canScrollLeft && (
                <button className={styles.leftArrow} onClick={scrollLeft} aria-label="Scroll Left">
                    &#9664; {/* Left arrow symbol */}
                </button>
            )}
            <div ref={carouselRef} className={styles.carousel}>
                {renderItems()}
            </div>
            <button className={styles.rightArrow} onClick={scrollRight} aria-label="Scroll Right">
                &#9654; {/* Right arrow symbol */}
            </button>
        </div>
    );
}
