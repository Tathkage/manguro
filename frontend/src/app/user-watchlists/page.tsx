'use client';

import styles from '../../styles/watchlists.module.css';
import SearchIcon from '../../../public/icons/search-icon.svg';

export default function UserWatchlists() {
  return (
    <>
      <section>
        <h1>User's Watchlists</h1>
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
      </section>

      <section className={styles.otherSection} aria-labelledby="your-watchlists-heading">
        <h2 id="your-watchlists-heading" className="section-rectangle">Your Watchlists</h2>
      </section>

      <section className={styles.otherSection} aria-labelledby="shared-watchlists-heading">
        <h2 id="shared-watchlists-heading" className="section-rectangle">Your Watchlists</h2>
      </section>
    </>
  );
}
