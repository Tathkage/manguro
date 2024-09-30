'use client';

import React from 'react';
import styles from '../../styles/watchlists.module.css';
import SearchIcon from '../../../public/icons/search-icon.svg';
import ManageSearchIcon from '../../../public/icons/manage-search-icon.svg';
import Item from '../../components/item'; // Adjust the path based on your project structure

export default function UserWatchlists() {
  // Sample data for each watchlist section
  const watchlists = [
    {
      id: 'currently-watching-heading',
      title: 'Currently Watching',
      items: [
        { name: 'Watchlist 1', link: '/specific-watchlist/1' },
        { name: 'Watchlist 2', link: '/specific-watchlist/2' },
        { name: 'Watchlist 3', link: '/specific-watchlist/3' },
        { name: 'Watchlist 4', link: '/specific-watchlist/4' },
        { name: 'Watchlist 5', link: '/specific-watchlist/5' },
        { name: 'Watchlist 6', link: '/specific-watchlist/6' },
      ],
    },
    {
      id: 'planning-to-watch-heading',
      title: 'Planning to Watch',
      items: [
        { name: 'Watchlist 7', link: '/specific-watchlist/7' },
        { name: 'Watchlist 8', link: '/specific-watchlist/8' },
        { name: 'Watchlist 9', link: '/specific-watchlist/9' },
        { name: 'Watchlist 10', link: '/specific-watchlist/10' },
        { name: 'Watchlist 11', link: '/specific-watchlist/11' },
        { name: 'Watchlist 12', link: '/specific-watchlist/12' },
      ],
    },
    {
      id: 'paused-heading',
      title: 'Paused',
      items: [
        { name: 'Watchlist 13', link: '/specific-watchlist/13' },
        { name: 'Watchlist 14', link: '/specific-watchlist/14' },
        { name: 'Watchlist 15', link: '/specific-watchlist/15' },
        { name: 'Watchlist 16', link: '/specific-watchlist/16' },
        { name: 'Watchlist 17', link: '/specific-watchlist/17' },
        { name: 'Watchlist 18', link: '/specific-watchlist/18' },
      ],
    },
    {
      id: 'completed-heading',
      title: 'Completed',
      items: [
        { name: 'Watchlist 19', link: '/specific-watchlist/19' },
        { name: 'Watchlist 20', link: '/specific-watchlist/20' },
        { name: 'Watchlist 21', link: '/specific-watchlist/21' },
        { name: 'Watchlist 22', link: '/specific-watchlist/22' },
        { name: 'Watchlist 23', link: '/specific-watchlist/23' },
        { name: 'Watchlist 24', link: '/specific-watchlist/24' },
      ],
    },
    {
      id: 'dropped-heading',
      title: 'Dropped',
      items: [
        { name: 'Watchlist 25', link: '/specific-watchlist/25' },
        { name: 'Watchlist 26', link: '/specific-watchlist/26' },
        { name: 'Watchlist 27', link: '/specific-watchlist/27' },
        { name: 'Watchlist 28', link: '/specific-watchlist/28' },
        { name: 'Watchlist 29', link: '/specific-watchlist/29' },
        { name: 'Watchlist 30', link: '/specific-watchlist/30' },
      ],
    },
  ];

  return (
    <>
      <section className={styles.watchlistsHeader} aria-labelledby="watchlists-heading">
        <h1 id="watchlists-heading">User's Watchlists</h1>
        
        <div className={styles.headerBottom}>
          {/* Search Bar */}
          <form className={styles.searchForm} onSubmit={(e) => e.preventDefault()} role="search" aria-label="Search Watchlists">
            <label htmlFor="watchlist-search" className="visually-hidden">Search Watchlists</label>
            <div className={styles.searchInputWrapper}>
              <SearchIcon className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                id="watchlist-search"
                placeholder="Search"
                className={styles.searchInput}
                aria-describedby="search-description"
              />
            </div>
            <span id="search-description" className="visually-hidden">Enter keywords to search your watchlists</span>
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

      {watchlists.map((section) => (
        <section key={section.id} className={styles.otherSection} aria-labelledby={section.id}>
          <h2 id={section.id} className="section-rectangle">{section.title}</h2>
          <div className={styles.itemsContainer}>
            {section.items.map((item, index) => (
              <Item key={index} name={item.name} link={item.link} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
