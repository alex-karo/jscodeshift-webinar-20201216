import _ from 'lodash';
import { orderBy, map as lodashMap } from 'lodash';
import filter from 'lodash/filter';
import _identity from 'lodash/identity';

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

_.filter([1,2,3], _.identity);
filter([1,2,3], _identity);
orderBy(data, 'value');

const numbers = _.range(1, 10);
const chunks = _.chunk(numbers,3);

lodashMap(data);

_.map(data);

console.log(chunks);
