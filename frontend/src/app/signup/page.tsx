'use client';

import React, { useState } from 'react';
import styles from '../../styles/signup.module.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openPasswordGuidelines = () => {
    alert("Recommended Password Guidelines: Use upper and lower case letters, numbers, and special characters.");
  };

  return (
    <section className={styles['signup-section']}>
      <h1>Sign Up</h1>
      <form className={styles['signup-form']}>
        <div className={styles['input-element']}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
        </div>
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
            <span className={styles['toggle-password']} onClick={togglePasswordVisibility}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
        </div>
        <div className={styles['input-element']}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={styles['password-wrapper']}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
            />
            <span className={styles['toggle-password']} onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
        </div>
        <p className={styles['password-req']}>Password Requirement</p>
        <ul className={styles['password-req-list']}>
          <li>Minimum length of 8 characters</li>
        </ul>
        <a href="#" onClick={openPasswordGuidelines} className={styles['guidelines-link']}>
          Recommended Password Guidelines
        </a>
        <div className={styles['terms-wrapper']}>
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">
            I agree to the <a href="/terms">terms of service</a>
          </label>
        </div>
        <div className={styles['buttons-wrapper']}>
          <button type="submit" className={styles['sign-up-button']}>Sign Up</button>
          <button type="button" className={styles['login-button']}>Login</button>
        </div>
      </form>
    </section>
  );
}
