'use client';

import React, { useState } from 'react';
import styles from '../../styles/login.module.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={styles['login-section']}>
      <h1>Login</h1>
      <form className={styles['login-form']}>
        <div className={styles['input-element']}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles['input-element']}>
          <label htmlFor="password">Password</label>
          <div className={styles['password-wrapper']}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
            />
            <span className={styles["toggle-password"]} onClick={togglePasswordVisibility}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
        </div>
        <div className={styles['buttons-wrapper']}>
          <button type="submit" className={styles['login-button']}>Login</button>
          <button type="button" className={styles['sign-up-button']}>Sign Up</button>
        </div>
      </form>
    </section>
  );
}
