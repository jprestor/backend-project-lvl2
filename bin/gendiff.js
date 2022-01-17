#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import getDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]')
  .action((filepath1, filepath2, options, command) => {
    const file1 = JSON.parse(readFileSync(path.resolve(cwd(), filepath1), 'utf-8'));
    const file2 = JSON.parse(readFileSync(path.resolve(cwd(), filepath2), 'utf-8'));

    getDiff(file1, file2, options.format);
  });

program.parse();
