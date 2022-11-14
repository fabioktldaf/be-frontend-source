import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLanguage } from "../../config/const";

export interface UserState {
  language: string;
}

const buildInitialState = () => {
  return {
    language: defaultLanguage,
  } as UserState;
};

export const userSlice = createSlice({
  name: "user",
  initialState: buildInitialState(),
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = userSlice.actions;
export default userSlice.reducer;
