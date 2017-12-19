'use strict';

const { run, assert } = require('./util');
const { releaseNotes1 } = require('./assets');

describe('convert', () => {
  describe('subcommands', () => {
    it('should fail when type is omitted', () => {
      return assert.isRejected(run('convert'));
    });
    it('should support type alias -t', () => {
      return assert.isFulfilled(run('convert -t json'));
    });
    it('should fail when non existent file is specified', () => {
      return assert.isRejected(run('convert ./test/assets/release-notes-invalid.yml -t json'));
    });
    it('should fail when invalid file is specified', () => {
      return assert.isRejected(run('convert ./test/assets/release-notes1.json -t json'));
    });
    it('should fail when unknown type is specified', () => {
      return assert.isRejected(run('convert --type josn'));
    });
    it('should fail when wrong type sub-command is specified', () => {
      return assert.isRejected(run('convert --typo json'));
    });
  });

  describe('json', () => {
    it('should convert to JSON and write to stdout', () => {
      const json = run(`convert ${releaseNotes1.yamlPath} -t json`).then(text => JSON.parse(text));
      return assert.eventually.deepEqual(json, releaseNotes1.jsonData);
    });
  });

  describe('md', () => {
    it('should convert to JSON and write to stdout', () => {
      const json = run(`convert ${releaseNotes1.mdPath} -t json`).then(text => JSON.parse(text));
      return assert.eventually.deepEqual(json, releaseNotes1.jsonData);
    });
  });
});
