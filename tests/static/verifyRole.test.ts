import TwitchEbsTools from '../../src';
import { TwitchPayload } from '../../src/types.d';

describe('verifyRole() static method', () => {
  it('returns true for correct role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleRole = 'broadcaster';

    expect(TwitchEbsTools.verifyRole(samplePayload, sampleRole)).toBe(true);
  });

  it('returns false for incorrect role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectRole = 'viewer';

    expect(TwitchEbsTools.verifyRole(samplePayload, incorrectRole)).toBe(false);
  });

  it('returns false for invalid payload', () => {
    const samplePayload = {} as TwitchPayload;
    const incorrectRole = 'viewer';

    expect(TwitchEbsTools.verifyRole(samplePayload, incorrectRole)).toBe(false);
  });
});
