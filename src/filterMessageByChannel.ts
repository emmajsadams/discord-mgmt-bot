import { Snowflake } from 'discord.js'
import { ChannelsFilterType } from './config/channels.js'

// Return true if the event should not be logged, false if the event should be logged
export default function filterChannel(
	channelId: Snowflake,
	channels: Snowflake[],
	channelsFilterType: ChannelsFilterType,
): boolean {
	if (channelsFilterType === ChannelsFilterType.Allow) {
		return !channels.includes(channelId)
	}

	return channels.includes(channelId)
}
