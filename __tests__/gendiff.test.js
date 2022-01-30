import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = readFile('result-stylish.txt');
  resultPlain = readFile('result-plain.txt');
  resultJson = readFile('result-json.json');
});

test('gendiff stylish format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(resultStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
});

test('gendiff plain format', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
});

test('gendiff json format', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(resultJson);
});
