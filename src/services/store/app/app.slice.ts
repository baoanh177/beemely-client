import { createSlice } from "@reduxjs/toolkit";

const loadTheme = () => {
  try {
    const theme = localStorage.getItem("theme");
    return theme ? JSON.parse(theme) : { theme: "light" };
  } catch (error) {
    console.error("Failed to parse theme from localStorage:", error);
    return { theme: "light" };
  }
};

const initialState = {
  theme: loadTheme().theme,
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
      try {
        localStorage.setItem("theme", JSON.stringify({ theme: payload }));
      } catch (error) {
        console.error("Failed to save theme to localStorage:", error);
      }
    },
  },
});

export const { setTheme } = appSlice.actions;
export { appSlice };
