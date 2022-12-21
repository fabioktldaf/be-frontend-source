import { configureStore } from "@reduxjs/toolkit";
import user from "../redux/features/userSlice";
import newClaim from "../redux/features/newClaimSlice";
import subjects from "./features/subjectsSlice";
import search from "./features/searchSlice";
import policies from "./features/policySlice";
import { localstorageMiddleware } from "./localstorageMiddleware";

export const store = configureStore({
  reducer: {
    user,
    newClaim,
    subjects,
    policies,
    search,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localstorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
