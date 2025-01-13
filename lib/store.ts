import fetchCart from "@/redux/features/cart";
import loadingSlice from "@/redux/features/loadingReducer";
import productSlice from "@/redux/features/product";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    fetchCart,
    productSlice,
    loadingSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
