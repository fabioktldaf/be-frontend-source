import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/userSlice";
import newClaimReducer from "../redux/features/newClaimSlice";
import searchSubjetcSlice from "./features/subjectsSlice";
import searchSlice from "./features/searchSlice";
import { localstorageMiddleware } from "./localstorageMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    newClaim: newClaimReducer,
    subjects: searchSubjetcSlice,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localstorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
