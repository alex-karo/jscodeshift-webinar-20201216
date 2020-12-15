import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

export function getFunctionsWithAliases(root: Collection<File>): Record<string, string> {
  const lodashFunctions = {};

  root.find(j.MemberExpression, {
    object: { name: '_' },
    property: { type: j.Identifier.toString() },
  })
    .forEach((path) => {
      const property = path.value.property as j.Identifier;
      lodashFunctions[property.name] = property.name;
    });

  root
    .find(j.ImportDeclaration)
    .filter(path => path.value?.source?.value.toString().includes('lodash'))
    .forEach(path => {
      path.value.specifiers.forEach(specifier => {
        if (specifier.local.name === '_') {
          return;
        }
        if (j.ImportSpecifier.check(specifier)) {
          lodashFunctions[specifier.imported.name] = specifier.local.name;
        } else if (j.ImportDefaultSpecifier.check(specifier)) {
          const [, originalName] = (path.value.source.value as string).split('/');
          lodashFunctions[originalName] = specifier.local.name;
        }
      });
    });
  return lodashFunctions;
}
