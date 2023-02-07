import { Cart, CartItem } from "@/models/cart";
import { getCart, removeCartItem, updateCartItem } from "@/services/cart.service";
import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/configureStore";

interface CartState {
  cart: Cart | null;
  totalPrice: number;
  selected: CartItem[];
}

const initialState: CartState = {
  cart: null,
  totalPrice: 0,
  selected: [],
};

export const fetchCartAsync = createAsyncThunk(
  "cart/fetchCartAsync",
  async (_, thunkAPI) => {
    try {
      const userId = localStorage.getItem("user");
      const cart = await getCart(userId!);

      return cart.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const updateCartItemAsync = createAsyncThunk<void, { cartItemId: string; quantity: number }>(
  "cart/updateCartItemAsync",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      await updateCartItem(cartItemId, quantity);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

export const removeCartItemAsync = createAsyncThunk<void, { cartItemId: string }>(
  "cart/removeCartItemAsync",
  async ({ cartItemId }, thunkAPI) => {
    try {
      await removeCartItem(cartItemId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.response.data.message });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<CartItem>) => {
      state.selected.push(action.payload);
    },
    setSelected: (state, action: PayloadAction<CartItem[]>) => {
      state.selected = action.payload;
    },
    removeSelectItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.selected.findIndex((i) => i.id === action.payload.id);
      state.selected.splice(itemIndex, 1);
    },
    clearSelectItem: (state) => {
      state.selected = [];
    },
    clearCart: (state) => {
      state.cart = null;
      state.totalPrice = 0;
      state.selected = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateCartItemAsync.fulfilled, (state, action) => {
      const { cartItemId, quantity } = action.meta.arg;
      const itemIndex = state.cart?.cartItems.findIndex((i) => i.id === cartItemId);
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.cart!.cartItems[itemIndex].quantity = quantity;
      state.totalPrice = state.cart!.cartItems.reduce((sum, item) => sum + item.quantity * +item.book.price, 0);

      //Update selected state
      const selectedId = state.selected.findIndex((i) => i.id === cartItemId);
      if (state.selected.length < 1 || selectedId === -1 || selectedId === undefined) return;
      state.selected[selectedId].quantity = quantity;
    });
    builder.addCase(removeCartItemAsync.fulfilled, (state, action) => {
      const { cartItemId } = action.meta.arg;
      const itemIndex = state.cart?.cartItems.findIndex((i) => i.id === cartItemId);
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.cart!.cartItems.splice(itemIndex, 1);
      state.totalPrice = state.cart!.cartItems.reduce((sum, item) => sum + item.quantity * +item.book.price, 0);
    });
    builder.addMatcher(isAnyOf(fetchCartAsync.fulfilled), (state, action: PayloadAction<Cart>) => {
      const { cartItems } = action.payload;
      state.cart = action.payload;
      state.totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * +item.book.price, 0);
    });
  },
});

export const { setSelected, selectItem, clearSelectItem, removeSelectItem, clearCart } = cartSlice.actions;
export const selectCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
