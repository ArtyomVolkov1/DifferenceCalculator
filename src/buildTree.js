import _ from 'lodash';

const sortByKeys = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const keys = _.union(key1, key2);
  const sortKeys = _.sortBy(keys);
  return sortKeys;
};

const buildTree = (obj1, obj2) => {
  const keys = sortByKeys(obj1, obj2);
  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, value: obj2[key], type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: obj1[key], type: 'deleted' };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = buildTree(obj1[key], obj2[key]);
      return { key, children, type: 'nestead' };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, value: obj1[key], type: 'unchanged' };
    }
    return {
      key,
      value1: obj1[key],
      value2: obj2[key],
      type: 'changed',
    };
  });
  return result;
};
export default buildTree;
