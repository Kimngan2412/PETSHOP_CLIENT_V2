// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const CART = "cart";

export const fetchData = createAsyncThunk("cart/get", async () => {
  const response = [...JSON.parse(localStorage.getItem(CART))] as any;
  return response;
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data: any, { dispatch }: any) => {
    const { item, quantity } = data;
    const cartJson = localStorage.getItem(CART);
    let carts = [];
    if (!cartJson) {
      carts = [{ ...item, quantity }];
      localStorage.setItem(CART, JSON.stringify(carts));
    } else {
      carts = [...JSON.parse(cartJson)];
      const find = carts.find((x) => x.id == item.id);
      if (find) {
        find.quantity += quantity;
      } else {
        carts.push({ ...item, quantity });
      }
      localStorage.setItem(CART, JSON.stringify(carts));
    }

    dispatch(fetchData);

    return carts;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/update-quantity",
  async (data: any, { dispatch }: any) => {
    const { item, quantity } = data;
    const cartJson = localStorage.getItem(CART);
    let carts = [];
    if (!cartJson) {
      carts = [{ ...item, quantity }];
      localStorage.setItem(CART, JSON.stringify(carts));
    } else {
      carts = [...JSON.parse(cartJson)];
      const find = carts.find((x) => x.id == item.id);
      if (find) {
        find.quantity = quantity;
      }

      localStorage.setItem(CART, JSON.stringify(carts));
    }

    dispatch(fetchData);
    return carts;
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cart/remove-product",
  async (data: any, { dispatch }: any) => {
    const { id } = data;
    const cartJson = localStorage.getItem(CART);
    let carts = [];
    if (!cartJson) {
    } else {
      carts = [...JSON.parse(cartJson)];
      carts = carts.filter((x) => x.id != id);
      localStorage.setItem(CART, JSON.stringify(carts));
    }

    dispatch(fetchData);
    return carts;
  }
);

export const appCartSlice = createSlice({
  name: "carts",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const carts = [...JSON.parse(localStorage.getItem(CART))];
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const carts = [...JSON.parse(localStorage.getItem(CART))];
    });

    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      const carts = [...JSON.parse(localStorage.getItem(CART))];
    });
  },
});

export default appCartSlice.reducer;
