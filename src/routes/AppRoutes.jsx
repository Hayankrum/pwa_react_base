import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../components/layout/Layout";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ProtectedRoute from "../components/ui/ProtectedRoute";

// Lazy loading das páginas
const Login = lazy(() => import("../pages/usuario/Login"));
const Register = lazy(() => import("../pages/usuario/Register"));
const Profile = lazy(() => import("../pages/usuario/Profile"));
const ChangePassword = lazy(() => import("../pages/usuario/ChangePassword"));
const PublicProfile = lazy(() => import("../pages/usuario/PublicProfile"));

// Status pages
const Offline = lazy(() => import("../pages/Status/Offline"));
const NotFound = lazy(() => import("../pages/Status/NotFound"));

// Posts
const PostList = lazy(() => import("../pages/posts/PostList"));
const PostDetail = lazy(() => import("../pages/posts/PostDetail"));
const PostForm = lazy(() => import("../pages/posts/PostForm"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PostList />
            </Suspense>
          }
        />

        <Route
          path="login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:userId"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PublicProfile />
            </Suspense>
          }
        />
        <Route
          path="change-password"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <ChangePassword />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="posts"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PostList />
            </Suspense>
          }
        />
        <Route
          path="posts/create"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <PostForm />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="posts/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <PostDetail />
            </Suspense>
          }
        />
        <Route
          path="posts/:id/edit"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <PostForm />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="offline"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Offline />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}