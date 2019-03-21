import TwitchEbsTools from '../src';

describe('TwitchEbsTools class', () => {
  test('should be defined', () => {
    expect(TwitchEbsTools).toBeDefined();
  });
  test('should define validateToken() method', () => {
    expect(new TwitchEbsTools('secret').validateToken).toBeDefined;
  });
  test('should define verifyChannelId() static method', () => {
    expect(TwitchEbsTools.verifyChannelId).toBeDefined;
  });

  test('should define verifyTokenNotExpired() static method', () => {
    expect(TwitchEbsTools.verifyTokenNotExpired).toBeDefined;
  });

  test('should define verifyRole() static method', () => {
    expect(TwitchEbsTools.verifyRole).toBeDefined;
  });

  test('should define verifyChannelIdAndRole() static method', () => {
    expect(TwitchEbsTools.verifyChannelIdAndRole).toBeDefined;
  });

  test('should define verifyBroadcaster() static method', () => {
    expect(TwitchEbsTools.verifyBroadcaster).toBeDefined;
  });

  test('should define verifyViewerOrBroadcaster() static method', () => {
    expect(TwitchEbsTools.verifyViewerOrBroadcaster).toBeDefined;
  });

  test('should define validatePermission() method', () => {
    expect(new TwitchEbsTools('secret').validatePermission).toBeDefined;
  });
});
