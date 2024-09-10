'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import '../styles/global.css'; // Import the global CSS here at the root level
import styles from '../styles/home.module.css';
import HomeIcon from '../../public/icons/home-icon.svg';
import SearchIcon from '../../public/icons/search-icon.svg';
import PersonIcon from '../../public/icons/person-icon.svg';
import MenuIcon from '../../public/icons/menu-icon.svg';
import OpenMenuIcon from '../../public/icons/open-menu-icon.svg';
import WatchlistsIcon from '../../public/icons/watchlists-icon.svg';
import NotificationsIcon from '../../public/icons/notifications-icon.svg';
import CloseIcon from '../../public/icons/x-icon.svg';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle('menu-open', !menuOpen);
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>manguro</title>
      </head>
      <body>
        <header>
          <Link href="/" className="title-link">
            <h1>manguro</h1>
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/login" className="login">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="sign-up">
                  Sign Up
                </Link>
              </li>
              <li>
                <button onClick={toggleMenu}>
                  {isClient && (menuOpen ? <OpenMenuIcon /> : <MenuIcon />)}
                </button>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>&copy; 2024 Manguro. All rights reserved.</p>
        </footer>
        
        {menuOpen && (
          <div className="menu-overlay">
            <div className="menu-content">
              <ul className="menu-items">
                {/* First Row */}
                <li>
                  <Link href="/" onClick={toggleMenu}>
                    {isClient && <HomeIcon />}
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/watchlists" onClick={toggleMenu}>
                    {isClient && <WatchlistsIcon />}
                    <span>Watchlists</span>
                  </Link>
                </li>
                <li>
                  <Link href="/search" onClick={toggleMenu}>
                    {isClient && <SearchIcon />}
                    <span>Search</span>
                  </Link>
                </li>
                {/* Second Row */}
                <li>
                  <Link href="/account" onClick={toggleMenu}>
                    {isClient && <PersonIcon />}
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <Link href="/notifications" onClick={toggleMenu}>
                    {isClient && <NotificationsIcon />}
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <button className="close-button" onClick={toggleMenu}>
                    {isClient && <CloseIcon />}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
