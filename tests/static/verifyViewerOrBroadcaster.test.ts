import TwitchEbs from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyViewerOrBroadcaster() static method', () => {
  test('returns true for correct broadcaster role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;

    expect(TwitchEbs.verifyViewerOrBroadcaster(samplePayload)).toEqual(true);
  });

  test('returns true for correct viewer role', () => {
    const samplePayload = {
      role: 'viewer',
    } as TwitchPayload;

    expect(TwitchEbs.verifyViewerOrBroadcaster(samplePayload)).toEqual(true);
  });

  test('returns false for incorrect role', () => {
    const incorrectPayload = {
      role: 'incorrect role',
    } as TwitchPayload;

    expect(TwitchEbs.verifyViewerOrBroadcaster(incorrectPayload)).toEqual(false);
  });
});
