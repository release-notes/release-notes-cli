# Release Notes CLI

[![Subscribe to Release Notes](https://release-notes.com/badges/v1.svg)](https://release-notes.com/@release-notes/release-notes-cli)
[![NPM Package](https://img.shields.io/npm/v/@release-notes/cli.svg)](https://www.npmjs.com/package/@release-notes/cli)
[![Build Status](https://travis-ci.org/release-notes/release-notes-cli.svg?branch=master)](https://travis-ci.org/release-notes/release-notes-cli)
[![MIT license](https://img.shields.io/github/license/release-notes/release-notes-cli.svg)](LICENSE)

## About

Release Notes CLI is a console tool for automated release notes management around traditional CHANGELOG files
and our generalized [Release Notes Schema Specification](https://github.com/release-notes/release-notes-spec).

## Installation

```bash
$ yarn global add @release-notes/cli
# or
$ npm i -g @release-notes/cli
```

## Usage

```bash
$ release-notes -h

release-notes <command> [args]

Commands:
  release-notes init [file]      Initialize release notes file
  release-notes convert [file]   Convert release notes to another format
  release-notes validate [file]  Validate release notes file
  release-notes publish [file]   Publish release notes file to the hub
                                 (https://release-notes.com)

Options:
  --version, -v  Show version number
  --help, -h     Show help
```

---

### Initialize Release Notes

```bash
$ release-notes init [options] [file]
```

Parameter  | Default Value | Description
:----------|:---------------------|:-----------
--help, -h | `false` | Show help
--file, -f | `"./release-notes.yml"` | Path to the release-notes.yml file to create.
--title, -t | `"Release Notes of something awesome"` | Title of the project
--description, -d | empty | Project description. Can be passed multiple times.

#### Example

If you want to initialize a new `release-notes.yml` file in your current working directory:

```bash
$ release-notes init --title 'Release notes of an awesome project.' \
    -d 'You can pass multiple lines of description' \
    -d 'This is a second line of description'
```

---

### Convert Release Notes

```bash
$ release-notes convert [options] [file]
```

Parameter  | Default Value | Description
:----------|:---------------------|:-----------
--help, -h | `false` | Show help
--file, -f | `"./release-notes.yml"` | Path to some release-notes or CHANGELOG file
--type, -t | empty - **required** | The converter to use. Possible values are ["json", "release-notes", "yml", "changelog", "md"]

#### Convert a CHANGELOG.md file into a `release-notes.yml` definition:

```bash
$ release-notes convert -t release-notes CHANGELOG.md > release-notes.yml
```

#### Converts the `release-notes.yml` file in the cwd to json and print it to stdout:

```bash
$ release-notes convert -t json
```

#### Convert a release-notes.yml file to a CHANGELOG.md:
     
```bash
$ release-notes convert -t changelog path-to/release-notes.yml > CHANGELOG.md
```

#### Print all released versions

The following command rely on [jq](https://github.com/stedolan/jq) a json processor for the console.

```bash
# show versions of the ./release-notes.yml file
$ release-notes convert -t json | jq .releases[].version

# or of a CHANGELOG.md file
$ release-notes convert -t json path-to/CHANGELOG.md | jq .releases[].version
```

---

### Validate Release Notes

```bash
$ release-notes validate [options] [file]
```

Parameter  | Default Value | Description
:----------|:---------------------|:-----------
--help, -h | `false` | Show help
--file, -f | `"./release-notes.yml"` | Path to a release-notes.yml file.

#### Validate the release-notes.yml file in the CWD:

```bash
$ release-notes validate
```

The command will exit with code 0 on success. Any other exit code can be treated as failure.

---

### Publish Release Notes

```bash
$ release-notes publish [options] [file]
```

In order to publish some release notes to the release notes hub run:

```bash
$ release-notes publish \
    --scope my-user-name \
    --name some-package-name \
    --token PMxU6hEiLQPdoGkKy8rij1qsgrQmplk5gvWdJWubrNg= \
    ./CHANGELOG.md
```
This would publish your ./CHANGELOG.md definition to https://release-notes.com/@my-user-name/some-package-name.

You can also pass the parameters via environment variables, which may be handy.

Parameter  | Environment variable | Description
:----------|:---------------------|:-----------
--scope, -s | RELEASE_NOTES_SCOPE | Your release-notes hub username
--name, -n | RELEASE_NOTES_NAME | Your release notes handle (only numbers, letters and dashes)
--file, -f | RELEASE_NOTES_FILE | Path to a CHANGELOG.md or release-notes.yml file (default _./release-notes.yml_)
--token, -t | RELEASE_NOTES_TOKEN | Your release-notes api token see (https://release-notes.com/auth-tokens)

## Project Repositories

- [Cockpit Repository](https://github.com/release-notes/release-notes)
- [Release Notes Specification](https://github.com/release-notes/release-notes-spec)
- [Release Notes JSON-Schema Definitions](https://github.com/release-notes/release-notes-schema)
- [Release Notes Node.js Lib](https://github.com/release-notes/release-notes-node)
- [Release Notes Hub](https://github.com/release-notes/release-notes-hub)
- [Release Notes JS Coding Styles](https://github.com/release-notes/eslint-config-release-notes)

---

### LICENSE

The files in this archive are released under MIT license.
You can find a copy of this license in [LICENSE](LICENSE).
