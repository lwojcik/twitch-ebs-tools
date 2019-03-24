# twitch-ebs-tools

![npm (latest)](https://img.shields.io/npm/v/twitch-ebs-tools/latest.svg)
[![Travis Build Status](https://travis-ci.org/lukemnet/twitch-ebs-tools.svg?branch=master)](https://travis-ci.org/lukemnet/twitch-ebs-tools)
[![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/17imjehmrnt1j3eg/branch/master?svg=true)](https://ci.appveyor.com/project/lwojcik/twitch-ebs-tools/branch/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/975f0ed290bbe152a5c9/maintainability)](https://codeclimate.com/github/lukemnet/twitch-ebs-tools/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/975f0ed290bbe152a5c9/test_coverage)](https://codeclimate.com/github/lukemnet/twitch-ebs-tools/test_coverage)

Useful functions for Twitch Extension Backend Services (EBS). Right now it mostly provides Twitch JWT verification methods and various validation strategies.

Primarily intended as a backend for a [Fastify plugin](https://www.npmjs.com/package/fastify-twitch-ebs-tools) for my [StarCraft II Twitch extension](https://www.twitch.tv/ext/wg56zk271bqja047pknv3pk65m0rbr-1.1.0), it can also be used as a standalone package or ported to other Node servers. Internally it uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for validating JWT tokens issued by Twitch.

## Install

```
npm install --save twitch-ebs-tools
```

## Basic usage

### Initialization

For methods starting with `validate` class initialization is needed:

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const twitchEbs = new TwitchEbsTools('twitch shared secret');
```

Methods starting with `verify` are static, as they don't rely on Twitch shared secret.

Example:

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const validChannelId = TwitchEbsTools.verifyChannelId(payload, '123456789');
// true / false
```

### validatePermission(token, channelId, roles)

Validates Twitch token by passing it to [verify](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of `jsonwebtoken`. Returns decoded Twitch payload or throws an error for invalid token.

It is the most basic method that serves as a basis for more granular strategies.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const twitchEbs = new TwitchEbsTools('twitch shared secret');

const twitchPayload = twitchEbs.validateToken(token);

console.log(twitchPayload); // decoded Twitch payload
```

### validatePermission(token, channelId, roles)

Validates whether supplied Twitch token:

* can be verified correctly as issued by Twitch (using `validateToken` method)
* contains correct channel ID
* contains correct channel role

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const twitchEbs = new TwitchEbsTools('twitch shared secret');

const permissionValid = twitchEbs.validatePermission('token', '123456789', [ 'viewer', 'broadcaster' ]);

console.log(permissionValid); // true or false
```

Parameters:

* `token` - JWT token issued by Twitch as string
* `channelId` - Twitch channel ID used for validating the Twitch token
* `role` - Twitch role(s) to be used for validating supplied token. It accepts strings (e.g. `viewer`) or arrays of string (e.g. `['viewer', 'broadcaster']`). In case of arrays one of the roles is needed to pass the validation

## Static methods

The following methods require decoded Twitch payload as one of their parameters. Payload can be supplied with `validateToken` method or passed as a variable from an outside source.

Static methods can be used pretty much out-of-the-box. They are intended to be helpful while building more detailed validation strategies and integrate easily with other tools.

### verifyChannelId(payload, channelId)

Verifies whether supplied Twitch payload contains channel ID passed as a `string` parameter. Returns `true` / `false`. If Twitch payload is malformed, it returns `false`.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const validChannelId = TwitchEbsTools.verifyChannelId(payload, '123456789');
// true / false
```

### verifyTokenNotExpired(payload)

Verifies whether supplied Twitch payload is time valid by comparing `exp` property with current server time. Twitch tokens are valid for one hour since being issued.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyChannelId(payload);
// true / false
```

### verifyRole(payload, role)

Verifies whether supplied Twitch payload contains valid role. It accepts Twitch role (`viewer` or `broadcaster`) as string.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyRole(payload, 'viewer');
// true / false
```

### verifyChannelIdAndRole(payload, channelId, role)

Verifies whether supplied Twitch payload contains valid channel id and role. It accepts Twitch channel ID as string and Twitch role (`viewer` or `broadcaster`) as string.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyChannelIdAndRole(payload, 'viewer');
// true / false
```

### verifyBroadcaster(payload)

Verifies whether supplied Twitch payload contains valid broadcaster role. This method is useful for verifying broadcaster-only routes (e.g. Twitch extension configuration sections).

Note that this only check for a Twitch `broadcaster` role and does not perform any further checks.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyBroadcaster(payload);
// true / false
```
### verifyViewerOrBroadcaster(payload)

Verifies whether supplied Twitch payload contains either `broadcaster` (Twitch channel owner) or `viewer` (channel viewer) role. This method is useful for verifying public routes (e.g. Twitch extension panels).

**Note that checking for both roles is necessary for the extensions to work correctly.** If you validate panel route against `viewer` route only, the extension will not work correctly for channel broadcaster.

Note that this only check for Twitch `broadcaster` or `viewer` roles and does not perform any further checks.

```js
const TwitchEbsTools = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyViewerOrBroadcaster(payload);
// true / false
```

## License

Licensed under MIT License. See [LICENSE](https://raw.githubusercontent.com/lukemnet/twitch-ebs-tools/master/LICENSE) for more information.