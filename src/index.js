import _ from 'lodash';

import path from 'path';

import fs from 'fs';

import parse from './parsers.js';

const sortByKeys = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = _.union(key1, key2);
  const sortKeys = _.sortBy(keys);
  return sortKeys;
};

const getDiff = (obj1, obj2) => {
  const keys = sortByKeys(obj1, obj2);
  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`  + ${key}: ${obj2[key]}`);
    } else if (!Object.hasOwn(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);
    } else {
      acc.push(`    ${key}: ${obj1[key]}`);
    }
    return acc;
  }, []);
  const out = ['{', ...result, '}'].join('\n');
  return out;
};

const buildPath = (filepath) => path.resolve(filepath);

const getFormatFile = (filepath) => path.extname(filepath).replace('.', '');

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf8'), getFormatFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(buildPath(filepath1));
  const data2 = getData(buildPath(filepath2));
  return getDiff(data1, data2);
};

export default genDiff;
