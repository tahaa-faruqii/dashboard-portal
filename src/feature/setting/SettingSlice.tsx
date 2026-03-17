import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
  theme: "light" | "dark";
  isSidebarCollapsed: boolean;
  notifications: number;
  profile: {
    name: string;
    email: string;
    avatar: string;
  };
}

const initialState: SettingsState = {
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  isSidebarCollapsed: false,
  notifications: 3,
  profile: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
      document.documentElement.classList.toggle("dark", state.theme === "dark");
    },
    toggleSidebar: (state) => {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    updateProfile: (
      state,
      action: PayloadAction<Partial<SettingsState["profile"]>>,
    ) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    addNotification: (state) => {
      state.notifications += 1;
    },
  },
});

export const { toggleTheme, toggleSidebar, updateProfile, addNotification } =
  settingsSlice.actions;
export default settingsSlice.reducer;
