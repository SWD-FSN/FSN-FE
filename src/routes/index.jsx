import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import SearchPage from '../pages/SearchPage/SearchPage';
import DefaultLayout from '../components/layouts/DefaultLayout';
import ChatPage from '../pages/ChatPage/ChatPage';
import ProfileSettings from '../pages/ProfileSettings/ProfileSettings';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
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
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/profile-settings",
    element: <ProfileSettings />,
  },
]);
