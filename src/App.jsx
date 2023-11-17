import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import SubCategories from "./pages/subcategories/SubCategories";
import NotFound from "./pages/notfound/NotFound";
import AuthCheck from "./utils/AuthCheck";
import ProtectedRoute from "./utils/ProtectedRout";
import Brands from "./pages/brands/Brands";

function App() {
  const isRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthCheck>
          <Login />
        </AuthCheck>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "subcategories",
          element: <SubCategories />,
        },
        {
          path: "brands",
          element: <Brands />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={isRouter} />;
}

export default App;
