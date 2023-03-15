import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const getPath = (path, key) => [...path, key];

const formatPlain = (data, path = []) => {
  const result = data.map((node) => {
    switch (node.type) {
      case 'nestead':
        return formatPlain(node.children, getPath(path, node.key));
      case 'added':
        return `Property '${getPath(path, node.key).join('.')}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${getPath(path, node.key).join('.')}' was removed`;
      case 'changed':
        return `Property '${getPath(path, node.key).join('.')}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      default: {
        return null;
      }
    }
  });
  const iter = result.filter(Boolean).join('\n');
  return iter;
};

export default formatPlain;
