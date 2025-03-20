import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import '../index.css'; // Import CSS nếu cần
import { createBrowserRouter } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import SearchPage from '../pages/SearchPage/SearchPage';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ChatPage from '../pages/ChatPage/ChatPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DefaultLayout headerTitle="Trang chủ">
        <HomePage />
        
      </DefaultLayout>
    ),
  },
  {
    path: "/search",
    element: (
      <DefaultLayout headerTitle="Tìm kiếm">
        <SearchPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/message",
    element: (
      <DefaultLayout>
        <ChatPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },

  // Thêm các route khác ở đây
]);

export default router;