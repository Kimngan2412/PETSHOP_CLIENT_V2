// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "../../../configs/axios.interceptor";
import { PaginationResponse } from "../../types";
import { UserType } from "./user.type";

export interface DataParams {
  keyword: string;
  status?: number | null;
  page: number;
  limit: number;
}

export const fetchData = createAsyncThunk(
  "users/get",
  async (params: DataParams) => {
    const response: AxiosResponse<PaginationResponse<UserType>> =
      await axios.get("/users", {
        params,
      });

    return response.data;
  }
);

export const fetchUser = createAsyncThunk<UserType, number>(
  "users/fetchById",
  async (id: number) => {
    const response = await axios.get<UserType>(`/users/getById/${id}`);

    return response.data;
  }
);

export const updateUser = createAsyncThunk<
  UserType,
  { id: number; users: UserType }
>("users/update", async ({ id, users }) => {
  const response = await axios.put<UserType>(
    `/users/updateUserInfo/${id}`,
    users
  );

  return response.data;
});

interface UserStore {
  data: UserType[] | undefined;
  total?: number;
  params: {};
  allData: any[];
  user: any;
}

const initialState: UserStore = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  user: {},
};

export const appUsersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const result = action.payload;
      state.data = result?.items;
      state.total = result?.meta?.totalItems;
    });
  },
});

export default appUsersSlice.reducer;
