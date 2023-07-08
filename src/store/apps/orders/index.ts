// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { OrderType } from "./orders.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}

export const fetchData = createAsyncThunk(
  "orders/get",
  async (params?: DataParams) => {
    console.log("params", params);
    const response: AxiosResponse<PaginationResponse<OrderType>> =
      await axios.get("/orders", {
        params: params,
      });

    return response.data;
  }
);

export const fetchOrders = createAsyncThunk<OrderType, number>(
  "orders/fetchUserById",
  async (id: number) => {
    const response = await axios.get<OrderType>(`/orders/user/${id}`);
    return response.data;
  }
);

export const fetchOrdersById = createAsyncThunk<OrderType, number>(
  "orders/fetchById",
  async (id: number) => {
    const response = await axios.get<OrderType>(`/orders/${id}`);
    return response.data;
  }
);

export const updateShippingStatus = createAsyncThunk(
  "orders/updateShippingStatus",
  async (payload: { id: number; status: string }) => {
    const { id, status } = payload;
    const response = await axios.put(`/orders/updateShippingStatus/${id}`, {
      status,
    });
    return response.data;
  }
);

export const deleteOrders = createAsyncThunk(
  "orders/delete",
  async (id: number) => {
    const response = await axios.delete(`/orders/${id}`);
    return id;
  }
);

interface OrdersStore {
  data: OrderType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  order: any;
}

const initialState: OrdersStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  order: {},
};

export const appOrderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const order = action.payload;
      state.order = order;
    });
    // builder.addCase(addToWishlist.fulfilled, (state, action) => {
    //   const newWishlist = action.payload;
    //   state.data = [...state.data, newWishlist];
    //   state.total = state.total ? state.total + 1 : 1;
    // });

    builder.addCase(updateShippingStatus.fulfilled, (state, action) => {
      // Xử lý sau khi API hoàn thành thành công
      // Ví dụ: Cập nhật trạng thái vận chuyển của đơn hàng trong state
      const updatedOrder = action.payload;
      state.order = updatedOrder;
    });
    builder.addCase(deleteOrders.fulfilled, (state, action) => {
      const deletedOrderId = action.payload;
      // Xóa wishlist khỏi danh sách
      state.data = state.data?.filter((order) => order.id !== deletedOrderId);
      // Cập nhật tổng số lượng wishlist
      state.total = state.total ? state.total - 1 : 0;
    });
  },
});

export default appOrderSlice.reducer;
