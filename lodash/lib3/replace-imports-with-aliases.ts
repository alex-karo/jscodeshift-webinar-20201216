import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

function createImport(name: string, alias?: string) {
  return j.importDeclaration.from({
    specifiers: [j.importDefaultSpecifier(j.identifier(alias ?? name))],
    source: j.literal(`lodash/${name}`),
  });
}

export function replaceImportsWithAliases(root: Collection<File>, funcNames: Record<string, string>): void {
  const importsSet = new Set();
  root
    .find(j.ImportDeclaration)
    .filter(path => path.value?.source?.value.toString().includes('lodash'))
    .remove()
    .at(0)
    .insertBefore(() =>
      Object.entries(funcNames)
        .sort(([, n1], [, n2]) => n1 > n2 ? 1 : -1)
        .map(([name, alias]) => createImport(name, alias))
    );
}
