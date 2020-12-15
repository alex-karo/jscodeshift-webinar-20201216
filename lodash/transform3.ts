import { API, FileInfo } from 'jscodeshift/src/core';
import { getFunctionsWithAliases } from './lib3/get-functions-with-aliases';
import { replaceImportsWithAliases } from './lib3/replace-imports-with-aliases';
import { renameMethodsWithAlises } from './lib3/rename-methods-with-aliases';

export const parser = 'ts';

export default function transformer(file: FileInfo, api: API): string | null {
  const j = api.jscodeshift;
  const root = j(file.source);

  const lodashFunctions = getFunctionsWithAliases(root);
  renameMethodsWithAlises(root, lodashFunctions);
  replaceImportsWithAliases(root, lodashFunctions);

  return root.toSource();
}
