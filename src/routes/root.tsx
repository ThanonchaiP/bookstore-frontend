import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";

const HomePage = lazy(() => import("@/pages/home"));
const ProductFilterPage = lazy(() => import("@/pages/product-filter"));
const BestSellerPage = lazy(() => import("@/pages/best-seller"));
const NewProductPage = lazy(() => import("@/pages/new-product"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products-filter", element: <ProductFilterPage /> },
      { path: "best-seller", element: <BestSellerPage /> },
      { path: "new-product", element: <NewProductPage /> },
    ],
  },
]);

export default router;
