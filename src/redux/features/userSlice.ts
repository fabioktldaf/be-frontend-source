import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultLanguage } from "../../config/const";

export interface UserState {
  language: string;
  environment: string;
}

const buildInitialState = () => {
  return {
    language: defaultLanguage,
    environment: "localhost",
  } as UserState;
};

export const userSlice = createSlice({
  name: "user",
  initialState: buildInitialState(),
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setEnvironment(state, action: PayloadAction<string>) {
      state.environment = action.payload;
    },
  },
});

export const { setLanguage, setEnvironment } = userSlice.actions;
export default userSlice.reducer;
