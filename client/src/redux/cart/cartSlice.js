import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: false,
  loading: false,
};
// Async thunk to add items to the cart
export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async (cartData) => {
    const response = await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
    return await response.json();
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: () => initialState,
    addToCartStart: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.loading = false;
      state.error = false;
    },
    addToCartFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    removeFromCartStart: (state) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loading = false;
      state.error = false;
    },
    removeFromCartFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCartAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCartAPI.fulfilled, (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.loading = false;
      state.error = false;
    });
    builder.addCase(addToCartAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export const {
  resetCartState,
  addToCartStart,
  addToCartSuccess,
  addToCartFail,
  removeFromCartStart,
  removeFromCartSuccess,
  removeFromCartFail,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
