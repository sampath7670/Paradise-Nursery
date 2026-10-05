import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem(state, { payload }) {
      // Product cards only add a plant once; quantities are adjusted in the cart.
      if (!state.items.some(item => item.id === payload.id)) {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    updateQuantity(state, { payload: { id, quantity } }) {
      const item = state.items.find(item => item.id === id);
      // Quantities must be positive whole numbers. Use removeItem to delete.
      if (item && Number.isSafeInteger(quantity) && quantity >= 1) {
        item.quantity = quantity;
      }
    },
    incrementQuantity(state, { payload: id }) {
      const item = state.items.find(item => item.id === id);
      if (item) item.quantity += 1;
    },
    decrementQuantity(state, { payload: id }) {
      const item = state.items.find(item => item.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeItem(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
    },
  },
});

export const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;
export const selectCartItems = state => state.cart.items;
export const selectItemCount = state => state.cart.items.reduce((count, item) => count + item.quantity, 0);
// Integer cents keep all cart arithmetic exact.
export const selectTotalCents = state => state.cart.items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
export default cartSlice.reducer;
