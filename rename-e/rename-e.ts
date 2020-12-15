import { Transform } from 'jscodeshift';

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const { path: filePath, source } = file;
  const root = j(source);

  root.find(j.Identifier, { name: 'e' })
    .filter((path) => {
      const clausePath = j(path).closest(j.CatchClause).paths()[0];
      if (!clausePath) {
        return false;
      }
      return j.Identifier.check(clausePath.value.param)
        && clausePath.value.param.name === 'e';
    })
    .replaceWith(j.identifier('err'));

  root.find(j.Identifier, { name: 'e' })
    .replaceWith(j.identifier('evt'));

  return root.toSource();
}

export default transform;
