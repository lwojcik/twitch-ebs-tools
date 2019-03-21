import TwitchEbsTools from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyChannelIdAndRole() static method', () => {
  test('returns true for correct channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const sampleRole = 'broadcaster';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, sampleChannelId, sampleRole),
    ).toEqual(true);
  });

  test('returns false for correct channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const incorrectRole = 'viewer';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, sampleChannelId, incorrectRole),
    ).toEqual(false);
  });

  test('returns false for incorrect channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const sampleRole = 'broadcaster';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, incorrectChannelId, sampleRole),
    ).toEqual(false);
  });

  test('returns false for incorrect channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const incorrectRole = 'viewer';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, incorrectChannelId, incorrectRole),
    ).toEqual(false);
  });
});
