// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";
import categories from "../store/apps/categories";
import products from "./apps/products";
import carts from "./apps/carts";
import wishlists from "./apps/wishlists";
import user from "./apps/user";
import address from "./apps/address";
import comment from "./apps/comment";
import orders from "./apps/orders";
// ** Reducers

export const store = configureStore({
  reducer: {
    categories,
    products,
    carts,
    wishlists,
    user,
    address,
    comment,
    orders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
