import Image from 'next/image';
import FWelcomeAvatar from '../../public/images/feminine-welcome-avatar.png';
import FWelcomeAvatar2 from '../../public/images/feminine-welcome-avatar-2.png';
import Carousel from '../components/carousel';
import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <>
      {/* ARIA Landmark: Welcome Section */}
      <section className={styles['welcome-section']} aria-labelledby="welcome-heading">
      <div className={`${styles['welcome-image']} ${styles['masculine-avatar']}`}>
          <Image
            src={FWelcomeAvatar2}
            alt="Illustration of the manguro mascot character welcoming users to Manguro"
            width={212}
            height={360}
            priority={true} /* Prioritize image loading for better UX */
          />
        </div>
        <div className={styles['welcome-text']}>
          <h1 id="welcome-heading">
            <span className={styles['line1']}>Welcome to</span>
            <span className={styles['line2']}>Manguro!</span>
          </h1>
          <p>Create and share personalized anime watchlists, track your viewing progress, and receive tailored recommendations.</p>
        </div>
        <div className={`${styles['welcome-image']} ${styles['feminine-avatar']}`}>
          <Image
            src={FWelcomeAvatar}
            alt="Illustration of the manguro mascot character welcoming users to Manguro"
            width={212}
            height={360}
            priority={true} /* Prioritize image loading for better UX */
          />
        </div>
      </section>

      {/* ARIA Landmark: Top Watchlists */}
      <section aria-labelledby="top-watchlists-heading">
        <h2 id="top-watchlists-heading" className="section-rectangle">Top Watchlists</h2>
        <p>Browse some of the most popular anime watchlists created by our community.</p>
        <Carousel type="watchlist" />
      </section>

      {/* ARIA Landmark: Recommended Watchlists */}
      <section aria-labelledby="recommended-watchlists-heading">
        <h2 id="recommended-watchlists-heading" className="section-rectangle">Recommended Watchlists</h2>
        <p>Discover personalized watchlists recommended just for you based on your preferences.</p>
        <Carousel type="watchlist" />
      </section>

      {/* ARIA Landmark: Top Anime */}
      <section aria-labelledby="top-anime-heading">
        <h2 id="top-anime-heading" className="section-rectangle">Top Anime</h2>
        <p>Explore the top trending anime of the season.</p>
        <Carousel type="anime" />
      </section>

      {/* ARIA Landmark: Recommended Anime */}
      <section aria-labelledby="recommended-anime-heading">
        <h2 id="recommended-anime-heading" className="section-rectangle">Recommended Anime</h2>
        <p>Check out personalized anime recommendations based on your watch history and interests.</p>
        <Carousel type="anime" />
      </section>
    </>
  );
}
