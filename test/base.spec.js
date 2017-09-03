'use strict';


const { run, assert } = require('./util');

describe('commands', () => {
  it.skip('should fail when invalid command is specified', () => {
    return assert.isRejected(run('conv1'));
  });
});

