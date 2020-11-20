import _ from 'lodash'

// TODO: do I need this?
function createRegex(string) {
	return new RegExp(_.escapeRegExp(string))
}

// TODO: add enum for specifying the type of filter,
// TODO: support for nsfw or not
// TODO: support for channel id
// TODO: support for cleanContent or not??? only using content right now
interface MessageFilters {
	[messageFilterName: string]: {
		regex: RegExp
		message: string
	}
}

const MESSAGE_FILTERS: MessageFilters = {
	torrents: {
		regex: createRegex('magnet:?xt'),
		message:
			'Please do not post torrent links. Torrent links are often in violation of US copyright law and it takes too much effort for moderators to ensure there are no laws being broken.',
	},
}

export default MESSAGE_FILTERS
