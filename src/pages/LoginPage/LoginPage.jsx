import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import styles from './LoginPage.module.css';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import FsocialLogo from '../../assets/images/Fsocial.jpg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Đăng nhập thành công:', result.user);
      navigate('/home');
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Đăng nhập với:', username, password);
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.overlay}>
        <div className={styles.loginContainer}>
          {/* Nút đóng */}
          <button className={styles.closeButton}>
            <IoMdClose size={24} />
          </button>

          {/* Logo Pinterest */}
          <img 
            src={FsocialLogo} 
            alt="Fsocial Logo" 
            className={styles.logo}
          />
          
          <h1 className={styles.title}>Hello! Good Morning</h1>

          {/* Form đăng nhập */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className={styles.loginButton}>
              Login
            </button>

            <div className={styles.divider}>OR</div>

            <button 
              type="button" 
              className={styles.googleButton}
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;