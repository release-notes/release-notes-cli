#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const Program = require('../lib/Program');
const HelpCommand = require('../lib/commands/HelpCommand');
const VersionCommand = require('../lib/commands/VersionCommand');


const program = new Program(yargs);

program
  .setUsage('$0 <command> [args]')
  .addCommand(new VersionCommand())
  .addCommand(new HelpCommand())
  .run()
;
