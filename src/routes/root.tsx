import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/main";

const HomePage = lazy(() => import("@/pages/home"));
const ProductFilterPage = lazy(() => import("@/pages/product-filter"));
const ProductDtailPage = lazy(() => import("@/pages/product-detail"));
const BestSellerPage = lazy(() => import("@/pages/best-seller"));
const NewProductPage = lazy(() => import("@/pages/new-product"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));
const CartPage = lazy(() => import("@/pages/cart"));
const UserWrapper = lazy(() => import("@/pages/user"));
const OrderPage = lazy(() => import("@/pages/user/components/order"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

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
      { path: "user/cart", element: <ProtectedRoute />, children: [{ index: true, element: <CartPage /> }] },
      {
        path: "user",
        element: <UserWrapper />,
        children: [{ path: "order", element: <OrderPage /> }],
      },
    ],
  },
]);

export default router;
