import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import newClaimReducer from "../redux/features/newClaimSlice";
import searchSubjetcSlice from "./features/subjectsSlice";
import { localstorageMiddleware } from "./localstorageMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    newClaim: newClaimReducer,
    subjects: searchSubjetcSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localstorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
