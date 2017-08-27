'use strict';

const childProcess = require('child_process');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { assert } = chai;

function run(args) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`./bin/release-notes.js ${args}`, {
      encoding: 'utf8',
    }, (error, stdout) => {
      if (error) return reject(error);
      return resolve(stdout);
    });
  });
}

module.exports = {
  run,
  assert,
};
