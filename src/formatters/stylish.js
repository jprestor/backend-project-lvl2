import _ from 'lodash';

const spacesCount = 4;
const markerOffset = 2;

const renderValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const indentSize = spacesCount * depth;
  const indent = ' '.repeat(indentSize);
  const closeIndentSize = indentSize - spacesCount;
  const closeIndent = ' '.repeat(closeIndentSize);

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${renderValue(val, depth + 1)}`,
  );

  return ['{', ...lines, `${closeIndent}}`].join('\n');
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const indentSize = spacesCount * depth;
    const indent = ' '.repeat(indentSize);
    const closeIndent = ' '.repeat(indentSize - spacesCount);
    const diffIndent = ' '.repeat(indentSize - markerOffset);
    const newDepth = depth + 1;

    const lines = tree.map((node) => {
      const { status, key, children, values } = node;

      switch (status) {
        case 'added':
          return `${diffIndent}+ ${key}: ${renderValue(values[1], newDepth)}`;

        case 'deleted':
          return `${diffIndent}- ${key}: ${renderValue(values[0], newDepth)}`;

        case 'changed':
          return `${diffIndent}- ${key}: ${renderValue(
            values[0],
            newDepth,
          )}\n${diffIndent}+ ${key}: ${renderValue(values[1], newDepth)}`;

        case 'unchanged':
          return `${diffIndent}  ${key}: ${renderValue(values[0], newDepth)}`;

        case 'nested':
          return `${indent}${key}: ${iter(children, newDepth)}`;

        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

    return ['{', ...lines, `${closeIndent}}`].join('\n');
  };

  return iter(diffTree, 1);
};

export default stylish;
