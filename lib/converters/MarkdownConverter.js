/* eslint class-methods-use-this: ["error", { "exceptMethods": ["convert"] }] */

'use strict';

const AbstractConverter = require('./AbstractConverter');
const ReleaseModel = require('@release-notes/node/lib/models/Release');

function pad(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
}

function ucFirst(str) {
  return str[0].toUpperCase() + str.substr(1);
}

class JsonConverter extends AbstractConverter {
  convert(releaseNotes/* , options = {} */) {
    const notes = releaseNotes.toJSON();
    let document = `# ${notes.title || 'Release Notes'}\n\n`;

    if (notes.description) {
      document += `${notes.description.replace(/\n+$/g, '\n\n')}`;
    }

    notes.releases.forEach((release) => {
      document += `## ${release.version}`;

      if (release.date) {
        const date = new Date(release.date);

        document += ` - ${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
      }

      document += '\n';

      if (release.title) {
        document += `**${release.title}**\n`;
      }

      if (release.description) {
        document += `${release.description}\n`;
      }

      ReleaseModel.MODIFICATION_TYPES.forEach((modificationType) => {
        const modifications = release[modificationType];

        if (modifications) {
          document += `### ${ucFirst(modificationType)}\n`;

          modifications.forEach((modification) => {
            if (typeof modification === 'string') {
              document += `- ${modification}\n`;
            } else if (modification.title) {
              document += `- ${modification.title}\n`;
            }
          });

          document += '\n';
        }
      });
    });

    return document;
  }
}

module.exports = JsonConverter;
