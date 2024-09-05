'use client'; // This makes the component a Client Component

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import '../styles/global.css'; // Import the global CSS here at the root level
import '../styles/home.css';
import HomeIcon from '../../public/icons/home-icon.svg';
import SearchIcon from '../../public/icons/search-icon.svg';
import PersonIcon from '../../public/icons/person-icon.svg';
import MenuIcon from '../../public/icons/menu-icon.svg';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  // Ensure that the component only renders the SVGs on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>manguro</title>
      </head>
      <body>
        <header>
          <h1>manguro</h1>
          <nav>
            <ul>
              <li>
                <Link href="/">
                  {isClient && <HomeIcon />} {/* Render SVG only on client */}
                </Link>
              </li>
              <li>
                <Link href="/search">
                  {isClient && <SearchIcon />} {/* Render SVG only on client */}
                </Link>
              </li>
              <li>
                <Link href="/profile">
                  {isClient && <PersonIcon />} {/* Render SVG only on client */}
                </Link>
              </li>
              <li>
                <Link href="/menu">
                  {isClient && <MenuIcon />} {/* Render SVG only on client */}
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>{children}</main>

        <footer>
          <p>&copy; 2024 Manguro. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
