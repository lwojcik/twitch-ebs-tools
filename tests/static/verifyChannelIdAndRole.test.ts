import { TwitchEbsTools } from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyChannelIdAndRole() static method', () => {
  it('returns true for correct channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const sampleRole = 'broadcaster';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, sampleChannelId, sampleRole),
    ).toBe(true);
  });

  it('returns false for correct channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const sampleChannelId = '123';
    const incorrectRole = 'viewer';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, sampleChannelId, incorrectRole),
    ).toBe(false);
  });

  it('returns false for incorrect channel id and correct role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const sampleRole = 'broadcaster';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, incorrectChannelId, sampleRole),
    ).toBe(false);
  });

  it('returns false for incorrect channel id and incorrect role', () => {
    const samplePayload = {
      channel_id: '123',
      role: 'broadcaster',
    } as TwitchPayload;
    const incorrectChannelId = '456';
    const incorrectRole = 'viewer';

    expect(
      TwitchEbsTools.verifyChannelIdAndRole(samplePayload, incorrectChannelId, incorrectRole),
    ).toBe(false);
  });
});
