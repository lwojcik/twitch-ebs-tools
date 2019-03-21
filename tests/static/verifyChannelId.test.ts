import TwitchEbsTools from '../../src';
import { TwitchPayload } from '../../src/types';

describe('verifyChannelId() static method', () => {
  test('returns true for correct channel id', () => {
    const samplePayload = {
      channel_id: '123',
    } as TwitchPayload;
    const sampleChannelId = '123';

    expect(TwitchEbsTools.verifyChannelId(samplePayload, sampleChannelId)).toEqual(true);
  });

  test('returns false for incorrect channel id', () => {
    const samplePayload = {
      channel_id: '123',
    } as TwitchPayload;
    const incorrectChannelId = 456;

    expect(TwitchEbsTools.verifyChannelId(samplePayload, incorrectChannelId)).toEqual(false);
  });

  test('returns false for invalid payload', () => {
    const invalidPayload = {} as TwitchPayload;
    const irrelevantChannelId = '789';

    expect(TwitchEbsTools.verifyChannelId(invalidPayload, irrelevantChannelId)).toEqual(false);
  });
});
