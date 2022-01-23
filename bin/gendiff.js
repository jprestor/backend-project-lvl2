#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import getDiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]')
  .action((filepath1, filepath2, options) => {
    console.log(getDiff(filepath1, filepath2, options.format));
  });

program.parse();
