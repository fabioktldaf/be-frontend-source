import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import newClaimReducer from "../redux/features/newClaimSlice";
import { localstorageMiddleware } from "./localstorageMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    newClaim: newClaimReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localstorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
