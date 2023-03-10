import { PermissionsBitField } from "discord.js";

export const generalPermissions: Map<string, bigint> = new Map([
  ["CREATE_INSTANT_INVITE", PermissionsBitField.Flags.CreateInstantInvite],
  ["KICK_MEMBERS", PermissionsBitField.Flags.KickMembers],
  ["BAN_MEMBERS", PermissionsBitField.Flags.BanMembers],
  ["ADMINISTRATOR", PermissionsBitField.Flags.Administrator],
  ["MANAGE_CHANNELS", PermissionsBitField.Flags.ManageChannels],
  ["MANAGE_GUILD", PermissionsBitField.Flags.ManageGuild],
  ["ADD_REACTIONS", PermissionsBitField.Flags.AddReactions],
  ["VIEW_AUDIT_LOG", PermissionsBitField.Flags.ViewAuditLog],
  ["PRIORITY_SPEAKER", PermissionsBitField.Flags.PrioritySpeaker],
  ["STREAM", PermissionsBitField.Flags.Stream],
  ["VIEW_CHANNEL", PermissionsBitField.Flags.ViewChannel],
  ["SEND_MESSAGES", PermissionsBitField.Flags.SendMessages],
  ["SEND_TTS_MESSAGES", PermissionsBitField.Flags.SendTTSMessages],
  ["MANAGE_MESSAGES", PermissionsBitField.Flags.ManageMessages],
  ["EMBED_LINKS", PermissionsBitField.Flags.EmbedLinks],
  ["ATTACH_FILES", PermissionsBitField.Flags.AttachFiles],
  ["READ_MESSAGE_HISTORY", PermissionsBitField.Flags.ReadMessageHistory],
  ["MENTION_EVERYONE", PermissionsBitField.Flags.MentionEveryone],
  ["USE_EXTERNAL_EMOJIS", PermissionsBitField.Flags.UseExternalEmojis],
  ["VIEW_GUILD_INSIGHTS", PermissionsBitField.Flags.ViewGuildInsights],
  ["CONNECT", PermissionsBitField.Flags.Connect],
  ["SPEAK", PermissionsBitField.Flags.Speak],
  ["MUTE_MEMBERS", PermissionsBitField.Flags.MuteMembers],
  ["DEAFEN_MEMBERS", PermissionsBitField.Flags.DeafenMembers],
  ["MOVE_MEMBERS", PermissionsBitField.Flags.MoveMembers],
  ["USE_VAD", PermissionsBitField.Flags.UseVAD],
  ["CHANGE_NICKNAME", PermissionsBitField.Flags.ChangeNickname],
  ["MANAGE_NICKNAMES", PermissionsBitField.Flags.ManageNicknames],
  ["MANAGE_ROLES", PermissionsBitField.Flags.ManageRoles],
  ["MANAGE_WEBHOOKS", PermissionsBitField.Flags.ManageWebhooks],
  [
    "MANAGE_EMOJIS_AND_STICKERS",
    PermissionsBitField.Flags.ManageEmojisAndStickers,
  ],
  [
    "USE_APPLICATION_COMMANDS",
    PermissionsBitField.Flags.UseApplicationCommands,
  ],
  ["REQUEST_TO_SPEAK", PermissionsBitField.Flags.RequestToSpeak],
  ["MANAGE_EVENTS", PermissionsBitField.Flags.ManageEvents],
  ["MANAGE_THREADS", PermissionsBitField.Flags.ManageThreads],
  ["CREATE_PUBLIC_THREADS", PermissionsBitField.Flags.CreatePublicThreads],
  ["CREATE_PRIVATE_THREADS", PermissionsBitField.Flags.CreatePrivateThreads],
  ["USE_EXTERNAL_STICKERS", PermissionsBitField.Flags.UseExternalStickers],
  ["SEND_MESSAGES_IN_THREADS", PermissionsBitField.Flags.SendMessagesInThreads],
  ["USE_EMBEDDED_ACTIVITIES", PermissionsBitField.Flags.UseEmbeddedActivities],
  ["MODERATE_MEMBERS", PermissionsBitField.Flags.ModerateMembers],
]);

export const voicePermissionsEnable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: true }],
  ["MANAGE_CHANNELS", { ManageChannels: true }],
  ["ADD_REACTIONS", { AddReactions: true }],
  ["PRIORITY_SPEAKER", { PrioritySpeaker: true }],
  ["STREAM", { Stream: true }],
  ["VIEW_CHANNEL", { ViewChannel: true }],
  ["SEND_MESSAGES", { SendMessages: true }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: true }],
  ["MANAGE_MESSAGES", { ManageMessages: true }],
  ["EMBED_LINKS", { EmbedLinks: true }],
  ["ATTACH_FILES", { AttachFiles: true }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: true }],
  ["MENTION_EVERYONE", { MentionEveryone: true }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: true }],
  ["CONNECT", { Connect: true }],
  ["SPEAK", { Speak: true }],
  ["MUTE_MEMBERS", { MuteMembers: true }],
  ["DEAFEN_MEMBERS", { DeafenMembers: true }],
  ["MOVE_MEMBERS", { MoveMembers: true }],
  ["USE_VAD", { UseVAD: true }],
  ["MANAGE_ROLES", { ManageRoles: true }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: true }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: true }],
  ["MANAGE_EVENTS", { ManageEvents: true }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: true }],
  ["USE_EMBEDDED_ACTIVITIES", { UseEmbeddedActivities: true }],
]);

export const voicePermissionsDisable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: false }],
  ["MANAGE_CHANNELS", { ManageChannels: false }],
  ["ADD_REACTIONS", { AddReactions: false }],
  ["PRIORITY_SPEAKER", { PrioritySpeaker: false }],
  ["STREAM", { Stream: false }],
  ["VIEW_CHANNEL", { ViewChannel: false }],
  ["SEND_MESSAGES", { SendMessages: false }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: false }],
  ["MANAGE_MESSAGES", { ManageMessages: false }],
  ["EMBED_LINKS", { EmbedLinks: false }],
  ["ATTACH_FILES", { AttachFiles: false }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: false }],
  ["MENTION_EVERYONE", { MentionEveryone: false }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: false }],
  ["CONNECT", { Connect: false }],
  ["SPEAK", { Speak: false }],
  ["MUTE_MEMBERS", { MuteMembers: false }],
  ["DEAFEN_MEMBERS", { DeafenMembers: false }],
  ["MOVE_MEMBERS", { MoveMembers: false }],
  ["USE_VAD", { UseVAD: false }],
  ["MANAGE_ROLES", { ManageRoles: false }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: false }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: false }],
  ["MANAGE_EVENTS", { ManageEvents: false }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: false }],
  ["USE_EMBEDDED_ACTIVITIES", { UseEmbeddedActivities: false }],
]);

export const textPermissionsEnable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: true }],
  ["MANAGE_CHANNELS", { ManageChannels: true }],
  ["ADD_REACTIONS", { AddReactions: true }],
  ["VIEW_CHANNEL", { ViewChannel: true }],
  ["SEND_MESSAGES", { SendMessages: true }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: true }],
  ["MANAGE_MESSAGES", { ManageMessages: true }],
  ["EMBED_LINKS", { EmbedLinks: true }],
  ["ATTACH_FILES", { AttachFiles: true }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: true }],
  ["MENTION_EVERYONE", { MentionEveryone: true }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: true }],
  ["MANAGE_ROLES", { ManageRoles: true }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: true }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: true }],
  ["MANAGE_THREADS", { ManageThreads: true }],
  ["CREATE_PUBLIC_THREADS", { CreatePublicThreads: true }],
  ["CREATE_PRIVATE_THREADS", { CreatePrivateThreads: true }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: true }],
  ["SEND_MESSAGES_IN_THREADS", { SendMessagesInThreads: true }],
]);

export const textPermissionsDisable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: false }],
  ["MANAGE_CHANNELS", { ManageChannels: false }],
  ["ADD_REACTIONS", { AddReactions: false }],
  ["VIEW_CHANNEL", { ViewChannel: false }],
  ["SEND_MESSAGES", { SendMessages: false }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: false }],
  ["MANAGE_MESSAGES", { ManageMessages: false }],
  ["EMBED_LINKS", { EmbedLinks: false }],
  ["ATTACH_FILES", { AttachFiles: false }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: false }],
  ["MENTION_EVERYONE", { MentionEveryone: false }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: false }],
  ["MANAGE_ROLES", { ManageRoles: false }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: false }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: false }],
  ["MANAGE_THREADS", { ManageThreads: false }],
  ["CREATE_PUBLIC_THREADS", { CreatePublicThreads: false }],
  ["CREATE_PRIVATE_THREADS", { CreatePrivateThreads: false }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: false }],
  ["SEND_MESSAGES_IN_THREADS", { SendMessagesInThreads: false }],
]);

export const stagePermissionsEnable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: true }],
  ["MANAGE_CHANNELS", { ManageChannels: true }],
  ["ADD_REACTIONS", { AddReactions: true }],
  ["STREAM", { Stream: true }],
  ["VIEW_CHANNEL", { ViewChannel: true }],
  ["SEND_MESSAGES", { SendMessages: true }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: true }],
  ["MANAGE_MESSAGES", { ManageMessages: true }],
  ["EMBED_LINKS", { EmbedLinks: true }],
  ["ATTACH_FILES", { AttachFiles: true }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: true }],
  ["MENTION_EVERYONE", { MentionEveryone: true }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: true }],
  ["CONNECT", { Connect: true }],
  ["MUTE_MEMBERS", { MuteMembers: true }],
  ["MOVE_MEMBERS", { MoveMembers: true }],
  ["MANAGE_ROLES", { ManageRoles: true }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: true }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: true }],
  ["REQUEST_TO_SPEAK", { RequestToSpeak: true }],
  ["MANAGE_EVENTS", { ManageEvents: true }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: true }],
]);

export const stagePermissionsDisable: Map<string, any> = new Map([
  ["CREATE_INSTANT_INVITE", { CreateInstantInvite: false }],
  ["MANAGE_CHANNELS", { ManageChannels: false }],
  ["ADD_REACTIONS", { AddReactions: false }],
  ["STREAM", { Stream: false }],
  ["VIEW_CHANNEL", { ViewChannel: false }],
  ["SEND_MESSAGES", { SendMessages: false }],
  ["SEND_TTS_MESSAGES", { SendTTSMessages: false }],
  ["MANAGE_MESSAGES", { ManageMessages: false }],
  ["EMBED_LINKS", { EmbedLinks: false }],
  ["ATTACH_FILES", { AttachFiles: false }],
  ["READ_MESSAGE_HISTORY", { ReadMessageHistory: false }],
  ["MENTION_EVERYONE", { MentionEveryone: false }],
  ["USE_EXTERNAL_EMOJIS", { UseExternalEmojis: false }],
  ["CONNECT", { Connect: false }],
  ["MUTE_MEMBERS", { MuteMembers: false }],
  ["MOVE_MEMBERS", { MoveMembers: false }],
  ["MANAGE_ROLES", { ManageRoles: false }],
  ["MANAGE_WEBHOOKS", { ManageWebhooks: false }],
  ["USE_APPLICATION_COMMANDS", { UseApplicationCommands: false }],
  ["REQUEST_TO_SPEAK", { RequestToSpeak: false }],
  ["MANAGE_EVENTS", { ManageEvents: false }],
  ["USE_EXTERNAL_STICKERS", { UseExternalStickers: false }],
]);
