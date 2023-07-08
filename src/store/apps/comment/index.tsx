// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { CommentType } from "./comment.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}

export const fetchData = createAsyncThunk(
  "comments/get",
  async (params?: DataParams) => {
    console.log("params", params);
    const response: AxiosResponse<PaginationResponse<CommentType>> =
      await axios.get("/comments", {
        params: params,
      });

    return response.data;
  }
);

export const fetchComment = createAsyncThunk<CommentType, number>(
  "comments/fetchById",
  async (id: number) => {
    const response = await axios.get<CommentType>(
      `/comments/getByProductId/${id}`
    );
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  "comments/create",
  async (wishlistData: CommentType) => {
    const response = await axios.post("/comments", wishlistData);
    return response.data;
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id: number) => {
    const response = await axios.delete(`/comments/${id}`);
    return id;
  }
);

interface CommentStore {
  data: CommentType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  comment: any;
}

const initialState: CommentStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  comment: {},
};

export const appCommentSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchComment.fulfilled, (state, action) => {
      const comment = action.payload;
      // Lưu dữ liệu sản phẩm vào state
      state.comment = comment;
      // state.total = 1;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const newComment = action.payload;
      state.data = [...state.data, newComment];
      state.total = state.total ? state.total + 1 : 1;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const deletedCommentId = action.payload;
      // Xóa wishlist khỏi danh sách
      state.data = state.data?.filter(
        (comment) => comment.id !== deletedCommentId
      );
      // Cập nhật tổng số lượng wishlist
      state.total = state.total ? state.total - 1 : 0;
    });
  },
});

export default appCommentSlice.reducer;
