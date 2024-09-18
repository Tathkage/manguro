'use client'; // Ensures this component is a client-side component

import React, { useState } from 'react';
import Carousel from '../../components/carousel';
import styles from '../../styles/search.module.css';
import SwitchSearchIcon from '../../../public/icons/switch-search-icon.svg';
import SearchIcon from '../../../public/icons/search-icon.svg';
import ManageSearchIcon from '../../../public/icons/manage-search-icon.svg';

export default function SearchPage() {
  const [searchType, setSearchType] = useState<'watchlist' | 'anime'>('watchlist');

  const toggleSearchType = () => {
    setSearchType((prev) => (prev === 'watchlist' ? 'anime' : 'watchlist'));
  };

  return (
    <>
      {/* Header Section */}
      <section className={styles.searchHeader} aria-labelledby="search-heading">
        {/* Header Top: h1 and Switch Icon */}
        <div className={styles.headerTop}>
          <h1 id="search-heading" className={styles.searchTitle}>
            Search for{' '}
            <button
              className={styles.toggleButton}
              onClick={toggleSearchType}
              aria-label={`Switch to ${searchType === 'watchlist' ? 'Anime' : 'Watchlists'}`}
            >
              <strong>{searchType === 'watchlist' ? 'Watchlists' : 'Anime'}</strong>
            </button>
          </h1>

          {/* Switch Search Icon */}
          <button
            className={styles.switchButton}
            onClick={toggleSearchType}
            aria-label={`Switch to ${searchType === 'watchlist' ? 'Anime' : 'Watchlists'}`}
          >
            <SwitchSearchIcon className={styles.switchSearchIcon} aria-hidden="true" />
          </button>
        </div>

        {/* Header Bottom: Search Bar and Manage Search Button */}
        <div className={styles.headerBottom}>
          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.searchInputWrapper}>
              <SearchIcon className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                aria-label="Search"
              />
            </div>
          </form>

          {/* Manage Search Button */}
          <button className={styles.manageSearchButton} aria-label="Manage Search">
            <ManageSearchIcon className={styles.manageSearchIcon} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Trending Section */}
      <section className={styles.carouselSection} aria-labelledby="trending-heading">
        <h2 id="trending-heading" className="section-rectangle">
          Trending {searchType === 'watchlist' ? 'Watchlists' : 'Anime'}
        </h2>
        <p>Browse...</p>
        <Carousel type={searchType} />
      </section>

      {/* Recommended Section */}
      <section className={styles.carouselSection} aria-labelledby="recommended-heading">
        <h2 id="recommended-heading" className="section-rectangle">
          Recommended {searchType === 'watchlist' ? 'Watchlists' : 'Anime'}
        </h2>
        <p>Browse...</p>
        <Carousel type={searchType} />
      </section>

      {/* Top Section */}
      <section className={styles.carouselSection} aria-labelledby="top-heading">
        <h2 id="top-heading" className="section-rectangle">
          Top {searchType === 'watchlist' ? 'Watchlists' : 'Anime'}
        </h2>
        <p>Browse...</p>
        <Carousel type={searchType} />
      </section>
    </>
  );
}
