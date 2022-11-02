import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import axios from "axios";

export const PostContentAsync = createAsyncThunk(
  "POST_CONTENT",
  async (formData: any, thunkAPI) => {
    return await axios({
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      url: "http://ec2-3-37-207-126.ap-northeast-2.compute.amazonaws.com:9999/api/posts",
      method: "post",
      data: formData,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  }
);

interface postData {
  authorId: number | null;
  content: string | null;
  createdAt: string | null;
  id: number | null;
  title: string | null;
}

export interface postContentType {
  data: postData[];
}

const initialState: postContentType =  
{
  data : [{
    authorId: null,
    content: null,
    createdAt: null,
    id: null,
    title: null,
  }],
};

export const writePosts = createSlice({
  name: "write",
  initialState,
  reducers: {
    onPost: (state,action : PayloadAction<any>) => {
      state.data.push(action.payload.data.response);
        console.log(state.data);
      // state.authenticated = false;
      // state.nickname =''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      PostContentAsync.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.data.push(action.payload.data.response);
      }
    );
  },
});

export const { onPost } = writePosts.actions;
export const postData = (state: RootState) => state.write.data;
// export const authenticated = (state: RootState) =>
//   state.login.authenticated;
// export const nicknameData = (state: RootState) => state.login.nickname;
// export const userId = (state: RootState) => state.kakaoLogin.userId;

export default writePosts.reducer;