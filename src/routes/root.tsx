import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";

const HomePage = lazy(() => import("@/pages/home"));
const ProductFilterPage = lazy(() => import("@/pages/product-filter"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products-filter", element: <ProductFilterPage /> },
    ],
  },
]);

export default router;
