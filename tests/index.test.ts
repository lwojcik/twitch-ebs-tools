import { TwitchEbsTools } from "../src";

describe("TwitchEbsTools class", () => {
  it("should be defined", () => {
    expect(TwitchEbsTools).toBeDefined();
  });
  it("should define validateToken() method", () => {
    expect(new TwitchEbsTools("secret").validateToken).toBeDefined();
  });
  it("should define verifyChannelId() static method", () => {
    expect(TwitchEbsTools.verifyChannelId).toBeDefined();
  });

  it("should define verifyTokenNotExpired() static method", () => {
    expect(TwitchEbsTools.verifyTokenNotExpired).toBeDefined();
  });

  it("should define verifyRole() static method", () => {
    expect(TwitchEbsTools.verifyRole).toBeDefined();
  });

  it("should define verifyChannelIdAndRole() static method", () => {
    expect(TwitchEbsTools.verifyChannelIdAndRole).toBeDefined();
  });

  it("should define verifyBroadcaster() static method", () => {
    expect(TwitchEbsTools.verifyBroadcaster).toBeDefined();
  });

  it("should define verifyViewerOrBroadcaster() static method", () => {
    expect(TwitchEbsTools.verifyViewerOrBroadcaster).toBeDefined();
  });

  it("should define validatePermission() method", () => {
    expect(new TwitchEbsTools("secret").validatePermission).toBeDefined();
  });
});
