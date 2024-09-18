import React from 'react';
import styles from '../styles/item.module.css'; // You can place the styles here

interface ItemProps {
    name: string;
}

export default function Item({ name }: ItemProps) {
    return (
      <div className={styles.item}>
        <div className={styles.rectangle}></div>
        <p className={styles.text}>{name}</p>
      </div>
    );
}
