import path from 'path';

import fs from 'fs';

import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const resultStylish = readFile('result-stylish.txt').trim();

const resultPlain = readFile('result-plain.txt').trim();

const resultJsonStringify = readFile('result-json-stringify.txt').trim();

describe('difference calculator for diffirent format', () => {
  test('json format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(genDiff(file1, file2, 'stylish')).toBe(resultStylish);
    expect(genDiff(file1, file2, 'plain')).toBe(resultPlain);
    expect(genDiff(file1, file2, 'json')).toBe(resultJsonStringify);
  });
  test('yml format', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    expect(genDiff(file1, file2, 'stylish')).toBe(resultStylish);
    expect(genDiff(file1, file2, 'plain')).toBe(resultPlain);
    expect(genDiff(file1, file2, 'json')).toBe(resultJsonStringify);
  });
});
