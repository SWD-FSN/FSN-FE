import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1 className={styles.title}>SIGN IN</h1>
      
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <a href="/forgot-password" className={styles.forgotPassword}>
        Forgot password?
      </a>

      <button type="submit" className={styles.submitButton}>
        Sign in
      </button>

      <p className={styles.signupText}>
        Not a member? <a href="/signup">Create an account</a>
      </p>
    </form>
  );
};

export default LoginForm;