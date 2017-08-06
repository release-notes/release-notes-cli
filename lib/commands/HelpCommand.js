'use strict';

const AbstractCommand = require('../AbstractCommand');

class HelpCommand extends AbstractCommand {
  register(yargs) {
    super.register(yargs);

    yargs
      .help()
      .alias('help', 'h');
  }
}

module.exports = HelpCommand;
