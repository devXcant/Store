import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IproductResponse {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

interface CartState {
  data: IproductResponse[];
  loading: boolean;
  error: string | null;
}

export const fetchCart = createAsyncThunk<
  IproductResponse[],
  void,
  { rejectValue: string }
>("store/cart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("http://localhost:3000/api/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch cart data");
  }
});

const initialState: CartState = {
  data: [],
  loading: false,
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IproductResponse>) => {
      const existingItem = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.data.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.data.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; // Update the quantity
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCart.fulfilled,
        (state, action: PayloadAction<IproductResponse[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
