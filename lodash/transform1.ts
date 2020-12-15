import j from 'jscodeshift/src/core'
import { Transform } from 'jscodeshift';

export const parser = 'ts';

function createImport(name: string) {
  return j.importDeclaration.from({
    specifiers: [j.importDefaultSpecifier(j.identifier(name))],
    source: j.literal(`lodash/${name}`),
  });
}

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const lodashFunctions: string[] = [];

  // find functions, _.filter -> filter
  root.find(j.MemberExpression, {
    object: { name: '_' },
    property: { type: j.Identifier.toString() },
  })
    .forEach((path) => {
      const property = path.value.property as j.Identifier;
      lodashFunctions.push(property.name);
      j(path).replaceWith(j.identifier(property.name));
    });

  // Change imports
  root
    .find(j.ImportDeclaration, { source: { value: 'lodash' } })
    .replaceWith(path => lodashFunctions.sort().map(name => createImport(name)));

  return root.toSource();
}

export default transform;
