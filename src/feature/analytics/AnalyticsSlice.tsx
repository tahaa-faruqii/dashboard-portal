import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnalyticsState {
  userGrowth: Array<{ month: string; users: number }>;
  revenueData: Array<{ month: string; revenue: number }>;
  conversionRate: number;
}

const initialState: AnalyticsState = {
  userGrowth: [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1900 },
    { month: "Mar", users: 3200 },
  ],
  revenueData: [
    { month: "Jan", revenue: 24000 },
    { month: "Feb", revenue: 36900 },
    { month: "Mar", revenue: 45600 },
  ],
  conversionRate: 3.24,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    updateAnalyticsData: (
      state,
      action: PayloadAction<Partial<AnalyticsState>>,
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateAnalyticsData } = analyticsSlice.actions;
export default analyticsSlice.reducer;
