export const generateSampleData = (count: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - count);

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short" }),
      value: Math.floor(Math.random() * 1000) + 100,
    });
  }
  return data;
};
