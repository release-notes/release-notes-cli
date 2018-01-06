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

### Initialize release notes

If you want to initialize a new `release-notes.yml` file:

```bash
$ release-notes init --title 'Release notes of an awesome project.' \
    --description 'You can pass multiple lines of description' \
    -d 'This is a second line of description'
```

You could also convert an existing CHANGELOG.md file into a `release-notes.yml` definition:

`$ release-notes convert -t release-notes CHANGELOG.md > release-notes.yml` 

### Validate Release Notes

In order to validate a release notes file run `$ release-notes validate path_to_release_notes.yml`

### Convert Release Notes

The following command converts the `release-notes.yml` file in the cwd to json and writes it to stdout.

`$ release-notes convert -t json`

In order to print all released versions defined in a release-notes file run:

`$ release-notes convert -t json | jq .releases[].version`

The convert command can also read markdown files like _CHANGELOG.md_ or _HISTORY.md_.

`$ release-notes convert -t json CHANGELOG.md` 

How to convert a CHANGELOG.md to a release-notes.yml file?

`$ release-notes convert -t release-notes CHANGELOG.md > release-notes.yml` 

### Publish Release Notes

In order to publish some release notes to the release notes hub run:

```bash
$ release-notes publish \
    --scope my-user-name \
    --name some-package-name \
    --token PMxU6hEiLQPdoGkKy8rij1qsgrQmplk5gvWdJWubrNg= \
    [[--file] ./release-notes.yml]
```
This would publish the content of your ./release-notes.yml definition to https://release-notes.com/@my-user-name/some-package-name.

You can also pass the parameters via environment variables, which may be handy.

Parameter  | Environment variable | Description
:----------|:---------------------|:-----------
--scope, -s | RELEASE_NOTES_SCOPE | Your release-notes hub username
--name, -n | RELEASE_NOTES_NAME | Your release notes handle (only numbers, letters and dashes)
--file, -f | RELEASE_NOTES_FILE | Path to your release notes definition (default _./release-notes.yml_)
--token, -t | RELEASE_NOTES_TOKEN | Your release-notes api token see (https://release-notes.com/auth-tokens)

---

### LICENSE

The files in this archive are released under MIT license.
You can find a copy of this license in [LICENSE](LICENSE).
