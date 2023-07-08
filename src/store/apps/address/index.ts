// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { AddressType } from "./address.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}

export const fetchData = createAsyncThunk(
  "address/get",
  async (params: DataParams) => {
    const response: AxiosResponse<PaginationResponse<AddressType>> =
      await axios.get("/address", {
        params,
      });

    return response.data;
  }
);

export const fetchAddress = createAsyncThunk<AddressType, number>(
  "address/fetchById",
  async (id: number) => {
    const response = await axios.get<AddressType>(`/address/user/${id}`);

    return response.data;
  }
);

export const createAddress = createAsyncThunk<AddressType, AddressType>(
  "address/create",
  async (address: AddressType) => {
    const response = await axios.post<AddressType>("/address", address);

    return response.data;
  }
);

export const updateAddress = createAsyncThunk<
  AddressType,
  { id: number; address: AddressType }
>("address/update", async ({ id, address }) => {
  const response = await axios.put<AddressType>(`/address/${id}`, address);

  return response.data;
});
interface AddressStore {
  data: AddressType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  address: any;
}

const initialState: AddressStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  address: {},
};

export const appAddressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      const address = action.payload;
      // Lưu dữ liệu sản phẩm vào state
      state.address = address;
      // state.total = 1;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      const newAddress = action.payload;
      state.address = newAddress;
    });
  },
});

export default appAddressSlice.reducer;
