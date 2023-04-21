import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "./store";

export interface AuthState {
  token: string;
  email: string;
  id: string;
  username: string;
}

const initialState: AuthState = {
  token: "",
  email: "",
  id: "",
  username: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.username = action.payload.username;
      window.localStorage.setItem("_access_token", action.payload.token);
    },
    setAuthStateUsername(state, action) {
      state = { ...state, username: action.payload };
      return { ...state };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, setAuthStateUsername } = authSlice.actions;
export const selectAuthState = (state: AppState) => state.auth;
export default authSlice;
