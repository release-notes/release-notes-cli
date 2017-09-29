# Release Notes CLI

[![Subscribe to Release Notes](https://release-notes.com/badges/v1.svg)](https://release-notes.com/@release-notes/release-notes-cli)
[![NPM Package](https://img.shields.io/npm/v/@release-notes/cli.svg)](https://www.npmjs.com/package/@release-notes/cli)
[![Build Status](https://travis-ci.org/release-notes/release-notes-cli.svg?branch=master)](https://travis-ci.org/release-notes/release-notes-cli)
[![MIT license](https://img.shields.io/github/license/release-notes/release-notes-cli.svg)](LICENSE)


**Title**   | Release Notes CLI
:-----------|:---------------------------
**Specification** | [Release Notes Draft 0.2.0](https://github.com/release-notes/release-notes-spec/blob/0.2.0/README.md)
**Author**  | [Alrik Zachert](https://github.com/alrik)
**License** | MIT

The goal of this repository is to provide cli tools for working with
release notes following the [Release Notes Specification](https://github.com/release-notes/release-notes-spec).

## Install

`$ npm i -g release-notes/cli`

## Usage

### Show Version

`$ release-notes -v|--version`

### Print help

`$ release-notes -h|--help`

### Validate Release Notes

In order to validate a release notes file run `$ release-notes validate path_to_release_notes.yml`

### Convert Release Notes

The following command converts the `release-notes.yml` file in the cwd to json and writes it to stdout.

`$ release-notes convert -t json`

In order to print all released versions defined in a release-notes file run:

`$ bin/release-notes.js convert -t json | jq .releases[].version`

---

### LICENSE

The files in this archive are released under MIT license.
You can find a copy of this license in [LICENSE](LICENSE).
