import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import dashboardSlice from "../feature/dashboard/dashboardSlice";
import analyticsSlice from "../feature/analytics/AnalyticsSlice";
import settingsSlice from "../feature/setting/SettingSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dashboard", "analytics", "settings"],
};

const rootReducer = combineReducers({
  dashboard: dashboardSlice,
  analytics: analyticsSlice,
  settings: settingsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
