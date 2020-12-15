import { Transform } from 'jscodeshift';
import j from 'jscodeshift/src/core';

const transform: Transform = (file, api, options) => {
  const funcArgs = options.args.split(',');
  const { path: filePath, source } = file;
  const root = j(source);
  let functionName;

  // TODO

  return root.toSource();
}

export default transform;
