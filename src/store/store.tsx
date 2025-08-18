import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducer";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
