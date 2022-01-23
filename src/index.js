import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const readFile = (filepath) => readFileSync(path.resolve(cwd(), filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(readFile(filepath1), path.extname(filepath1));
  const obj2 = parse(readFile(filepath2), path.extname(filepath1));
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const iter = (currentValue, depth) => {
    if (!_.isArray(currentValue)) {
      return currentValue;
    }

    const indent = ' '.repeat(depth * 2);

    const lines = keys.map((key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (typeof obj1[key] === 'undefined') {
        return `${indent}+ ${key}: ${value2}`;
      }
      if (typeof obj2[key] === 'undefined') {
        return `${indent}- ${key}: ${value1}`;
      }
      if (obj1[key] !== obj2[key]) {
        return `${indent}- ${key}: ${value1}\n${indent}+ ${key}: ${value2}`;
      }

      return `${indent}  ${key}: ${value1}`;
    });

    return ['{', ...lines, '}'].join('\n');
  };

  return iter(keys, 1);
};

export default genDiff;
