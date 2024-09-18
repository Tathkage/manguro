import React from 'react';
import Link from 'next/link';
import styles from '../styles/item.module.css';

interface ItemProps {
    name: string;
    link: string;
}

export default function Item({ name, link }: ItemProps) {
  return (
      <Link href={link} className={styles.itemLink}>
          <div className={styles.item}>
              <div className={styles.rectangle}></div>
              <p className={styles.text}>{name}</p>
          </div>
      </Link>
  );
}
