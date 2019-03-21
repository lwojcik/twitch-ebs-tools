import jwt from 'jsonwebtoken';
import TwitchEbs from '../../src';
import { TwitchToken } from '../../src/types';

describe('validatePermission() method', () => {
  test('should return false for invalid token', () => {
    const invalidToken = 'invalid token' as TwitchToken;

    expect(
      new TwitchEbs('irrelevant secret').validatePermission(invalidToken, '123', 'viewer'),
    ).toEqual(false);
  });

  test('should return false for invalid channelId', () => {
    const invalidChannelId = '999';

    const sampleToken = jwt.sign(
      {
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const sampleRole = 'viewer';

    expect(
      new TwitchEbs('some secret').validatePermission(sampleToken, invalidChannelId, sampleRole),
    ).toEqual(false);
  });

  test('should return false for invalid role', () => {
    const sampleChannelId = '999';

    const sampleToken = jwt.sign(
      {
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const invalidRole = 'broadcaster';

    expect(
      new TwitchEbs('some secret').validatePermission(sampleToken, sampleChannelId, invalidRole),
    ).toEqual(false);
  });

  test('should return false for invalid array of roles', () => {
    const sampleChannelId = '999';

    const sampleToken = jwt.sign(
      {
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const invalidRoles = ['not_broadcaster', 'not_viewer'];

    expect(
      new TwitchEbs('some secret').validatePermission(sampleToken, sampleChannelId, invalidRoles),
    ).toEqual(false);
  });

  test('should return true for valid token, valid channel id and valid role', () => {
    const sampleToken = jwt.sign(
      {
        exp: new Date().setTime(new Date().getTime() + 60 * 60 * 1000),
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const sampleChannelId = '123';

    const validRoles = ['viewer', 'broadcaster'];

    expect(
      new TwitchEbs('some secret').validatePermission(sampleToken, sampleChannelId, validRoles),
    ).toEqual(true);
  });
});
