'use strict';

const AbstractCommand = require('../AbstractCommand');
const ReleaseNotesModel = require('@release-notes/node/lib/models/ReleaseNotes');
const ReleaseNotesWriter = require('@release-notes/node/lib/ReleaseNotesWriter');

class InitCommand extends AbstractCommand {
  constructor() {
    super();

    this.releaseNotesWriter = new ReleaseNotesWriter();
  }

  /**
   * @param {Yargs} yargs
   */
  register(yargs) {
    super.register(yargs);

    yargs.command({
      command: 'init [file]',
      desc: 'Initialize release notes file',
      builder: subcommand => subcommand
        .option({
          file: {
            alias: 'f',
            description: 'Path to release-notes.yml file',
            requiresArg: true,
            default: './release-notes.yml',
            type: 'string',
          },
          title: {
            alias: 't',
            description: 'Title of the project',
            requiresArg: true,
            default: 'Release Notes of something awesome',
            type: 'string',
          },
          description: {
            alias: 'd',
            description: 'About the project',
            requiresArg: false,
            type: 'array',
          },
        }),
      handler: argv => this.runCommand(argv),
    });
  }

  runCommand(argv) {
    const releaseNotes = new ReleaseNotesModel({
      title: argv.title,
      description: (argv.description || []).join('\n'),
    });

    this.releaseNotesWriter.writeReleaseNotesFile(argv.file, releaseNotes, (err) => {
      if (err) {
        process.stdout.write(`${err.message}\n`);

        process.exit(1);
      }

      process.exit(0);
    });
  }
}

module.exports = InitCommand;
