import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(API_URL);
    return await res.json();
  }
);

interface ProductState {
  all: any[];
  visible: number;
  status: string;
}

const initialState: ProductState = {
  all: [],
  visible: 10,
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadMore(state) {
      state.visible += 20;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.all = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { loadMore } = productSlice.actions;
export default productSlice.reducer;
