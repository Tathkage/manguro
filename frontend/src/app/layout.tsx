'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import '../styles/global.css';
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
    setMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle('menu-open', newState);
  
      // Focus management: return focus to the toggle button when closing the menu
      if (!newState) {
        const menuButton = document.querySelector('.menu-button') as HTMLElement;
        if (menuButton) {
          menuButton.focus();
        }
      }
  
      return newState;
    });
  };  

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
            <h3>manguro</h3>
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/login" className="login" aria-label="Login">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="sign-up" aria-label="Sign Up">
                  Sign Up
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleMenu}
                  aria-expanded={menuOpen}
                  aria-controls="menu"
                  aria-label="Toggle Menu"
                  className="menu-button"
                >
                  {isClient && (menuOpen ? <OpenMenuIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />)}
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
          <div className="menu-overlay" role="dialog" aria-modal="true" id="menu">
            <div className="menu-content">
              <ul className="menu-items" aria-label="Menu Items">

                <li>
                  <Link href="/" onClick={toggleMenu} aria-label="Home">
                    {isClient && <HomeIcon aria-hidden="true" />}
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/user-watchlists" onClick={toggleMenu} aria-label="Watchlists">
                    {isClient && <WatchlistsIcon aria-hidden="true" />}
                    <span>Watchlists</span>
                  </Link>
                </li>
                <li>
                  <Link href="/search" onClick={toggleMenu} aria-label="Search">
                    {isClient && <SearchIcon aria-hidden="true" />}
                    <span>Search</span>
                  </Link>
                </li>

                <li>
                  <Link href="/account" onClick={toggleMenu} aria-label="Account">
                    {isClient && <PersonIcon aria-hidden="true" />}
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <Link href="/notifications" onClick={toggleMenu} aria-label="Notifications">
                    {isClient && <NotificationsIcon aria-hidden="true" />}
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <button className="close-button" onClick={toggleMenu} aria-label="Close Menu">
                    {isClient && <CloseIcon aria-hidden="true" />}
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
