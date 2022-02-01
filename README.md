# twitch-ebs-tools

[![npm (latest)](https://img.shields.io/npm/v/twitch-ebs-tools/latest.svg)](https://www.npmjs.com/package/twitch-ebs-tools)
[![Build status](https://ci.appveyor.com/api/projects/status/8esgc2oj5wkmesvm/branch/master?svg=true)](https://ci.appveyor.com/project/lwojcik/twitch-ebs-tools/branch/master)
[![codecov](https://codecov.io/gh/lukemnet/twitch-ebs-tools/branch/master/graph/badge.svg?token=AJnXZHKI3o)](https://codecov.io/gh/lukemnet/twitch-ebs-tools)

Pack of useful functions for Twitch Extension Backend Services (EBS). It provides Twitch JWT verification methods and various validation strategies.

Primarily intended as a backend for a [Fastify plugin](https://www.npmjs.com/package/fastify-twitch-ebs-tools) for my [StarCraft II Twitch extension](https://dashboard.twitch.tv/extensions/wg56zk271bqja047pknv3pk65m0rbr), it can also be used as a standalone package or ported to other Node servers. Internally it uses [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for validating JWT tokens issued by Twitch.

## Install

```
npm install twitch-ebs-tools
```

## Manual build

```bash
git clone https://github.com/lukemnet/twitch-ebs-tools.git
cd twitch-ebs-tools
npm install
npm run build
```

## Access via CDN

Twitch-ebs-tools is also available as UMD module and it can be accessed via CDN:

```js
// Using jsDelivr:
<script src="https://cdn.jsdelivr.net/npm/twitch-ebs-tools/dist/index.umd.js"></script>

// Using unpkg:
<script src="https://unpkg.com/twitch-ebs-tools/dist/index.umd.js"></script>

```

## Basic usage

### Initialization

For methods starting with `validate` class initialization is needed:

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

/**
 * Or using TypeScript / ES6 import:
 * import { TwitchEbsTools } from 'twitch-ebs-tools';
 */


const twitchEbs = new TwitchEbsTools('twitch shared secret');
```

Methods starting with `verify` are static, as they don't rely on Twitch shared secret.

Example:

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const validChannelId = TwitchEbsTools.verifyChannelId(payload, '123456789');
// true / false
```

### validateToken(token)

Validates Twitch token by passing it to [verify](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of `jsonwebtoken`. Returns decoded Twitch payload or throws an error for invalid token.

It is the most basic method that serves as a basis for more granular strategies.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const twitchEbs = new TwitchEbsTools('twitch shared secret');

const twitchPayload = twitchEbs.validateToken(token);

console.log(twitchPayload); // decoded Twitch payload
```

### validatePermission(token, channelId, roles, ignoreExpiration?)

Validates whether supplied Twitch token:

* can be verified correctly as issued by Twitch (using `validateToken` method)
* contains correct channel ID
* contains correct channel role

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const twitchEbs = new TwitchEbsTools('twitch shared secret');

const permissionValid = twitchEbs.validatePermission('token', '123456789', [ 'viewer', 'broadcaster' ]);

console.log(permissionValid); // true or false
```

Parameters:

* `token` - JWT token issued by Twitch as string
* `channelId` - Twitch channel ID used for validating the Twitch token
* `role` - Twitch role(s) to be used for validating supplied token. It accepts strings (e.g. `viewer`) or arrays of string (e.g. `['viewer', 'broadcaster']`). In case of arrays one of the roles is needed to pass the validation
* `ignoreExpiration` (optional) - when `true`, token expiration time will not be checked

## Static methods

The following methods require decoded Twitch payload as one of their parameters. Payload can be supplied with `validateToken` method or passed as a variable from an outside source.

Static methods can be used pretty much out-of-the-box. They are intended to be helpful while building more detailed validation strategies and integrate easily with other tools.

### verifyChannelId(payload, channelId)

Verifies whether supplied Twitch payload contains channel ID passed as a `string` parameter. Returns `true` / `false`. If Twitch payload is malformed, it returns `false`.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const validChannelId = TwitchEbsTools.verifyChannelId(payload, '123456789');
// true / false
```

### verifyTokenNotExpired(payload)

Verifies whether supplied Twitch payload is time valid by comparing `exp` property with current server time. Twitch tokens are valid for one hour since being issued.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const tokenNotExpired = TwitchEbsTools.verifyTokenNotExpired(payload);
// true / false
```

### verifyRole(payload, role)

Verifies whether supplied Twitch payload contains valid role. It accepts Twitch role (`viewer` or `broadcaster`) as string.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const correctRole = TwitchEbsTools.verifyRole(payload, 'viewer');
// true / false
```

### verifyChannelIdAndRole(payload, channelId, role)

Verifies whether supplied Twitch payload contains valid channel id and role. It accepts Twitch channel ID as string and Twitch role (`viewer` or `broadcaster`) as string.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const correctChannelIdAndRole = TwitchEbsTools.verifyChannelIdAndRole(payload, 'viewer');
// true / false
```

### verifyBroadcaster(payload)

Verifies whether supplied Twitch payload contains valid broadcaster role. This method is useful for verifying broadcaster-only routes (e.g. Twitch extension configuration sections).

Note that this only checks for a Twitch `broadcaster` role and does not perform any further checks.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const correctBroadcasterRole = TwitchEbsTools.verifyBroadcaster(payload);
// true / false
```
### verifyViewerOrBroadcaster(payload)

Verifies whether supplied Twitch payload contains either `broadcaster` (Twitch channel owner) or `viewer` (channel viewer) role. This method is useful for verifying public routes (e.g. Twitch extension panels).

**Note that checking for both roles is necessary for the extensions to work correctly.** If you validate panel route against `viewer` route only, the extension will not work correctly for channel broadcaster.

Note that this only checks for Twitch `broadcaster` or `viewer` roles and does not perform any further checks.

```js
const { TwitchEbsTools } = require('twitch-ebs-tools');

const payload = new TwitchEbsTools('twitch shared secret').validateToken('token');

const correctViewerOrBroadcasterRole = TwitchEbsTools.verifyViewerOrBroadcaster(payload);
// true / false
```

## Contributions

Contributions of any kind are welcome.

You can contribute to Twitch-ebs-tools by:

* submiting bug reports or feature suggestions
* improving documentation
* submitting pull requests

Before contributing be sure to read [Contributing Guidelines](https://github.com/lukemnet/twitch-ebs-tools/blob/master/CONTRIBUTING.md) and [Code of Conduct](https://github.com/lukemnet/twitch-ebs-tools/blob/master/CODE_OF_CONDUCT.md).

## Contributors

To all who contribute code, improve documentation, submit issues or feature requests - thank you for making Twitch-ebs-tools even better!

We maintain an [AUTHORS](https://github.com/lukemnet/twitch-ebs-tools/blob/master/AUTHORS) file where we keep a list of all project contributors. Please consider adding your name there with your next PR.

## License

Licensed under MIT License. See [LICENSE](https://raw.githubusercontent.com/lukemnet/twitch-ebs-tools/master/LICENSE) for more information.

## Legal

This project is not authored, affiliated or endorsed in any way by Twitch.tv.
