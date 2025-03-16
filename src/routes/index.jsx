import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import HomePage from '../pages/HomePage/HomePage';
import SearchPage from '../pages/SearchPage/SearchPage';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ChatPage from '../pages/ChatPage/ChatPage';

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