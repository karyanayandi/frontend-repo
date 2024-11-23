import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { fetchUserData, setAuthToken, updateUserData } from "@/apis/userApi";

import { HTTP_STATUS } from "@/commons/constant";

import { ResponseDT } from "@/models/responseModel";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set auth persistence:", error);
});

export const loginUser = createAsyncThunk<
  {},
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);

    const authToken = await data.user.getIdToken();

    setAuthToken(authToken);

    return data.user;
  } catch (error: any) {
    const errorMessage = error.message || "Login failed. Please try again.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: any }>(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      const errorMessage = error.message || "Logout failed. Please try again.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const fetchUser = createAsyncThunk<
  ResponseDT<null>,
  { userId: string },
  { rejectValue: any }
>("user/fetch", async ({ userId }, thunkAPI) => {
  try {
    const response = await fetchUserData(userId);

    if (response.status == HTTP_STATUS.ERROR) {
      throw response.message;
    }

    const { data } = response;

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateUser = createAsyncThunk<
  ResponseDT<null>,
  { userId: string; data: { name: string } },
  { rejectValue: any }
>("user/update", async ({ userId, data }, thunkAPI) => {
  try {
    const response: ResponseDT<null> = await updateUserData(userId, data);

    if (response.status == HTTP_STATUS.ERROR) {
      throw response.message;
    }

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
