import { TwitchEbsTools } from "../../src";
import { TwitchPayload } from "../../src/types";

describe("verifyTokenNotExpired() static method", () => {
  it("returns true for payload with valid exp value", () => {
    const exp = new Date().setTime(new Date().getTime() + 60 * 60 * 1000);

    const samplePayload = (<object>{
      exp,
    }) as TwitchPayload;

    expect(TwitchEbsTools.verifyTokenNotExpired(samplePayload)).toBe(true);
  });

  it("returns false for expired exp value", () => {
    const exp = 1332355094; // Wednesday, March 21, 2012 6:38:14 PM
    const expiredPayload = (<object>{
      exp,
    }) as TwitchPayload;

    expect(TwitchEbsTools.verifyTokenNotExpired(expiredPayload)).toBe(false);
  });

  it("returns false for invalid payload", () => {
    const invalidPayload = {} as TwitchPayload;

    expect(TwitchEbsTools.verifyTokenNotExpired(invalidPayload)).toBe(false);
  });
});
