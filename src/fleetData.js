export const FLEET_VEHICLES = [
  {
    id: "TRUCK-001",
    driver: "John Smith",
    location: "I-90, Chicago",
    speedMph: 62,
    fuelPct: 78,
    active: true,
    maintenanceInDays: 1,
  },
  {
    id: "VAN-456",
    driver: "Maria Garcia",
    location: "Detroit",
    speedMph: 35,
    fuelPct: 61,
    active: true,
    maintenanceInDays: 3,
  },
  {
    id: "VAN-202",
    driver: "Alex Chen",
    location: "Columbus",
    speedMph: 41,
    fuelPct: 54,
    active: true,
    maintenanceInDays: 7,
  },
  {
    id: "TRUCK-777",
    driver: "Priya Patel",
    location: "Cleveland",
    speedMph: 0,
    fuelPct: 42,
    active: false,
    maintenanceInDays: 2,
  },
];

export function getVehicleById(vehicleId, fleet = FLEET_VEHICLES) {
  const normalizedId = String(vehicleId || "")
    .trim()
    .toUpperCase();
  return fleet.find((vehicle) => vehicle.id === normalizedId) || null;
}

export function getActiveVehicles(fleet = FLEET_VEHICLES) {
  return fleet.filter((vehicle) => vehicle.active);
}

export function getMaintenanceDueVehicles(
  fleet = FLEET_VEHICLES,
  withinDays = 3,
) {
  return fleet.filter((vehicle) => vehicle.maintenanceInDays <= withinDays);
}

export function getDailyReportData(fleet = FLEET_VEHICLES) {
  const activeVehicles = getActiveVehicles(fleet);
  const miles = activeVehicles.reduce(
    (sum, vehicle) => sum + Math.max(18, vehicle.speedMph) * 7,
    0,
  );
  const fuelGallons = Math.max(80, Math.round(miles * 0.15));

  return {
    miles,
    fuelGallons,
    activeCount: activeVehicles.length,
  };
}
