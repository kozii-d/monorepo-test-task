import {createAsyncThunk} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

import {ThunkConfig} from "app/providers/StoreProvider";

import {userActions} from "../slices/userSlice";

interface LoginArgs {
  email: string;
  password: string;
}

export interface LoginResponseData { token: string }

export interface DecodedToken { id: number, email: string }

export const login = createAsyncThunk<
  DecodedToken,
  LoginArgs,
  ThunkConfig<string>
>("user/login", async (args, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI;
  const { email, password } = args;

  try {
    const response = await extra.api.post<LoginResponseData>("/auth/login", {
      email,
      password
    });

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem("token", response.data.token);

    dispatch(userActions.setAuth(true));

    return jwt_decode<DecodedToken>(response.data.token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return rejectWithValue("error");
  }
});
