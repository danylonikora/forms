import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../services/server";

export type AuthSlice = {
  userInfo: {
    username: string;
  };
  logged: boolean;
  success: boolean;
  loading: boolean;
  error: boolean;
  errorText: string;
};

const initialState: AuthSlice = {
  userInfo: {
    username: "",
  },
  logged: false,
  success: false,
  loading: false,
  error: false,
  errorText: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.logged = false;
      document.cookie = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.success = true;
          state.error = false;
          state.errorText = "";
          return;
        }
        state.success = false;
        state.error = true;
        state.errorText = action.payload.data;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.ok) {
          state.userInfo = { username: action.meta.arg.username };
          state.logged = true;
          state.error = false;
          state.errorText = "";
          return;
        }
        state.logged = false;
        state.error = true;
        state.errorText = action.payload.data;
      });
  },
});

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (credentials: { username: string; password: string }) => {
    const res = await signup(credentials.username, credentials.password);
    return { data: await res.json(), ok: res.ok };
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }) => {
    const res = await login(credentials.username, credentials.password);
    return { data: await res.json(), ok: res.ok };
  }
);

export default authSlice.reducer;
export const { logout } = authSlice.actions;
