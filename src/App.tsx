import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store, persistor } from "./app/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import Layouts from "./component/Layouts";

const theme = createTheme({
  palette: {
    mode: (localStorage.getItem("theme") as "light" | "dark") || "light",
  },
});

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.add("light");
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-poppins">
            <Router>
              <Layouts>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layouts>
            </Router>
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
