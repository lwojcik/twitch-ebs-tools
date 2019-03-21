import TwitchEbs from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyBroadcaster() static method', () => {
  test('returns true for correct broadcaster role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;

    expect(TwitchEbs.verifyBroadcaster(samplePayload)).toEqual(true);
  });

  test('returns false for incorrect role', () => {
    const incorrectPayload = {
      role: 'viewer',
    } as TwitchPayload;

    expect(TwitchEbs.verifyBroadcaster(incorrectPayload)).toEqual(false);
  });
});
