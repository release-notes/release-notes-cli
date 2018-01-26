'use strict';

const fs = require('fs');
const AbstractCommand = require('../AbstractCommand');
const JsonConverter = require('../converters/JsonConverter');
const MarkdownConverter = require('../converters/MarkdownConverter');
const ReleaseNotesConverter = require('../converters/ReleaseNotesConverter');
const ReleaseNotesReader = require('@release-notes/node/lib/ReleaseNotesLoader');
const changelogParser = require('@release-notes/changelog-parser');

class ConvertCommand extends AbstractCommand {
  constructor() {
    super();

    this.releaseNotesLoader = new ReleaseNotesReader();
    this.converters = {
      json: JsonConverter,
      'release-notes': ReleaseNotesConverter,
      yml: ReleaseNotesConverter,
      changelog: MarkdownConverter,
      md: MarkdownConverter,
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
      builder: subcommand => subcommand
        .option({
          file: {
            alias: 'f',
            description: 'Path to release-notes.yml or CHANGELOG.md file',
            requiresArg: true,
            default: './release-notes.yml',
            type: 'string',
          },
          type: {
            alias: 't',
            description: 'the converter to use',
            required: true,
            requiresArg: true,
            choices: Object.keys(this.converters),
          },
        }),
      handler: argv => this.runCommand(argv),
    });
  }

  runCommand(argv) {
    const file = argv.file;

    if (file.endsWith('.md')) {
      const releaseNotes = ConvertCommand.parseMarkdownChangelog(file);
      const converter = new (this.converters[argv.type])();

      process.stdout.write(converter.convert(releaseNotes));

      process.stdout.write('\n');
      process.exit(0);
    } else if (file.endsWith('.yml') || file.endsWith('.yaml')) {
      this.releaseNotesLoader.readReleaseNotesFile(argv.file, (err, releaseNotes) => {
        if (err) {
          process.stdout.write(`${err.message}\n`);

          process.exit(1);
        }

        const converter = new (this.converters[argv.type])();
        process.stdout.write(converter.convert(releaseNotes));

        process.stdout.write('\n');
        process.exit(0);
      });
    } else {
      process.stdout.write('Only .yml, .yaml and .md file are currently supported.');
      process.exit(1);
    }
  }

  static parseMarkdownChangelog(file) {
    const content = fs.readFileSync(file).toString();

    return changelogParser.parse(content);
  }
}

module.exports = ConvertCommand;
