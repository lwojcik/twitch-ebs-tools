import TwitchEbs from '../src';

describe('TwitchEbs class', () => {
  test('should be defined', () => {
    expect(TwitchEbs).toBeDefined();
  });
  test('should define verifyToken() method', () => {
    expect(new TwitchEbs('secret').validateToken).toBeDefined;
  });

  test('should define validateTokenAsync() method', () => {
    expect(new TwitchEbs('secret').validateTokenAsync).toBeDefined;
  });

  test('should define verifyChannelId() static method', () => {
    expect(TwitchEbs.verifyChannelId).toBeDefined;
  });

  test('should define verifyTokenNotExpired() static method', () => {
    expect(TwitchEbs.verifyTokenNotExpired).toBeDefined;
  });

  test('should define verifyRole() static method', () => {
    expect(TwitchEbs.verifyRole).toBeDefined;
  });

  test('should define verifyChannelIdAndRole() static method', () => {
    expect(TwitchEbs.verifyChannelIdAndRole).toBeDefined;
  });

  test('should define verifyBroadcaster() static method', () => {
    expect(TwitchEbs.verifyBroadcaster).toBeDefined;
  });

  test('should define verifyViewerOrBroadcaster() static method', () => {
    expect(TwitchEbs.verifyViewerOrBroadcaster).toBeDefined;
  });

  test('should define validateRolePermission() method', () => {
    expect(new TwitchEbs('secret').validateRolePermission).toBeDefined;
  });
});
