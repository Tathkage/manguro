'use client';

import React from 'react';
import styles from '../../styles/specwatchlist.module.css';
import SearchIcon from '../../../public/icons/search-icon.svg';
import ManageSearchIcon from '../../../public/icons/manage-search-icon.svg';
import Item from '../../components/item';
import Tag from '../../components/tag';

export default function SpecificWatchlist() {
  // Sample data for the specific watchlist
  const watchlist = {
    id: 'anime-manga-watchlist',
    name: 'Watchlist Name',
    completedCount: 3,
    totalCount: 9,
    tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    items: [
      { name: 'Anime/Manga 1', link: '/specific-anime' },
      { name: 'Anime/Manga 2', link: '/specific-anime' },
      { name: 'Anime/Manga 3', link: '/specific-anime' },
      { name: 'Anime/Manga 4', link: '/specific-anime' },
      { name: 'Anime/Manga 5', link: '/specific-anime' },
      { name: 'Anime/Manga 6', link: '/specific-anime' },
      { name: 'Anime/Manga 7', link: '/specific-anime' },
      { name: 'Anime/Manga 8', link: '/specific-anime' },
      { name: 'Anime/Manga 9', link: '/specific-anime' },
    ],
  };

  return (
    <>
      <section className={styles.watchlistHeader} aria-labelledby="watchlist-heading">
        <h1 id="watchlist-heading">{watchlist.name}</h1>
        {/* Tags Section */}
        <div className={styles.tagsContainer}>
          {watchlist.tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>

        <h2 className="section-rectangle">
          Completed: {watchlist.completedCount}/{watchlist.totalCount}
        </h2>

        <div className={styles.headerBottom}>
          {/* Search Bar */}
          <form
            className={styles.searchForm}
            onSubmit={(e) => e.preventDefault()}
            role="search"
            aria-label="Search Items"
          >
            <label htmlFor="item-search" className={styles.visuallyHidden}>
              Search Items
            </label>
            <div className={styles.searchInputWrapper}>
              <SearchIcon className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                id="item-search"
                placeholder="Search"
                className={styles.searchInput}
                aria-describedby="search-description"
              />
            </div>
            <span id="search-description" className={styles.visuallyHidden}>
              Enter keywords to search items in the watchlist
            </span>
          </form>

          {/* Manage Search Button */}
          <button
            type="button"
            className={styles.manageSearchButton}
            aria-label="Manage Search Filters"
          >
            <ManageSearchIcon className={styles.manageSearchIcon} aria-hidden="true" />
          </button>
        </div>
      </section>

      <section className={styles.itemsSection} aria-labelledby="items-heading">
        <div className={styles.itemsContainer}>
          {watchlist.items.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>
    </>
  );
}
