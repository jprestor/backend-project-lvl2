import _ from 'lodash';

const getSortedKeysUnion = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.sortBy(_.union(keys1, keys2));
};

const makeDiffTree = (data1, data2) => {
  const keys = getSortedKeysUnion(data1, data2);

  return keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        status: 'nested',
        children: makeDiffTree(value1, value2),
      };
    }
    if (!_.has(data1, key)) {
      return {
        key,
        status: 'added',
        values: [value1, value2],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        status: 'removed',
        values: [value1, value2],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        status: 'updated',
        values: [value1, value2],
      };
    }
    return {
      key,
      status: 'unchanged',
      values: [value1, value2],
    };
  });
};

export default makeDiffTree;
