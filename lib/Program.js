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
    this.yargs.demandCommand();
    this.yargs.strict();
    this.yargs.parse((argv || process.argv).slice(2));

    return this;
  }
}

module.exports = Program;
