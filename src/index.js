import path from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (filepath) => readFileSync(path.resolve(cwd(), filepath), 'utf-8');

const getSortedKeysUnion = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.sortBy(_.union(keys1, keys2));
};

const calcStatus = (value1, value2, key) => {
  if (!_.has(value1, key)) {
    return 'added';
  }
  if (!_.has(value2, key)) {
    return 'removed';
  }
  if (!_.isEqual(value1[key], value2[key])) {
    return 'updated';
  }
  return 'unchanged';
};

const makeDiffTree = (data1, data2) => {
  const keys = getSortedKeysUnion(data1, data2);

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const isNested = _.isObject(value1) && _.isObject(value2);

    return {
      key,
      status: isNested ? 'nested' : calcStatus(data1, data2, key),
      ...(isNested && { children: makeDiffTree(value1, value2) }),
      ...(!isNested && { values: [value1, value2] }),
    };
  });
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parse(readFile(filepath1), path.extname(filepath1));
  const obj2 = parse(readFile(filepath2), path.extname(filepath2));
  const diffTree = makeDiffTree(obj1, obj2);

  return format(diffTree, formatter);
};

export default genDiff;
