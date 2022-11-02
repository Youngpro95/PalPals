import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";

export const LoginAsync = createAsyncThunk(
  "POST_LOGIN",
  async (formData: any, thunkAPI) => {
    return await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      url: 'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/users/login',
      method: 'post',
      data: formData,
    })
      .then((response) => {
        thunkAPI.dispatch(getUserAsync(response.data.response))
        return response
      })
      .catch((error) => {
        console.log(error)
        return error.response
      });
  }
);
export const getUserAsync = createAsyncThunk(
  "GET_USERINFO",
  async (data: any, thunkAPI) => {
    const {access_token} = data
    return await axios({
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${access_token}`
      },
      url: 'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/users',
      method: 'get',
    })
      .then((response) => {
        return response.data.response
      })
      .catch((error) => {
        console.log(error)
        return error.response
      });
  }
);
export const signUpAsync = createAsyncThunk(
  "POST_SIGNUP",
  async (formData: any, thunkAPI) => {
    return await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      },
      url: 'http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/users/register',
      method: 'post',
      data: formData,
    })
      .then((response) => {
        response.status === 201 && alert("회원가입이 완료되었습니다.")
        return response.status
      })
      .catch((error) => {
        error.response.status === 409 && alert("이메일이 중복됩니다.")
        return error.response.status
      });
  }
);
export interface loginState {
  authenticated: boolean;
  nickname : string
  
}

const initialState: loginState = {
  authenticated: false,
  nickname : '',
};

export const palpalsLogin = createSlice({
  name: "login",
  initialState,
  reducers: {
    onLogout: (state)=>{
      state.authenticated = false;
      state.nickname =''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAsync.fulfilled, (state, { payload }) => {
      state.authenticated = true; // 로그인 상태 확인
    });
    builder.addCase(getUserAsync.fulfilled, (state, { payload }) => {
      const {nickname} = payload
      state.nickname = nickname
      state.authenticated = true;
    });
  },
});

export const { onLogout } = palpalsLogin.actions;
// export const loginToken = (state: RootState) => state.kakaoLogin.kakaoToken;
export const authenticated = (state: RootState) =>
  state.login.authenticated;
export const nicknameData = (state: RootState) => state.login.nickname;
// export const userId = (state: RootState) => state.kakaoLogin.userId;

export default palpalsLogin.reducer;
