import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";

const HomePage = lazy(() => import("@/pages/home"));
const ProductFilterPage = lazy(() => import("@/pages/product-filter"));
const ProductDtailPage = lazy(() => import("@/pages/product-detail"));
const BestSellerPage = lazy(() => import("@/pages/best-seller"));
const NewProductPage = lazy(() => import("@/pages/new-product"));
const LoginPage = lazy(() => import("@/pages/login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "products-filter", element: <ProductFilterPage /> },
      { path: "product-detail/:id", element: <ProductDtailPage /> },
      { path: "best-seller", element: <BestSellerPage /> },
      { path: "new-product", element: <NewProductPage /> },
    ],
  },
]);

export default router;
