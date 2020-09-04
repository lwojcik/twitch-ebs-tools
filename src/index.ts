import jwt from 'jsonwebtoken';

import { TwitchToken, TwitchPayload, TwitchChannelId, TwitchRole, TwitchRoles } from './types';

/**
 * Twitch EBS toolset class.
 *
 * Methods with names starting with 'validate' require class initialization.
 * Methods with names starting with 'verify' are static methods and do not require
 * TwitchEbsTools class to be initialized.
 *
 */

export = class TwitchEbsTools {
  readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  /**
   * Validates Twitch token using jsonwebtoken.verify() method
   *
   * @param token - Twitch token as string
   * @returns Decoded payload for valid token or JSONWebTokenError for invalid token
   *
   */
  validateToken(token: TwitchToken): TwitchPayload | Error {
    try {
      return <TwitchPayload>jwt.verify(token, Buffer.from(this.secret, 'base64'));
    } catch (error) {
      throw new Error('invalid signature');
    }
  }

  /**
   * Verifies if decoded Twitch payload contains valid Twitch channel id
   *
   * @param payload - decoded Twitch payload as JSON object
   * @param channelId - Twitch channel id to verify
   * @returns true for Twitch payload containing valid channel id,
   * false for invalid or no channel id
   *
   */
  static verifyChannelId(payload: TwitchPayload, channelId: TwitchChannelId): boolean {
    if (payload && payload.channel_id) {
      return payload.channel_id === channelId.toString();
    }
    return false;
  }

  /**
   * Verifies if decoded Twitch payload has expiry date in the future
   *
   * @param payload - decoded Twitch payload as JSON object
   * @returns true for Twitch payload containing valid expiry date,
   * false for expired payload
   *
   */
  static verifyTokenNotExpired(payload: TwitchPayload): boolean {
    const epochTimeNowInSeconds = <Date>(<any>Math.round(new Date().getTime() / 1000));
    if (payload && payload.exp) {
      return epochTimeNowInSeconds <= payload.exp;
    }
    return false;
  }

  /**
   * Verifies if decoded Twitch payload has correct Twitch role
   *
   * @param payload - decoded Twitch payload as JSON object
   * @param role - Twitch role to verify (e.g. "broadcaster")
   * @returns true for Twitch payload containing valid role,
   * false for payload with no or invalid role
   *
   */
  static verifyRole(payload: TwitchPayload, role: TwitchRole): boolean {
    if (payload && payload.role) {
      return payload.role === role;
    }
    return false;
  }

  /**
   * Verifies if decoded Twitch payload has correct channel id and Twitch role
   *
   * @param payload - decoded Twitch payload as JSON object
   * @param channelId - Twitch channel id to verify
   * @param role - Twitch role to verify (e.g. "broadcaster")
   * @returns true for Twitch payload containing valid role and channel id,
   * false for invalid payloads
   *
   */
  static verifyChannelIdAndRole(
    payload: TwitchPayload,
    channelId: TwitchChannelId,
    role: TwitchRole,
  ): boolean {
    return this.verifyChannelId(payload, channelId) && this.verifyRole(payload, role);
  }

  /**
   * Verifies if decoded Twitch payload contains 'broadcaster' role
   *
   * @param payload - decoded Twitch payload as JSON object
   * @returns true for Twitch payload containing 'broadcaster' role, false for invalid payloads
   *
   */
  static verifyBroadcaster(payload: TwitchPayload): boolean {
    return this.verifyRole(payload, 'broadcaster');
  }

  /**
   * Verifies if decoded Twitch payload contains 'broadcaster' or 'viewer' role
   *
   * @param payload - decoded Twitch payload as JSON object
   * @returns true for Twitch payload containing 'broadcaster' or 'viewer' role,
   * false for invalid payloads
   *
   */
  static verifyViewerOrBroadcaster(payload: TwitchPayload): boolean {
    return this.verifyRole(payload, 'broadcaster') || this.verifyRole(payload, 'viewer');
  }

  /**
   * Validates token and checks channel id, expiry date and role.
   *
   * @param token - Twitch token as string
   * @returns true for valid Twitch payload containing correct channel id and role,
   * false for invalid payloads
   *
   */
  validatePermission(
    token: TwitchToken,
    channelId: TwitchChannelId,
    roles: TwitchRole | TwitchRoles,
    acceptExpired?: boolean,
  ): boolean {
    try {
      const payload = <TwitchPayload>this.validateToken(token);
      const verifiedRole = Array.isArray(roles)
        ? roles.some(role => TwitchEbsTools.verifyRole(payload, role as TwitchRole))
        : TwitchEbsTools.verifyRole(payload, roles as TwitchRole);

      return (
        TwitchEbsTools.verifyChannelId(payload, channelId) &&
        (acceptExpired ? true : TwitchEbsTools.verifyTokenNotExpired(payload)) &&
        verifiedRole
      );
    } catch (error) {
      return false;
    }
  }
};
