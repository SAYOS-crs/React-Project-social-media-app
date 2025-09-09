import React from "react";
import Navbar from "./Components/Navbar.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import FeedPage from "./pages/FeedPage.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import ProtectedAuth from "./ProtectedRoute/ProtectedAuth.jsx";

import PageDetals from "./pages/PageDetals.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export default function App() {
  const root = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "Profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "post-detals/:id",
          element: (
            <ProtectedRoute>
              <PageDetals />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },

    // Authntcation //
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "/register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "/login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={root} />
    </>
  );
}
