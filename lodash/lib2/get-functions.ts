import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

export function getFunctions(root: Collection<File>): string[] {
  const lodashFunctions = new Set<string>();

  root.find(j.MemberExpression, {
    object: { name: '_' },
    property: { type: j.Identifier.toString() },
  })
    .forEach((path) => {
      const property = path.value.property as j.Identifier;
      lodashFunctions.add(property.name);
    });

  root
    .find(j.ImportDeclaration, {
      source: { value: 'lodash' },
    })
    .forEach(path => {
      path.value.specifiers.forEach(specifier => {
        if (j.ImportSpecifier.check(specifier)) {
          lodashFunctions.add(specifier.imported.name);
        }
      });
    });
  return Array.from(lodashFunctions);
}
