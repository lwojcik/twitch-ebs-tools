import jwt from "jsonwebtoken";
import { TwitchEbsTools } from "../../src";

describe("validateToken() method", () => {
  it("should return payload for correctly signed token", () => {
    const sampleSecret = "some secret";
    const samplePayload = { foo: "bar" };
    const validToken = jwt.sign(
      samplePayload,
      Buffer.from(sampleSecret, "base64"),
      {
        noTimestamp: true,
      }
    );

    expect(
      new TwitchEbsTools(sampleSecret).validateToken(validToken)
    ).toStrictEqual(samplePayload);
  });

  it("should throw JsonWebTokenError for incorrect token", () => {
    const sampleSecret = "some secret";
    const incorrectToken = "incorrect token";
    expect(() =>
      new TwitchEbsTools(sampleSecret).validateToken(incorrectToken)
    ).toThrow("invalid signature");
  });
});
