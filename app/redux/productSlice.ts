import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await res.json();
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    return await res.json();
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => { state.status = "success"; state.list = action.payload; })
      .addCase(fetchProductsByCategory.rejected, (state) => { state.status = "error"; })
      .addCase(fetchAllProducts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAllProducts.fulfilled, (state, action) => { state.status = "success"; state.list = action.payload; })
      .addCase(fetchAllProducts.rejected, (state) => { state.status = "error"; });
  },
});

export default productSlice.reducer;
