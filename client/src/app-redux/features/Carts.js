import { createSlice } from "@reduxjs/toolkit";

const setSessionStorage = (cartsArr) => {
  sessionStorage.setItem("carts", JSON.stringify(cartsArr));
};

export const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
  },
  reducers: {
    loadCartsFromSessionStorage: (state, { payload }) => {
      state.carts = payload;
    },
    addOrUpdateCart: (state, action) => {
      const index = state.carts.findIndex((e) => e.id === action.payload.id);
      index === -1
        ? state.carts.push(action.payload)
        : (state.carts[index] = action.payload);

      setSessionStorage(state.carts);
    },
    incrementQuantity: (state, action) => {
      state.carts[action.payload.id].quantity += action.payload.quantity;
      setSessionStorage(state.carts);
    },
    decrementQuantity: (state, action) => {
      state.carts[action.payload.id].quantity -= action.payload.quantity;
      setSessionStorage(state.carts);
    },
    emptyTheCart: (state) => {
      state.carts.length = 0;
      sessionStorage.removeItem("carts");
    },
  },
});

export const {
  loadCartsFromSessionStorage,
  addOrUpdateCart,
  emptyTheCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
