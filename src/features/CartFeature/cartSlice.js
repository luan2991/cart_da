import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      // action.payload = { product, quantity }
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);
      if (idx < 0) {
        // not existed in cart
        state.cartItems.push(newItem);
      } else {
        // existed in cart
        state.cartItems[idx].product.quantity += newItem.product.quantity;
      }
    },

    removeQuantityItem(state, action) {
      const newItem = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === newItem.product.id);
      if (state.cartItems[idx].product.quantity <= 1) {
        state.cartItems[idx].product.quantity = 1;
      } else {
        state.cartItems[idx].product.quantity = state.cartItems[idx].product.quantity - 1;
      }
    },
    changeCart(state, action) {
      const { id, quantity } = action.payload;
      const idx = state.cartItems.findIndex((x) => x.product.id === id);
      state.cartItems[idx].product.quantity = quantity;
    },

    removeFromCart(state, action) {
      const newItem = action.payload;

      const newCartItem = state.cartItems.filter((item) => item.product.id !== newItem.id);
      state.cartItems = newCartItem;
    },

    removeAllFromCart(state, action) {},

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

const { reducer, actions } = cartSlice;
export const {
  addToCart,
  removeQuantityItem,
  removeAllFromCart,
  removeFromCart,
  clearCart,
  changeCart,
} = actions;
export default reducer;
