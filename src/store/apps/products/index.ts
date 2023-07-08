// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { ProductType } from "./products.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
  categoriesId: number;
}

export const fetchData = createAsyncThunk(
  "products/get",
  async (params?: DataParams) => {
    console.log("params", params);
    const response: AxiosResponse<PaginationResponse<ProductType>> =
      await axios.get("/products", {
        params: params,
      });

    return response.data;
  }
);

export const fetchProduct = createAsyncThunk<ProductType, number>(
  "products/fetchById",
  async (id: number) => {
    const response = await axios.get<ProductType>(`/products/${id}`);

    return response.data;
  }
);
interface ProductStore {
  data: ProductType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  product: any;
}

const initialState: ProductStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  product: {},
};

export const appProductsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      const product = action.payload;
      // Lưu dữ liệu sản phẩm vào state
      state.product = product;
      // state.total = 1;
    });
  },
});

export default appProductsSlice.reducer;
