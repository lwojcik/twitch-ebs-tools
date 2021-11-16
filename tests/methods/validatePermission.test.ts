import jwt from 'jsonwebtoken';
import { TwitchEbsTools } from '../../src';
import { TwitchToken } from '../../src/types';

describe('validatePermission() method', () => {
  it('should return false for invalid token', () => {
    const invalidToken = 'invalid token' as TwitchToken;

    expect(
      new TwitchEbsTools('irrelevant secret').validatePermission(invalidToken, '123', 'viewer'),
    ).toBe(false);
  });

  it('should return false for invalid channelId', () => {
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
      new TwitchEbsTools('some secret').validatePermission(
        sampleToken,
        invalidChannelId,
        sampleRole,
      ),
    ).toBe(false);
  });

  it('should return false for invalid role', () => {
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
      new TwitchEbsTools('some secret').validatePermission(
        sampleToken,
        sampleChannelId,
        invalidRole,
      ),
    ).toBe(false);
  });

  it('should return false for invalid array of roles', () => {
    const sampleChannelId = '999';

    const sampleToken = jwt.sign(
      {
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const invalidRoles = ['not_broadcaster', 'not_viewer'] as ReadonlyArray<string>;

    expect(
      new TwitchEbsTools('some secret').validatePermission(
        sampleToken,
        sampleChannelId,
        invalidRoles,
      ),
    ).toBe(false);
  });

  it('should return true for valid token, valid channel id and valid role', () => {
    const sampleToken = jwt.sign(
      {
        exp: new Date().setTime(new Date().getTime() + 60 * 60 * 1000),
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const sampleChannelId = '123';

    const validRoles = ['viewer', 'broadcaster'] as ReadonlyArray<string>;

    expect(
      new TwitchEbsTools('some secret').validatePermission(
        sampleToken,
        sampleChannelId,
        validRoles,
      ),
    ).toBe(true);
  });

  it('should return true for expired token when acceptExpired is set to true', () => {
    const sampleToken = jwt.sign(
      {
        exp: new Date().setTime(new Date().getTime() - 60 * 60 * 1000),
        channel_id: '123',
        role: 'viewer',
      },
      Buffer.from('some secret', 'base64'),
    ) as TwitchToken;

    const sampleChannelId = '123';

    const validRoles = ['viewer', 'broadcaster'] as ReadonlyArray<string>;

    expect(
      new TwitchEbsTools('some secret').validatePermission(
        sampleToken,
        sampleChannelId,
        validRoles,
        true,
      ),
    ).toBe(true);
  });
});
