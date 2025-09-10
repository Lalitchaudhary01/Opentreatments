export async function getPriceTrends(medicineId: string) {
  // Dummy price history
  return [
    { date: new Date("2024-09-01"), price: 25 },
    { date: new Date("2024-10-01"), price: 27 },
    { date: new Date("2024-11-01"), price: 26 },
  ];
}
