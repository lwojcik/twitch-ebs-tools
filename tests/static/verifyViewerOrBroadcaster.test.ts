import { TwitchEbsTools } from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyViewerOrBroadcaster() static method', () => {
  it('returns true for correct broadcaster role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyViewerOrBroadcaster(samplePayload)).toBe(true);
  });

  it('returns true for correct viewer role', () => {
    const samplePayload = {
      role: 'viewer',
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyViewerOrBroadcaster(samplePayload)).toBe(true);
  });

  it('returns false for incorrect role', () => {
    const incorrectPayload = {
      role: 'incorrect role',
    } as TwitchPayload;

    expect(TwitchEbsTools.verifyViewerOrBroadcaster(incorrectPayload)).toBe(false);
  });
});
