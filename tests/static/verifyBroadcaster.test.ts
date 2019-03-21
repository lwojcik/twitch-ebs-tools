import { default as TwitchEbsTools, TwitchPayload } from '../../src';

describe('verifyBroadcaster() static method', () => {
  test('returns true for correct broadcaster role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyBroadcaster(samplePayload)).toEqual(true);
  });

  test('returns false for incorrect role', () => {
    const incorrectPayload = {
      role: 'viewer',
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyBroadcaster(incorrectPayload)).toEqual(false);
  });
});
