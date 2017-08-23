/* eslint class-methods-use-this: ["error", { "exceptMethods": ["convert"] }] */

'use strict';

const AbstractConverter = require('./AbstractConverter');

class JsonConverter extends AbstractConverter {
  convert(releaseNotes/* , options = {} */) {
    return JSON.stringify(releaseNotes.toJSON());
  }
}

module.exports = JsonConverter;
