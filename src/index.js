import path from 'path';

import fs from 'fs';

import parse from './parsers.js';

import buildTree from './buildTree.js';

import format from './stylish.js';

const buildPath = (filepath) => path.resolve(filepath);

const getFormatFile = (filepath) => path.extname(filepath).replace('.', '');

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf8'), getFormatFile(filepath));

const genDiff = (filepath1, filepath2, output = 'stylish') => {
  const data1 = getData(buildPath(filepath1));
  const data2 = getData(buildPath(filepath2));
  const tree = buildTree(data1, data2);
  return format(tree);
};

export default genDiff;
