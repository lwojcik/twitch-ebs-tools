import TwitchEbs from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyRole() static method', () => {
  test('returns true for correct role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleRole = 'broadcaster';

    expect(TwitchEbs.verifyRole(samplePayload, sampleRole)).toEqual(true);
  });

  test('returns false for incorrect role', () => {
    const samplePayload = {
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectRole = 'viewer';

    expect(TwitchEbs.verifyRole(samplePayload, incorrectRole)).toEqual(false);
  });

  test('returns false for invalid payload', () => {
    const samplePayload = {} as TwitchPayload;
    const incorrectRole = 'viewer';

    expect(TwitchEbs.verifyRole(samplePayload, incorrectRole)).toEqual(false);
  });
});
