import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const handleLogin = (credentials) => {
    console.log('Login attempt with:', credentials);
    // Thêm logic xử lý đăng nhập ở đây
  };

  return (
    <div className={styles.loginPage}>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;