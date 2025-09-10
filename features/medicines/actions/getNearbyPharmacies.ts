export async function getNearbyPharmacies(medicineId: string, city?: string) {
  // Dummy pharmacies
  return [
    {
      id: "ph1",
      name: "Apollo Pharmacy",
      address: "123 MG Road",
      city: "Delhi",
      state: "Delhi",
      phone: "9876543210",
      latitude: 28.6139,
      longitude: 77.209,
    },
    {
      id: "ph2",
      name: "MedPlus",
      address: "456 Connaught Place",
      city: "Delhi",
      state: "Delhi",
      phone: "9876543222",
      latitude: 28.6329,
      longitude: 77.219,
    },
  ].filter((p) => (city ? p.city.toLowerCase() === city.toLowerCase() : true));
}
