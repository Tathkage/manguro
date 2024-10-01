import React from 'react';
import styles from '../styles/tag.module.css';

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <div className={styles.tag}>
      {text}
    </div>
  );
}
