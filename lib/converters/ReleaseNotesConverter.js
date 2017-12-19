/* eslint class-methods-use-this: ["error", { "exceptMethods": ["convert"] }] */

'use strict';

const AbstractConverter = require('./AbstractConverter');
const ReleaseNotesWriter = require('@release-notes/node/lib/ReleaseNotesWriter');

class ReleaseNotesConverter extends AbstractConverter {
  convert(releaseNotes/* , options = {} */) {
    return ReleaseNotesWriter.dumpReleaseNotes(releaseNotes);
  }
}

module.exports = ReleaseNotesConverter;
