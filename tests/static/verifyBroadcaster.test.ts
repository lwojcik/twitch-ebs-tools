import { TwitchEbsTools } from "../../src";
import { TwitchPayload } from "../../src/types";

describe("verifyBroadcaster() static method", () => {
  it("returns true for correct broadcaster role", () => {
    const samplePayload = {
      role: "broadcaster",
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyBroadcaster(samplePayload)).toBe(true);
  });

  it("returns false for incorrect role", () => {
    const incorrectPayload = {
      role: "viewer",
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyBroadcaster(incorrectPayload)).toBe(false);
  });
});
