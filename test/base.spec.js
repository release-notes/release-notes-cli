'use strict';

const { run, assert } = require('./util');

describe('commands', () => {
  it('should fail when invalid command is specified', () => {
    return assert.isRejected(run('conv1'));
  });
});
