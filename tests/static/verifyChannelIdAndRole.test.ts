import TwitchEbs from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyChannelIdAndRole() static method', () => {
  test('returns true for correct channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const sampleRole = 'broadcaster';

    expect(TwitchEbs.verifyChannelIdAndRole(samplePayload, sampleChannelId, sampleRole)).toEqual(
      true,
    );
  });

  test('returns false for correct channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const incorrectRole = 'viewer';

    expect(TwitchEbs.verifyChannelIdAndRole(samplePayload, sampleChannelId, incorrectRole)).toEqual(
      false,
    );
  });

  test('returns false for incorrect channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const sampleRole = 'broadcaster';

    expect(TwitchEbs.verifyChannelIdAndRole(samplePayload, incorrectChannelId, sampleRole)).toEqual(
      false,
    );
  });

  test('returns false for incorrect channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const incorrectRole = 'viewer';

    expect(
      TwitchEbs.verifyChannelIdAndRole(samplePayload, incorrectChannelId, incorrectRole),
    ).toEqual(false);
  });
});
