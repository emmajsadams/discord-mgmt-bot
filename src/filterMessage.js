var escapeRegExp = require('lodash.escaperegexp');

function createRegex(string) {
  return new RegExp(escapeRegExp(string))
}

const messageFilterDict = {
  'torrents': {
    regex: createRegex('magnet:?xt'),
    message: 'Please do not post torrent links. Torrent links are often in violation of US copyright law and it takes too much effort for moderators to ensure there are no laws being broken.'
  }
}

const filterMessage = (messageContent) => {
  for (const filterName in messageFilterDict) {
    const filter = messageFilterDict[filterName];
    if (filter.regex.test(messageContent)) {
      return filter.message;
    }
  }

  return null;
};

module.exports = filterMessage
