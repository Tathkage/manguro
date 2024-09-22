'use client';

import { useEffect, useState } from 'react';
import styles from '../../styles/account.module.css';
import Carousel from '../../components/carousel'; // Adjust the import path as necessary
import AddIcon from '../../../public/icons/add-icon.svg'; // Import the AddIcon

export default function Account() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className={styles.main}>
      {/* User Information Section */}
      <section className={styles.userInfo} aria-labelledby="user-info-heading">
        <h1 id="user-info-heading">Username</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut odio lorem.
          Ut convallis fermentum nibh id laoreet. Maecenas euismod nec velit vitae congue.
          Phasellus.
        </p>
      </section>

      {/* Your Favorites Section */}
      <section className={styles.favoritesSection} aria-labelledby="favorites-heading">
        <h2 id="favorites-heading" className="section-rectangle">Your Favorites</h2>

        {/* Favorite Anime Subsection */}
        <div className={styles.favoriteSubsection}>
          <div className={styles.favoriteHeaderContainer}>
            <h3 className={styles.favoriteHeader}>Favorite Anime</h3>
            <button
              className={styles.addButton}
              aria-label="Add Favorite Anime"
              onClick={() => handleAdd('anime')} // Placeholder handler
            >
              {isClient && <AddIcon aria-hidden="true" />}
            </button>
          </div>
          <Carousel type="anime" />
        </div>

        {/* Favorite Manga Subsection */}
        <div className={styles.favoriteSubsection}>
          <div className={styles.favoriteHeaderContainer}>
            <h3 className={styles.favoriteHeader}>Favorite Manga</h3>
            <button
              className={styles.addButton}
              aria-label="Add Favorite Manga"
              onClick={() => handleAdd('manga')} // Placeholder handler
            >
              {isClient && <AddIcon aria-hidden="true" />}
            </button>
          </div>
          <Carousel type="manga" />
        </div>

        {/* Favorite Characters Subsection */}
        <div className={styles.favoriteSubsection}>
          <div className={styles.favoriteHeaderContainer}>
            <h3 className={styles.favoriteHeader}>Favorite Characters</h3>
            <button
              className={styles.addButton}
              aria-label="Add Favorite Characters"
              onClick={() => handleAdd('character')} // Placeholder handler
            >
              {isClient && <AddIcon aria-hidden="true" />}
            </button>
          </div>
          <Carousel type="character" />
        </div>
      </section>

      {/* Your Watchlists Section */}
      <section className={styles.otherSection} aria-labelledby="watchlists-heading">
        <h2 id="watchlists-heading" className="section-rectangle">Your Watchlists</h2>
        <Carousel type="watchlist" />
      </section>

      {/* Recently Watched Section */}
      <section className={styles.otherSection} aria-labelledby="recently-watched-heading">
        <h2 id="recently-watched-heading" className="section-rectangle">Recently Watched</h2>
        <Carousel type="recently-watched" />
      </section>
    </main>
  );

  // Placeholder function for handling add button clicks
  function handleAdd(type: string) {
    // Implement the functionality to add a favorite based on the type
    console.log(`Add favorite for: ${type}`);
  }
}
