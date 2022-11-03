import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";
import { customAxios } from "../lib/customAxios";
interface loginDataType {
  email: string;
  password: string;
}
interface signUpDataType {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

export const LoginAsync = createAsyncThunk(
  "POST_LOGIN",
  async (formData: loginDataType, thunkAPI) => {
    return await customAxios
      .post("/users/login", formData)
      .then((response) => {
        thunkAPI.dispatch(getUserAsync(response.data.response));
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
);
export const getUserAsync = createAsyncThunk(
  "GET_USERINFO",
  async (token: string) => {
    return await customAxios
      .get("/users")
      .then((response) => {
        return response.data.response;
      })
      .catch((error) => {
        return error.response;
      });
  }
);
export const signUpAsync = createAsyncThunk(
  "POST_SIGNUP",
  async (formData: signUpDataType) => {
    return await customAxios
      .post("/users/register", formData)
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        return error.response.status;
      });
  }
);
export interface loginState {
  authenticated: boolean;
  nickname: string;
}

const initialState: loginState = {
  authenticated: false,
  nickname: "",
};

export const palpalsLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    onLogout: (state) => {
      state.authenticated = false;
      state.nickname = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAsync.fulfilled, (state, { payload }) => {
      state.authenticated = true; // 로그인 상태 확인
    });
    builder.addCase(getUserAsync.fulfilled, (state, { payload }) => {
      const { nickname } = payload;
      state.nickname = nickname;
      state.authenticated = true;
    });
  },
});

export const { onLogout } = palpalsLogin.actions;
export const authenticated = (state: RootState) => state.login.authenticated;
export const nicknameData = (state: RootState) => state.login.nickname;

export default palpalsLogin.reducer;
