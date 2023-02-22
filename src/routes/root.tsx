import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";
import routeUser from "./user";

const HomePage = lazy(() => import("@/pages/home"));
const ProductFilterPage = lazy(() => import("@/pages/product-filter"));
const ProductDtailPage = lazy(() => import("@/pages/product-detail"));
const BestSellerPage = lazy(() => import("@/pages/best-seller"));
const NewProductPage = lazy(() => import("@/pages/new-product"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const CategoryPage = lazy(() => import("@/pages/category"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "products-filter", element: <ProductFilterPage /> },
      { path: "product-detail/:id", element: <ProductDtailPage /> },
      { path: "best-seller", element: <BestSellerPage /> },
      { path: "new-product", element: <NewProductPage /> },
      { path: "category/:id", element: <CategoryPage /> },
      ...routeUser,
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
