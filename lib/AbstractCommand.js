'use strict';

class AbstractCommand {
  register(yargs) {
    this.yargs = yargs;
  }
}

module.exports = AbstractCommand;
