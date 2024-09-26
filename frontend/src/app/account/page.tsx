'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/account.module.css';
import Carousel from '../../components/carousel';
import AddIcon from '../../../public/icons/add-icon.svg';
import ProfilePicture from '../../../public/images/profile-picture-sub.png';

export default function Account() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className={styles.main}>
      {/* User Information Section */}
      <section className={styles.userInfo} aria-labelledby="user-info-heading">
        {/* Profile Picture */}
        <div className={styles.profilePicture}>
          <Image
            src={ProfilePicture}
            alt="Default user profile picture: manguro's female mascot."
            width={150}
            height={150}
            priority={true}
            className={styles.profileImage}
          />
        </div>

        {/* Username */}
        <h1 id="user-info-heading" className={styles.username}>Username</h1>

        {/* Profile's Social Stats */}
        <div className={styles.socialStatsRow}>
          <div className={styles.socialStatItem}>
            <span className={styles.statNumber}>113</span>
            <span className={styles.statLabel}>Followers</span>
          </div>
          <div className={styles.socialStatItem}>
            <span className={styles.statNumber}>346</span>
            <span className={styles.statLabel}>Likes</span>
          </div>
          <div className={styles.socialStatItem}>
            <span className={styles.statNumber}>954</span>
            <span className={styles.statLabel}>Saves</span>
          </div>
        </div>

        {/* Profile Bio */}
        <div className={styles.profileBio}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut odio lorem.
            Ut convallis fermentum nibh id laoreet. Maecenas euismod nec velit vitae congue.
            Phasellus.
          </p>
        </div>
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
              onClick={() => handleAdd('anime')}
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
              onClick={() => handleAdd('manga')}
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
              onClick={() => handleAdd('character')}
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
