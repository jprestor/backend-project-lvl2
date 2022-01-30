const replacer = (key, value) => {
  if (value === undefined) {
    return 'undefined';
  }
  return value;
};

const json = (diffTree) => JSON.stringify(diffTree, replacer);

export default json;
