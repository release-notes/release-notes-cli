'use strict';

class Program {
  constructor(yargs) {
    this.yargs = yargs;
  }

  setUsage(usage) {
    this.yargs.usage(usage);

    return this;
  }

  addCommand(command) {
    command.register(this.yargs);

    return this;
  }

  run(argv) {
    this.yargs.parse(argv || process.argv);

    return this;
  }
}

module.exports = Program;
