import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import parse from './parse.js';
import makeDiffTree from './makeDiffTree.js';
import format from './formatters/index.js';

const readFile = (filepath) => readFileSync(path.resolve(cwd(), filepath), 'utf-8');

const getFileFormat = (filepath1) => path.extname(filepath1).slice(1);

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parse(readFile(filepath1), getFileFormat(filepath1));
  const obj2 = parse(readFile(filepath2), getFileFormat(filepath2));
  const diffTree = makeDiffTree(obj1, obj2);

  return format(diffTree, formatter);
};

export default genDiff;
