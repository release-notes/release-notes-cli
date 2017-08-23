'use strict';

class AbstractConverter {
  convert(releaseNotes, options = {}) {
    throw new Error(
      'Abstract method AbstractConverter.convert must be implemented in derivatives.'
    );
  }
}

module.exports = AbstractConverter;
