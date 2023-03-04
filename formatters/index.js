import formatPlain from './plain.js';

import formatStylish from './stylish.js';

const getFormat = (data, output = 'stylish') => {
  switch (output) {
    case 'plain':
      return formatPlain(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`Unknown format: ${output}`);
  }
};
export default getFormat;
