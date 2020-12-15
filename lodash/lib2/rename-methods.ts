import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

export function renameMethods(root: Collection<File>): void {
  root.find(j.MemberExpression, {
    object: { name: '_' },
    property: { type: j.Identifier.toString() },
  })
    .forEach((path) => {
      const property = path.value.property as j.Identifier;
      j(path).replaceWith(j.identifier(property.name));
    });
}
