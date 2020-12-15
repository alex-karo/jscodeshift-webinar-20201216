import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

export function renameMethodsWithAlises(root: Collection<File>, funcNames: Record<string, string>): void {
  root.find(j.MemberExpression, {
    object: { name: '_' },
    property: { type: j.Identifier.toString() },
  })
    .forEach((path) => {
      const property = path.value.property as j.Identifier;
      const newName = funcNames[property.name];
      j(path).replaceWith(j.identifier(newName));
    });
}
