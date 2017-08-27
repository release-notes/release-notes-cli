'use strict';

const { run, assert } = require('./util');
const { releaseNotes1 } = require('./assets');

describe('validate', () => {
  it('should succeed when no file is specified and ./release-notes.yml exists', () => {
    return assert.isFulfilled(run('validate'));
  });
  it('should succeed when valid file is specified', () => {
    return assert.isFulfilled(run(`validate ${releaseNotes1.yamlPath}`));
  });
  /* it('should fail when no file is specified but file is invalid', () => {
    return assert.isFulfilled(run('validate'));
  }); */
  it('should fail when non existent file is specified', () => {
    return assert.isRejected(run('validate ./release-notes-invalid.yml'));
  });
  it('should fail when invalid file is specified', () => {
    return assert.isRejected(run('validate ./test/assets/release-notes1.json'));
  });
  it('should fail when invalid yaml file is specified', () => {
    return assert.isRejected(run('validate ./test/assets/invalid-yaml.yml'));
  });
  it('should fail when release-notes.yml doesn\'t respect schema', () => {
    return assert.isRejected(run('validate ./test/assets/invalid-schema.yml'));
  });
});
