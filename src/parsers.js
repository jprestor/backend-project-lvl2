import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(data);

    case '.yml':
    case '.yaml':
      return yaml.load(data);

    default:
      throw new Error(`Unknown file extension: ${fileExt}`);
  }
};

export default parse;
