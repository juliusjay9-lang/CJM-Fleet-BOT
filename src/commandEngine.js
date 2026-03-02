import {
  FLEET_VEHICLES,
  getActiveVehicles,
  getDailyReportData,
  getMaintenanceDueVehicles,
  getVehicleById,
} from "./fleetData.js";

export const UNKNOWN_COMMAND_RESPONSE =
  "Command not recognized. Try quick commands.";

function extractVehicleId(command) {
  const text = String(command || "").toUpperCase();
  const match = text.match(/([A-Z]+-\d+)/);
  return match?.[1] || "TRUCK-001";
}

export function resolveFleetCommand(command, fleet = FLEET_VEHICLES) {
  const normalized = String(command || "").toLowerCase();

  if (normalized.includes("where is")) {
    const vehicleId = extractVehicleId(command);
    const vehicle = getVehicleById(vehicleId, fleet);

    if (!vehicle) {
      return {
        key: "where is",
        response: `${vehicleId} was not found in fleet records.`,
      };
    }

    return {
      key: "where is",
      response: `${vehicle.id} at ${vehicle.location}. Driver:${vehicle.driver}, Speed:${vehicle.speedMph} mph, Fuel:${vehicle.fuelPct}%`,
    };
  }

  if (normalized.includes("show active")) {
    const activeVehicles = getActiveVehicles(fleet);
    const activeIds = activeVehicles.map((vehicle) => vehicle.id).join(", ");
    return {
      key: "show active",
      response: `${activeVehicles.length} active: ${activeIds}`,
    };
  }

  if (normalized.includes("generate daily")) {
    const report = getDailyReportData(fleet);
    return {
      key: "generate daily",
      response: `Report: ${report.miles.toLocaleString()} miles, ${report.fuelGallons} gal fuel`,
    };
  }

  if (normalized.includes("maintenance due")) {
    const dueVehicles = getMaintenanceDueVehicles(fleet);
    const urgent = dueVehicles.filter(
      (vehicle) => vehicle.maintenanceInDays <= 1,
    ).length;
    return {
      key: "maintenance due",
      response: `${dueVehicles.length} tasks pending: ${urgent} urgent, ${Math.max(dueVehicles.length - urgent, 0)} scheduled`,
    };
  }

  return {
    key: "unknown",
    response: UNKNOWN_COMMAND_RESPONSE,
  };
}
