import Image from 'next/image';
import WelcomeAvatar from '../../public/images/welcome-avatar.png';

export default function Home() {
  return (
    <>
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>
            <span className="line1">Welcome to</span>
            <span className="line2">Manguro!</span>
          </h1>
          <p>Create and share personalized anime watchlists, track your viewing progress, and receive tailored recommendations.</p>
        </div>
        <div className="welcome-image">
          <Image
            src={WelcomeAvatar}
            alt="Manguro welcome avatar"
            width={212}
            height={360}
          />
        </div>

      </section>

      <section>
        <h1 className="section-rectangle">Top Watchlists</h1>
        <p>Section content</p>
      </section>

      <section>
        <h1 className="section-rectangle">Recommended Watchlists</h1>
        <p>Section content</p>
      </section>

      <section>
        <h1 className="section-rectangle">Top Anime</h1>
        <p>Section content</p>
      </section>

      <section>
        <h1 className="section-rectangle">Recommended Anime</h1>
        <p>Section content</p>
      </section>
    </>
  );
}
