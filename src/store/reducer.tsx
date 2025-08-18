import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Product } from "../pages/Store/Store";

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json "
    );

    if (!response.ok) {
      throw new Error(
        `Ошибка запроса: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  }
);

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Неизвестная ошибка";
      });
  },
});

export default productsReducer.reducer;
