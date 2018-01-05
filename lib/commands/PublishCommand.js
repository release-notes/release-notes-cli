'use strict';

const AbstractCommand = require('../AbstractCommand');
const ApiClient = require('../ApiClient');

class PublishCommand extends AbstractCommand {
  /**
   * @param {Yargs} yargs
   */
  register(yargs) {
    super.register(yargs);

    yargs.command({
      command: 'publish [file]',
      desc: 'Publish release notes file to the hub (https://release-notes.com)',
      builder: subcommand => subcommand
        .option({
          file: {
            alias: 'f',
            description: 'Path to release-notes.yml file',
            requiresArg: true,
            default: process.env.RELEASE_NOTES_FILE || './release-notes.yml',
            type: 'string',
          },
          token: {
            alias: 't',
            description: 'Auth token see (https://release-notes.com/auth-tokens)',
            requiresArg: true,
            default: process.env.RELEASE_NOTES_TOKEN,
            type: 'string',
          },
          scope: {
            alias: 's',
            description: 'The scope of the published release notes',
            requiresArg: true,
            default: process.env.RELEASE_NOTES_SCOPE,
            type: 'string',
          },
          name: {
            alias: 'n',
            description: 'The name of the published release notes',
            requiresArg: true,
            default: process.env.RELEASE_NOTES_NAME,
            type: 'string',
          },
        }),
      handler: argv => this.runCommand(argv),
    });
  }

  async runCommand(argv) {
    const apiClientConfig = {};

    if (process.env.RELEASE_NOTES_API_BASE_URL) {
      apiClientConfig.baseUrl = process.env.RELEASE_NOTES_API_BASE_URL;
    }

    const apiClient = new ApiClient(argv.token, apiClientConfig);

    apiClient.publish({
      file: argv.file,
      scope: argv.scope,
      name: argv.name,
    }).then(({ scope, name, latestVersion }) => {
      console.info(`Successfully published @${scope}/${name}#${latestVersion}`);
      process.exit(0);
    }).catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
  }
}

module.exports = PublishCommand;
