import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slice/filterSlice";
import categorySlice from "./slice/categorySlice";
import accountSlice from "./slice/accountSlice";
import cartSlice from "./slice/cartSlice";
import favoriteSlice from "./slice/favoriteSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    category: categorySlice,
    account: accountSlice,
    cart: cartSlice,
    favorite: favoriteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
