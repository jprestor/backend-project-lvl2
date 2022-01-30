import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../index';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  const resultStylish = readFile('result-stylish.txt');
  expect(genDiff(filepath1, filepath2)).toEqual(resultStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
});

test('gendiff plain format', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');
  const resultPlain = readFile('result-plain.txt');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
});

test('gendiff json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const resultJson = readFile('result-json.json');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJson);
});
