import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const data = await res.json();
    return data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json(); // FIXED — you forgot await
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle", // idle | loading | succeeded | failed
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.list = []; 
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.list = []; 
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
