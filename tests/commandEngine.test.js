import { describe, expect, it } from "vitest";
import {
  resolveFleetCommand,
  UNKNOWN_COMMAND_RESPONSE,
} from "../src/commandEngine.js";
import { FLEET_VEHICLES } from "../src/fleetData.js";

describe("resolveFleetCommand", () => {
  it("returns location details for a known vehicle", () => {
    const result = resolveFleetCommand("BOT, where is TRUCK-001?");

    expect(result.key).toBe("where is");
    expect(result.response).toContain("TRUCK-001 at I-90, Chicago");
  });

  it("matches command phrases case-insensitively", () => {
    const result = resolveFleetCommand("bot, SHOW ACTIVE VEHICLES");

    expect(result.key).toBe("show active");
    expect(result.response).toContain("3 active");
  });

  it("returns unknown when command is not recognized", () => {
    const result = resolveFleetCommand("BOT, show nearest gas station");

    expect(result).toEqual({
      key: "unknown",
      response: UNKNOWN_COMMAND_RESPONSE,
    });
  });

  it("returns not-found for missing vehicles", () => {
    const result = resolveFleetCommand(
      "BOT, where is TRUCK-999",
      FLEET_VEHICLES,
    );
    expect(result.key).toBe("where is");
    expect(result.response).toContain("TRUCK-999 was not found");
  });
});
