export type TwitchPayload = {
  readonly exp: Date;
  readonly opaque_user_id: string;
  readonly channel_id: string;
  readonly role: string;
  readonly is_unliked: boolean;
  readonly pubsub_perms: {
    readonly listen?: ReadonlyArray<string>;
    readonly send?: ReadonlyArray<string>;
  };
};

export type TwitchToken = string;

export type TwitchChannelId = string | number;

export type TwitchRole = 'broadcaster' | 'viewer' | string;

export type TwitchRoles = ReadonlyArray<TwitchRole>;
