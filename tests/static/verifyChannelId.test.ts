import TwitchEbsTools from '../../src';
import { TwitchPayload } from '../../src/types.d';

describe('verifyChannelId() static method', () => {
  it('returns true for correct channel id', () => {
    const samplePayload = {
      channel_id: '123',
    } as TwitchPayload;
    const sampleChannelId = '123';

    expect(TwitchEbsTools.verifyChannelId(samplePayload, sampleChannelId)).toBe(true);
  });

  it('returns false for incorrect channel id', () => {
    const samplePayload = {
      channel_id: '123',
    } as TwitchPayload;
    const incorrectChannelId = 456;

    expect(TwitchEbsTools.verifyChannelId(samplePayload, incorrectChannelId)).toBe(false);
  });

  it('returns false for invalid payload', () => {
    const invalidPayload = {} as TwitchPayload;
    const irrelevantChannelId = '789';

    expect(TwitchEbsTools.verifyChannelId(invalidPayload, irrelevantChannelId)).toBe(false);
  });
});
