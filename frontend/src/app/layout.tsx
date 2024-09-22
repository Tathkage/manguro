'use client';

import { useEffect, useState, useRef } from 'react';
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

  // Refs for focus management
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        e.preventDefault();
        toggleMenu();
      }

      if (menuOpen && e.key === 'Tab') {
        const focusableElements = menuOverlayRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            // If Shift+Tab and focus is on the first element, move to the last
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            // If Tab and focus is on the last element, move to the first
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Set focus to the menu overlay container
      menuOverlayRef.current?.focus();
      // Prevent background from scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore background scrolling when menu is closed
      document.body.style.overflow = '';
      // Blur the menu button to reset tab order
      menuButtonRef.current?.blur();
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle('menu-open', newState);

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
          {/* h3 Link as the first focusable element */}
          <Link href="/" className="title-link" aria-label="Go to homepage" legacyBehavior>
            <a>
              <h3>manguro</h3>
            </a>
          </Link>
          <nav aria-label="Main Navigation">
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
                  aria-label={menuOpen ? "Close Menu" : "Open Menu"}
                  className="menu-button"
                  ref={menuButtonRef}
                >
                  {isClient && (menuOpen ? <OpenMenuIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />)}
                </button>
              </li>
            </ul>
          </nav>

          {/* Menu Overlay */}
          {menuOpen && (
            <div
              className="menu-overlay"
              role="dialog"
              aria-modal="true"
              id="menu"
              aria-labelledby="menu-heading"
              tabIndex={-1}
              ref={menuOverlayRef}
            >
              <div className="menu-content">
                <h2 id="menu-heading" className="visually-hidden">
                  Main Menu
                </h2>
                <ul className="menu-items" aria-label="Main Menu">
                  <li>
                    <Link
                      href="/"
                      onClick={toggleMenu}
                      aria-label="Home"
                    >
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
                    <button
                      className="close-button"
                      onClick={toggleMenu}
                      aria-label="Close Menu"
                    >
                      {isClient && <CloseIcon aria-hidden="true" />}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </header>

        <main>{children}</main>

        <footer>
          <p>&copy; 2024 Manguro. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
