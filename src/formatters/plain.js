import _ from 'lodash';

const renderValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (!_.isObject(value)) {
    return String(value);
  }

  return '[complex value]';
};

const plain = (diffTree) => {
  const iter = (tree, parentKey) => tree
    .filter(({ status }) => status !== 'unchanged')
    .flatMap((node) => {
      const {
        status, key, children, values,
      } = node;

      switch (status) {
        case 'added':
          return `${parentKey}${key}' was added with value: ${renderValue(values[1])}`;

        case 'removed':
          return `${parentKey}${key}' was removed`;

        case 'updated':
          return `${parentKey}${key}' was updated. From ${renderValue(
            values[0],
          )} to ${renderValue(values[1])}`;

        case 'nested':
          return iter(children, `${parentKey}${key}.`);

        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

  return iter(diffTree, '')
    .map((line) => `Property '${line}`)
    .join('\n');
};

export default plain;
