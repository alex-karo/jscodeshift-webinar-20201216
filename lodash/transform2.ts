import { getFunctions } from './lib2/get-functions';
import { renameMethods } from './lib2/rename-methods';
import { replaceImports } from './lib2/replace-imports';
import { Transform } from 'jscodeshift';

export const parser = 'ts';

const transform: Transform = (file, api): string | null => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const lodashFunctions: string[] = getFunctions(root);
  renameMethods(root);
  replaceImports(root, lodashFunctions);

  return root.toSource();
}

export default transform;
