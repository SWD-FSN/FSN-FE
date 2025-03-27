import PostCard from "@/pages/PostCard/PostCard";
import UserPage from "@/pages/UserPage/UserPage";
import { createBrowserRouter } from "react-router-dom";
import GifSearch from "../components/GifSearch/GifSearch";
import DefaultLayout from "../components/layouts/DefaultLayout";
import ChatPage from "../pages/ChatPage/ChatPage";
import HomePage from "../pages/HomePage/HomePage";
import LikedPostsPage from "../pages/LikedPostsPage/LikedPostsPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProfileSettings from "../pages/ProfileSettings/ProfileSettings";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import SearchPage from "../pages/SearchPage/SearchPage";
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
  {
    path: "/likes",
    element: (
      <DefaultLayout headerTitle="Bài viết đã thích">
        <LikedPostsPage />
      </DefaultLayout>
    ),
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/gifsearch",
    element: <GifSearch />,
  },
  {
    path: "/post-cart-page",
    element: (
      <DefaultLayout headerTitle="Bài viết được tìm kiếm">
        <PostCard />
      </DefaultLayout>
    ),
  },
  {
    path: "/user-post/:id",
    element: (
      <DefaultLayout headerTitle="Người dùng được tìm kiếm">
        <UserPage />
      </DefaultLayout>
    ),
  },
]);
