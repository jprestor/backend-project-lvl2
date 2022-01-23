import _ from 'lodash';

const genDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union([...keys1, ...keys2]));

  const iter = (currentValue, depth) => {
    if (!_.isArray(currentValue)) {
      return currentValue;
    }

    const indent = ' '.repeat(depth * 2);

    const lines = keys.map((key) => {
      const value1 = file1[key];
      const value2 = file2[key];

      if (typeof file1[key] === 'undefined') {
        return `${indent}+ ${key}: ${value2}`;
      }
      if (typeof file2[key] === 'undefined') {
        return `${indent}- ${key}: ${value1}`;
      }
      if (file1[key] !== file2[key]) {
        return `${indent}- ${key}: ${value1}\n${indent}+ ${key}: ${value2}`;
      }

      return `${indent}  ${key}: ${value1}`;
    });

    return ['{', ...lines, '}'].join('\n');
  };

  const result = iter(keys, 1);
  return result;
};

export default genDiff;
