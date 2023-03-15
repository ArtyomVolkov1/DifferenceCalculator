import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const resultStylish = readFile('result-stylish.txt');

const resultPlain = readFile('result-plain.txt');

const resultJsonStringify = readFile('result-json-stringify.txt');

const extensions = ['json', 'yml'];

describe('difference calculator for diffirent format', () => {
  test.each(extensions)('Testing %s format', (ext) => {
    const file1 = getFixturePath(`file1.${ext}`);
    const file2 = getFixturePath(`file2.${ext}`);
    expect(genDiff(file1, file2)).toBe(resultStylish);
    expect(genDiff(file1, file2, 'stylish')).toBe(resultStylish);
    expect(genDiff(file1, file2, 'plain')).toBe(resultPlain);
    expect(genDiff(file1, file2, 'json')).toBe(resultJsonStringify);
  });
});
