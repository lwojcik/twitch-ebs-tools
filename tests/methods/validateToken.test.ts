import TwitchEbs from '../../src';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

describe('validateToken() method', () => {
  test('should return payload for correctly signed token', () => {
    const sampleSecret = 'some secret';
    const samplePayload = { foo: 'bar' };
    const validToken = jwt.sign(samplePayload, Buffer.from(sampleSecret, 'base64'), {
      noTimestamp: true,
    });

    expect(new TwitchEbs(sampleSecret).validateToken(validToken)).toEqual(samplePayload);
  });

  test('should throw JsonWebTokenError for incorrect token', () => {
    const sampleSecret = 'some secret';
    const incorrectToken = 'incorrect token';
    expect(() => {
      return new TwitchEbs(sampleSecret).validateToken(incorrectToken);
    }).toThrow(JsonWebTokenError);
  });
});
