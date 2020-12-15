import { Collection } from 'jscodeshift/src/Collection';
import j from 'jscodeshift/src/core';

function createImport(name: string) {
  return j.importDeclaration.from({
    specifiers: [j.importDefaultSpecifier(j.identifier(name))],
    source: j.literal(`lodash/${name}`),
  });
}

export function replaceImports(root: Collection<File>, funcNames: string[]): void {
  const importsSet = new Set();
  root
    .find(j.ImportDeclaration)
    .filter(path => path.value?.source?.value.toString().includes('lodash'))
    .remove()
    .at(0)
    .insertBefore(() => funcNames.sort().map((name) => createImport(name)));
}
