import { createAsyncThunk } from "@reduxjs/toolkit";

import { GET_USER_BY_ID } from "shared/api/queries";

import { ThunkConfig } from "app/providers/StoreProvider";

import { User } from "../types/user";

interface UserResponseData {
  user: User
}

export const fetchUserById = createAsyncThunk<
  User,
  number,
  ThunkConfig<string>
>("user/fetchUserById", async (id, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  try {
    const response = await extra.api.post<GQLResponseData<UserResponseData>>("/api/graphql", {
      query: GET_USER_BY_ID,
      variables: {
        userId: id
      }
    });

    if (!response.data.data) {
      throw new Error();
    }

    return response.data.data.user;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return rejectWithValue("error");
  }
});
