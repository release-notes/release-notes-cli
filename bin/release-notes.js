#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const Program = require('../lib/Program');
const ConvertCommand = require('../lib/commands/ConvertCommand');
const HelpCommand = require('../lib/commands/HelpCommand');
const InitCommand = require('../lib/commands/InitCommand');
const ValidateCommand = require('../lib/commands/ValidateCommand');
const VersionCommand = require('../lib/commands/VersionCommand');

const program = new Program(yargs);

program
  .setUsage('$0 <command> [args]')
  .addCommand(new VersionCommand())
  .addCommand(new HelpCommand())
  .addCommand(new InitCommand())
  .addCommand(new ConvertCommand())
  .addCommand(new ValidateCommand())
  .run()
;
