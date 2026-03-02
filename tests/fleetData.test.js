import { describe, expect, it } from "vitest";
import {
  FLEET_VEHICLES,
  getActiveVehicles,
  getDailyReportData,
  getMaintenanceDueVehicles,
  getVehicleById,
} from "../src/fleetData.js";

describe("fleetData", () => {
  it("finds vehicle by id", () => {
    expect(getVehicleById("truck-001", FLEET_VEHICLES)?.driver).toBe(
      "John Smith",
    );
  });

  it("returns active vehicles only", () => {
    const active = getActiveVehicles(FLEET_VEHICLES);
    expect(active.every((vehicle) => vehicle.active)).toBe(true);
    expect(active.length).toBe(3);
  });

  it("returns maintenance due vehicles", () => {
    const due = getMaintenanceDueVehicles(FLEET_VEHICLES, 3);
    expect(due.map((vehicle) => vehicle.id)).toEqual([
      "TRUCK-001",
      "VAN-456",
      "TRUCK-777",
    ]);
  });

  it("builds daily report metrics", () => {
    const report = getDailyReportData(FLEET_VEHICLES);
    expect(report.activeCount).toBe(3);
    expect(report.miles).toBeGreaterThan(0);
    expect(report.fuelGallons).toBeGreaterThan(0);
  });
});
