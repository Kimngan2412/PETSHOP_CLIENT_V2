// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { WishlistType } from "./wishlist.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}

export const fetchData = createAsyncThunk(
  "wishlists/get",
  async (params?: DataParams) => {
    console.log("params", params);
    const response: AxiosResponse<PaginationResponse<WishlistType>> =
      await axios.get("/wishlists", {
        params: params,
      });

    return response.data;
  }
);

export const fetchWishlist = createAsyncThunk<WishlistType, number>(
  "wishlists/fetchById",
  async (id: number) => {
    const response = await axios.get<WishlistType>(`/wishlists/user/${id}`);
    return response.data;
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlists/create",
  async (wishlistData: WishlistType) => {
    const response = await axios.post("/wishlists", wishlistData);
    return response.data;
  }
);

export const deleteWishlist = createAsyncThunk(
  "wishlists/delete",
  async (id: number) => {
    const response = await axios.delete(`/wishlists/${id}`);
    return id;
  }
);

interface WishlistStore {
  data: WishlistType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  wishlist: any;
}

const initialState: WishlistStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  wishlist: {},
};

export const appWishlistSlice = createSlice({
  name: "wishlists",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      const wishlist = action.payload;
      // Lưu dữ liệu sản phẩm vào state
      state.wishlist = wishlist;
      // state.total = 1;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      const newWishlist = action.payload;
      state.data = [...state.data, newWishlist];
      state.total = state.total ? state.total + 1 : 1;
    });
    builder.addCase(deleteWishlist.fulfilled, (state, action) => {
      const deletedWishlistId = action.payload;
      // Xóa wishlist khỏi danh sách
      state.data = state.data?.filter(
        (wishlist) => wishlist.id !== deletedWishlistId
      );
      // Cập nhật tổng số lượng wishlist
      state.total = state.total ? state.total - 1 : 0;
    });
  },
});

export default appWishlistSlice.reducer;
