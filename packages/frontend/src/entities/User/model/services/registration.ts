import { createAsyncThunk } from "@reduxjs/toolkit";

import { ThunkConfig } from "app/providers/StoreProvider";
import jwt_decode from "jwt-decode";
import {userActions} from "entities/User/model/slices/userSlice";

interface RegistrationArgs {
  email: string;
  password: string;
}

interface RegistrationResponseData { token: string, message: string }

export interface DecodedToken { id: number, email: string }

export const registration = createAsyncThunk<
  DecodedToken,
  RegistrationArgs,
  ThunkConfig<string>
>("user/registration", async (args, thunkAPI) => {
  const { extra, rejectWithValue, dispatch } = thunkAPI;
  const { email, password } = args;

  try {
    const response = await extra.api.post<RegistrationResponseData>("/auth/registration", {
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
