import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import getFormat from './formatters/index.js';

const buildPath = (filepath) => path.resolve(process.cwd(), filepath);

const getFileFormat = (filepath) => path.extname(filepath).replace('.', '');

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf8'), getFileFormat(filepath));

const genDiff = (filepath1, filepath2, output) => {
  const data1 = getData(buildPath(filepath1));
  const data2 = getData(buildPath(filepath2));
  const tree = buildTree(data1, data2);
  return getFormat(tree, output);
};

export default genDiff;
