'use strict';

const { run, assert } = require('./util');

describe('commands', () => {
  it('should fail when no command is specified', () => {
    return assert.isRejected(run());
  });

  it('should fail when invalid command is specified', () => {
    return assert.isRejected(run('conv1'));
  });
});

