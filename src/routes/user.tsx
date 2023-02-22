import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const CartPage = lazy(() => import("@/pages/cart"));
const UserWrapper = lazy(() => import("@/pages/user"));
const OrderPage = lazy(() => import("@/pages/user/components/order"));
const FavoritePage = lazy(() => import("@/pages/user/components/favorite"));
const ProfilePage = lazy(() => import("@/pages/user/components/profile"));
const ProfilePasswordPage = lazy(() => import("@/pages/user/components/profile-password"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));

const routeUser: RouteObject[] = [
  { path: "user/cart", element: <ProtectedRoute />, children: [{ index: true, element: <CartPage /> }] },
  {
    path: "user",
    element: <UserWrapper />,
    children: [
      { path: "order", element: <OrderPage /> },
      { path: "favorite", element: <FavoritePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile-password", element: <ProfilePasswordPage /> },
    ],
  },
];

export default routeUser;
