/* eslint class-methods-use-this: ["error", { "exceptMethods": ["convert"] }] */

'use strict';

class AbstractConverter {
  /**
   * @abstract
   */
  convert(/* releaseNotes, options = {} */) {
    throw new Error('Abstract method AbstractConverter.convert must be implemented in derivatives.');
  }
}

module.exports = AbstractConverter;
