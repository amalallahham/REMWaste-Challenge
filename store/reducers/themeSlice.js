import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "UI",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = state.theme === "UI" ? "UX" : "UI";
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
