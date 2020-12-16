import { Transform } from 'jscodeshift';
import j from 'jscodeshift/src/core';

const transform: Transform = (file, api, options) => {
  const funcArgs = options.args.split(',');
  const { path: filePath, source } = file;
  const root = j(source);
  let functionName;

  root.find(j.ImportDeclaration)
    .filter(({ value }) => {
      return typeof value.source.value === 'string'
        && value.source.value.includes('/lib/format');
    })
    .forEach(path => {
      const specifier = j(path).find(j.ImportSpecifier, {imported: { name: 'format' }}).paths()[0];
      functionName = specifier.value.local.name;
    });

  if (!functionName) {
    root.toSource();
  }

  root.find(j.CallExpression, { callee: { name: functionName } })
    .forEach(path => {
      const formatArgs = path.value.arguments;
      const objectParam = j.objectExpression(
        formatArgs.map((expression, idx) => {
          if (j.SpreadElement.check(expression)) {
            throw Error('Spread not supported');
          }
          return j.objectProperty.from({
            key: j.identifier(funcArgs[idx]),
            value: expression,
          })
        })
      );
      const newFunc = j.callExpression(path.value.callee, [objectParam]);
      j(path).replaceWith(newFunc);
    })

  return root.toSource();
}

export default transform;
