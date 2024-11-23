import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import userReducer from "./userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
