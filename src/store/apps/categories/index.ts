// ** Redux Imports
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { CategoryType } from "./categories.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}
export const fetchData = createAsyncThunk(
  "categories/get",
  async (params?: DataParams) => {
    const response: AxiosResponse<PaginationResponse<CategoryType>> =
      await axios.get("/categories", {
        params,
      });

    return response.data;
  }
);

export const fetchCategories = createAsyncThunk<CategoryType, number>(
  "categories/fetchById",
  async (id: number) => {
    const response = await axios.get<CategoryType>(`/categories/${id}`);
    return response.data;
  }
);

interface CategoryStore {
  data: CategoryType[] | undefined;
  total?: number;
  params: {};
  categories: any;
  selectedCategories: any;
}

const initialState: CategoryStore = {
  data: [],
  total: 1,
  params: {},
  categories: [],
  selectedCategories: [],
};

export const appCategoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    selectCategories: (state, action: PayloadAction<any>) => {
      state.selectedCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const categories = action.payload;
      // Lưu dữ liệu sản phẩm vào state
      state.categories = categories;
      // state.total = 1;
    });
  },
});

export default appCategoriesSlice.reducer;
export const { selectCategories } = appCategoriesSlice.actions;
