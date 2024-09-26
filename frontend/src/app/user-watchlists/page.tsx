'use client';

import React from 'react';
import styles from '../../styles/watchlists.module.css';
import SearchIcon from '../../../public/icons/search-icon.svg';
import ManageSearchIcon from '../../../public/icons/manage-search-icon.svg';
import Item from '../../components/item'; // Adjust the path based on your project structure

export default function UserWatchlists() {
  // Sample data for each watchlist section
  const currentlyWatchingItems = [
    { name: 'Watchlist 1', link: '/specific-watchlist/1' },
    { name: 'Watchlist 2', link: '/specific-watchlist/2' },
    { name: 'Watchlist 3', link: '/specific-watchlist/3' },
    { name: 'Watchlist 4', link: '/specific-watchlist/4' },
    { name: 'Watchlist 5', link: '/specific-watchlist/5' },
    { name: 'Watchlist 6', link: '/specific-watchlist/6' },
  ];

  const planningToWatchItems = [
    { name: 'Watchlist 7', link: '/specific-watchlist/7' },
    { name: 'Watchlist 8', link: '/specific-watchlist/8' },
    { name: 'Watchlist 9', link: '/specific-watchlist/9' },
    { name: 'Watchlist 10', link: '/specific-watchlist/10' },
    { name: 'Watchlist 11', link: '/specific-watchlist/11' },
    { name: 'Watchlist 12', link: '/specific-watchlist/12' },
  ];

  const pausedItems = [
    { name: 'Watchlist 13', link: '/specific-watchlist/13' },
    { name: 'Watchlist 14', link: '/specific-watchlist/14' },
    { name: 'Watchlist 15', link: '/specific-watchlist/15' },
    { name: 'Watchlist 16', link: '/specific-watchlist/16' },
    { name: 'Watchlist 17', link: '/specific-watchlist/17' },
    { name: 'Watchlist 18', link: '/specific-watchlist/18' },
  ];

  const completedItems = [
    { name: 'Watchlist 19', link: '/specific-watchlist/19' },
    { name: 'Watchlist 20', link: '/specific-watchlist/20' },
    { name: 'Watchlist 21', link: '/specific-watchlist/21' },
    { name: 'Watchlist 22', link: '/specific-watchlist/22' },
    { name: 'Watchlist 23', link: '/specific-watchlist/23' },
    { name: 'Watchlist 24', link: '/specific-watchlist/24' },
  ];

  const droppedItems = [
    { name: 'Watchlist 25', link: '/specific-watchlist/25' },
    { name: 'Watchlist 26', link: '/specific-watchlist/26' },
    { name: 'Watchlist 27', link: '/specific-watchlist/27' },
    { name: 'Watchlist 28', link: '/specific-watchlist/28' },
    { name: 'Watchlist 29', link: '/specific-watchlist/29' },
    { name: 'Watchlist 30', link: '/specific-watchlist/30' },
  ];

  return (
    <>
      <section className={styles.watchlistsHeader} aria-labelledby="watchlists-heading">
        <h1>User's Watchlists</h1>
        
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

      {/* Currently Watching Section */}
      <section className={styles.otherSection} aria-labelledby="watching-heading">
        <h2 id="watching-heading" className="section-rectangle">Currently Watching</h2>
        <div className={styles.itemsContainer}>
          {currentlyWatchingItems.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>

      {/* Planning to Watch Section */}
      <section className={styles.otherSection} aria-labelledby="planning-heading">
        <h2 id="planning-heading" className="section-rectangle">Planning to Watch</h2>
        <div className={styles.itemsContainer}>
          {planningToWatchItems.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>

      {/* Paused Section */}
      <section className={styles.otherSection} aria-labelledby="paused-heading">
        <h2 id="paused-heading" className="section-rectangle">Paused</h2>
        <div className={styles.itemsContainer}>
          {pausedItems.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>

      {/* Completed Section */}
      <section className={styles.otherSection} aria-labelledby="completed-heading">
        <h2 id="completed-heading" className="section-rectangle">Completed</h2>
        <div className={styles.itemsContainer}>
          {completedItems.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>

      {/* Dropped Section */}
      <section className={styles.otherSection} aria-labelledby="dropped-heading">
        <h2 id="dropped-heading" className="section-rectangle">Dropped</h2>
        <div className={styles.itemsContainer}>
          {droppedItems.map((item, index) => (
            <Item key={index} name={item.name} link={item.link} />
          ))}
        </div>
      </section>
    </>
  );
}
