import DiscordClient from './discordClient'
import sendMessage from './sendMessage'
import {
  GuildMember,
  Snowflake,
  Message,
  TextChannel,
  MessageEmbed,
  MessageOptions,
  User,
} from 'discord.js'
import {
  FRIENDS_GUILD_ID,
  MOD_LOG_CHANNEL_ID,
  PUBLIC_LOG_CHANNEL_ID,
  ADMIN_LOG_CHANNEL_ID,
} from './ids'
import {
  LOGGING_CHANNELS,
  ADMIN_CHANNELS,
  IGNORED_CHANNELS,
} from './config/channels'
import getRelativeTime from './getRelativeTime'
import getMessageLink from './getMessageLink'

enum EventName {
  MessageCreate = 'message',
  MessageDelete = 'messageDelete',
  MessageUpdate = 'messageUpdate',
  GuildMemberAdd = 'guildMemberAdd',
  GuildMemberRemove = 'guildMemberRemove',
}

const EVENT_EMBED_PROPERTIES = {
  [EventName.MessageCreate]: {
    color: 'GREEN',
    name: '🎆Message Created!🎆',
  },
  [EventName.MessageUpdate]: {
    color: 'YELLOW',
    name: '👷‍♀️Message Update👷‍♀️',
  },
  [EventName.MessageDelete]: {
    color: 'RED',
    name: '💢Message Delete💢',
  },
  [EventName.GuildMemberAdd]: {
    color: 'GREEN',
    name: '🎆Guild Member Add🎆',
  },
  [EventName.GuildMemberRemove]: {
    color: 'RED',
    name: '💢Guild Member Remove💢',
  },
}

enum ChannelsFilterType {
  Allow,
  Deny,
}

async function sendLogForGuildMember(
  member: GuildMember,
  eventName: EventName,
  loggingChannelId: string,
): Promise<Message | null> {
  const loggingChannel = (await member.guild.channels.cache
    .get(loggingChannelId)
    .fetch()) as TextChannel
  const embedProperties = EVENT_EMBED_PROPERTIES[eventName]
  const messageEmbed = new MessageEmbed()
    .addFields(
      {
        name: 'Event Type',
        value: embedProperties.name,
      },
      {
        name: 'Member Tag',
        value: member.user.tag,
      },
      {
        name: 'Member Id',
        value: member.user.tag,
      },
      {
        name: 'Member Created',
        value: getRelativeTime(new Date(member.user.createdTimestamp)),
      },
      {
        name: 'Member Created Timestamp',
        value: member.user.createdTimestamp,
      },
    )
    .setColor(embedProperties.color)

  const messageOptions: MessageOptions = {
    embed: messageEmbed,
    disableMentions: 'all',
  }

  return await loggingChannel.send('', messageOptions)
}

function setupGuildMemberDeleteEventHandler(loggingChannelId: Snowflake): void {
  DiscordClient.on(
    EventName.GuildMemberRemove.toString(),
    async (member: GuildMember) => {
      await sendLogForGuildMember(
        member,
        EventName.GuildMemberRemove,
        loggingChannelId,
      )
    },
  )
}

function setupGuildMemberAddEventHandler(loggingChannelId: Snowflake): void {
  DiscordClient.on(
    EventName.GuildMemberAdd.toString(),
    async (member: GuildMember) => {
      await sendLogForGuildMember(
        member,
        EventName.GuildMemberAdd,
        loggingChannelId,
      )
    },
  )
}

function setupMemberHandlers(loggingChannelId: Snowflake) {
  setupGuildMemberDeleteEventHandler(loggingChannelId)
  setupGuildMemberAddEventHandler(loggingChannelId)
}

// Return true if the event should not be logged, false if the event should be logged
function filterChannel(
  channelId: Snowflake,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): boolean {
  if (channelsFilterType === ChannelsFilterType.Allow) {
    return !channels.includes(channelId)
  }

  return channels.includes(channelId)
}

async function sendLogForMessage(
  message: Message,
  eventName: EventName,
  loggingChannelId: string,
  sendAttachments: boolean,
): Promise<Message | null> {
  const loggingChannel = (await message.guild.channels.cache
    .get(loggingChannelId)
    .fetch()) as TextChannel

  const embedProperties = EVENT_EMBED_PROPERTIES[eventName]
  const messageEmbed = new MessageEmbed()
    .addFields(
      {
        name: 'Event Type',
        value: embedProperties.name,
      },
      {
        name: 'Member Tag',
        value: message.author.tag,
      },
      {
        name: 'Member Id',
        value: message.author.id,
      },
      {
        name: 'Channel Name',
        value: `<#${message.channel.id}>`,
      },
      {
        name: 'Message Link',
        value: getMessageLink(message),
      },
    )
    .setColor(embedProperties.color)

  const messageOptions: MessageOptions = {
    embed: messageEmbed,
    disableMentions: 'all',
  }

  if (sendAttachments) {
    messageOptions['files'] = message.attachments.map((attachment) => ({
      attachment: attachment.url,
      name: attachment.name,
    }))
  }

  // TODO: rather than try catch, check attachment size for exceeding limit then just upload to s3
  // // TODO: handle errors for attachments too large and upload to sr
  // // import getSignedS3Url from './getSignedS3Url'
  try {
    return await loggingChannel.send(message.content, messageOptions)
  } catch (error) {
    if (sendAttachments) {
      messageOptions['files'] = []
      messageEmbed.addField(
        'Attachment',
        'too large to upload to discord. TODO upload to s3 and post link here',
      )

      return await loggingChannel.send(message.content, messageOptions)
    }
    // TODO: figure out what to do in the case of a message send failing not for too large of an upload? is this even possible?
  }

  // TODO: figure out what to do in this case
  return Promise.resolve(null)
}

function setupMessageDeleteHandler(
  loggingChannelId: Snowflake,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): void {
  DiscordClient.on(
    EventName.MessageDelete,
    async (message: Message): Promise<void> => {
      if (filterChannel(message.channel.id, channels, channelsFilterType)) {
        return
      }

      // NOTE: attachments are not added because they will be removed after the message is deleted
      await sendLogForMessage(
        message,
        EventName.MessageDelete,
        loggingChannelId,
        false,
      )
    },
  )
}

function setupMessageCreateHandler(
  loggingChannelId: Snowflake,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): void {
  DiscordClient.on(
    EventName.MessageCreate,
    async (message: Message): Promise<void> => {
      if (filterChannel(message.channel.id, channels, channelsFilterType)) {
        return
      }

      await sendLogForMessage(
        message,
        EventName.MessageCreate,
        loggingChannelId,
        true,
      )
    },
  )
}

function setupMessageUpdateHandler(
  loggingChannelId: Snowflake,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): void {
  DiscordClient.on(
    EventName.MessageUpdate,
    async (oldMessage: Message, newMessage: Message): Promise<void> => {
      if (filterChannel(newMessage.channel.id, channels, channelsFilterType)) {
        return
      }

      // NOTE: attachments are not added because they cannot be updated after the message is created and the message created
      // log includes the attachments
      await sendLogForMessage(
        newMessage,
        EventName.MessageUpdate,
        loggingChannelId,
        false,
      )
    },
  )
}

function setupMessageHandlers(
  loggingChannelId: Snowflake,
  channels: Snowflake[],
  channelsFilterType: ChannelsFilterType,
): void {
  setupMessageCreateHandler(loggingChannelId, channels, channelsFilterType)
  setupMessageDeleteHandler(loggingChannelId, channels, channelsFilterType)
  setupMessageUpdateHandler(loggingChannelId, channels, channelsFilterType)
}

// TODO: Create a fallback for too much text? need to test it out
export default function setupEventHandlersForLogging(): void {
  setupMemberHandlers(PUBLIC_LOG_CHANNEL_ID)
  setupMessageHandlers(
    MOD_LOG_CHANNEL_ID,
    LOGGING_CHANNELS.concat(ADMIN_CHANNELS, IGNORED_CHANNELS),
    ChannelsFilterType.Deny,
  )
  setupMessageHandlers(
    ADMIN_LOG_CHANNEL_ID,
    ADMIN_CHANNELS,
    ChannelsFilterType.Allow,
  )
}
