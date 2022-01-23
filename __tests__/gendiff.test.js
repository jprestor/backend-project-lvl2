import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src';

const __dirname = dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const file1 = JSON.parse(readFile('file1.json'));
  const file2 = JSON.parse(readFile('file2.json'));
  const result = readFile('result.txt');

  expect(genDiff(file1, file2)).toEqual(result);
});
