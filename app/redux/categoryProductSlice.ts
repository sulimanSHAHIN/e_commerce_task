import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategoryProducts = createAsyncThunk(
  "categoryProducts/fetchCategoryProducts",
  async (category: string) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    return await res.json();
  }
);

interface CategoryProductState {
  list: any[];
  status: string;
  category: string | null;
}

const initialState: CategoryProductState = {
  list: [],
  status: "idle",
  category: null,
};

const categoryProductSlice = createSlice({
  name: "categoryProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchCategoryProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default categoryProductSlice.reducer;
