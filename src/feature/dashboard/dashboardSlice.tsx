import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateSampleData } from "../../utils/generateSimpleData";

interface Metric {
  totalUsers: number;
  activeSessions: number;
  revenue: number;
  tasks: number;
}

interface DashboardState {
  metrics: Metric;
  kpiHistory: Array<{ date: string; value: number }>;
}

const initialMetrics: Metric = {
  totalUsers: 1248,
  activeSessions: 892,
  revenue: 24567,
  tasks: 156,
};

const initialState: DashboardState = {
  metrics: initialMetrics,
  kpiHistory: generateSampleData(12),
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateMetrics: (state, action: PayloadAction<Partial<Metric>>) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    generateRandomData: (state) => {
      state.metrics.totalUsers = Math.floor(Math.random() * 2000) + 1000;
      state.metrics.activeSessions = Math.floor(Math.random() * 1200) + 500;
      state.metrics.revenue = Math.floor(Math.random() * 50000) + 20000;
      state.metrics.tasks = Math.floor(Math.random() * 300) + 100;
    },
  },
});

export const { updateMetrics, generateRandomData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
