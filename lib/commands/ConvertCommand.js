'use strict';

const AbstractCommand = require('../AbstractCommand');
const JsonConverter = require('../converters/JsonConverter');
const ReleaseNotesReader = require('@release-notes/node/lib/ReleaseNotesLoader');

class ConvertCommand extends AbstractCommand {
  constructor() {
    super();

    this.releaseNotesLoader = new ReleaseNotesReader();
    this.converters = {
      json: JsonConverter
    };
  }

  /**
   * @param {Yargs} yargs
   */
  register(yargs) {
    super.register(yargs);

    yargs.command({
      command: 'convert [file]',
      desc: 'Convert release notes to another format',
      builder: (subcommand) => {
        subcommand.default('file', './release-notes.yml');
        //subcommand.requireArg('type');
        subcommand.option('type', {
          required: true,
          description: 'the converter to use',
          alias: 't'
        });
        subcommand.choices('type', Object.keys(this.converters));
      },
      handler: argv => this.runCommand(argv),
    });
  }

  runCommand(argv) {
    this.releaseNotesLoader.readReleaseNotesFile(argv.file, (err , releaseNotes) => {
      if (err) {
        process.stdout.write(`${err.message}\n`);

        process.exit(1);
      }

      const converter = new (this.converters[argv.type])();
      process.stdout.write(converter.convert(releaseNotes));

      process.stdout.write('\n');
      process.exit(0);
    });
  }
}

module.exports = ConvertCommand;
