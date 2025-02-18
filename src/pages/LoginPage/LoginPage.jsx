import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdClose } from 'react-icons/io';
import styles from './LoginPage.module.css';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Đăng nhập thành công:', result.user);
      // Sau khi đăng nhập thành công, bạn có thể:
      // 1. Lưu thông tin user vào state/context
      // 2. Chuyển hướng người dùng đến trang chính
      // 3. Hiển thị thông báo thành công
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      // Xử lý lỗi - có thể hiển thị thông báo lỗi cho người dùng
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.loginContainer}>
        {/* Nút đóng */}
        <button className={styles.closeButton}>
          <IoMdClose size={24} />
        </button>

        {/* Logo Pinterest */}
        <img 
          src="/pinterest-logo.png" 
          alt="Pinterest Logo" 
          className={styles.logo}
        />
        
        <h1 className={styles.title}>Welcome to Pinterest</h1>

        {/* Form đăng nhập */}
        <form className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Email"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password"
              className={styles.input}
            />
          </div>

          <div className={styles.forgotPassword}>
            <a href="#">Forgot your password?</a>
          </div>

          <button type="submit" className={styles.loginButton}>
            Log in
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
  );
};

export default LoginPage;