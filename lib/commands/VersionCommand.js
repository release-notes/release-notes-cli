'use strict';

const AbstractCommand = require('../AbstractCommand');

class VersionCommand extends AbstractCommand {
  register(yargs) {
    super.register(yargs);

    yargs
      .version()
      .alias('version', 'v');
  }
}

module.exports = VersionCommand;
