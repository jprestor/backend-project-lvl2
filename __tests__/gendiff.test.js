import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src';

const __dirname = dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let result;

beforeAll(() => {
  result = readFile('result.txt');
});

test('gendiff json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});

test('gendiff yml', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
