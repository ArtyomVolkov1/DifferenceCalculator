import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
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
      oldValue: obj1[key],
      newValue: obj2[key],
      type: 'changed',
    };
  });
  return result;
};
export default buildTree;
