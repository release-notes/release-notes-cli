'use strict';

const AbstractCommand = require('../AbstractCommand');
const ReleaseNotesReader = require('@release-notes/node/lib/ReleaseNotesLoader');

class ValidateCommand extends AbstractCommand {
  constructor() {
    super();

    this.releaseNotesLoader = new ReleaseNotesReader();
  }

  /**
   * @param {Yargs} yargs
   */
  register(yargs) {
    super.register(yargs);

    yargs.command({
      command: 'validate [file]',
      desc: 'Validate release notes file',
      builder: subcommand => subcommand.default('file', './release-notes.yml'),
      handler: argv => this.runCommand(argv),
    });
  }

  runCommand(argv) {
    this.releaseNotesLoader.readReleaseNotesFile(argv.file, (err/* , releaseNotes */) => {
      if (err) {
        process.stdout.write(`${err.message}\n`);

        process.exit(1);
      }

      process.stdout.write('OK');
      process.exit(0);
    });
  }
}

module.exports = ValidateCommand;
