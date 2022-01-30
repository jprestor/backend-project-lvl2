# backend-project-lvl2 (Difference Calculator)

[![Maintainability](https://api.codeclimate.com/v1/badges/c853fa48f46b29e9bd07/maintainability)](https://codeclimate.com/github/jprestor/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c853fa48f46b29e9bd07/test_coverage)](https://codeclimate.com/github/jprestor/backend-project-lvl2/test_coverage)
[![Hexlet Workflow Status](https://github.com/jprestor/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/jprestor/backend-project-lvl2/actions/workflows/hexlet-check.yml)
[![My Workflow Status](https://github.com/jprestor/backend-project-lvl2/actions/workflows/my-workflow.yml/badge.svg)](https://github.com/jprestor/backend-project-lvl2/actions/workflows/my-workflow.yml)

Difference Calculator is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example [http://www.jsondiff.com](http://www.jsondiff.com) . A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

Utility Features:

- Support for different input formats: yaml, json
- Generating a report in the form of plain text, stylish and json

## Requirements

Node.js version 14 and above

## Setup

```sh
make install
```

```sh
npm link
```

## Run

```sh
gendiff filepath1.json filepath2.json
```

#### Help

```sh
gendiff -h
```

## Demo

Check diff between json files
[![asciicast](https://asciinema.org/a/JfaxUdJRtqZnhb2Tgv1v5TBgD.svg)](https://asciinema.org/a/umVDTWErphvYv0FmRwI7TC6PM)

Check diff between yaml files
[![asciicast](https://asciinema.org/a/JfaxUdJRtqZnhb2Tgv1v5TBgD.svg)](https://asciinema.org/a/feQrmi6l6DlhfFn7PUFmi2f8j)

Check diff between nested objects
[![asciicast](https://asciinema.org/a/cusbXENyAjolsn8bAyfRC2tiM.svg)](https://asciinema.org/a/cusbXENyAjolsn8bAyfRC2tiM)

Check diff in plain text format
[![asciicast](https://asciinema.org/a/wNSobVA3yMJbTcQ8pFqBacwRo.svg)](https://asciinema.org/a/wNSobVA3yMJbTcQ8pFqBacwRo)

Check diff in json format
[![asciicast](https://asciinema.org/a/G15WATt1fvG8WR61eaRSWW16v.svg)](https://asciinema.org/a/G15WATt1fvG8WR61eaRSWW16v)
