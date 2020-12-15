import _identity from "lodash/identity";
import chunk from "lodash/chunk";
import filter from "lodash/filter";
import lodashMap from "lodash/map";
import orderBy from "lodash/orderBy";
import range from "lodash/range";

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

filter([1,2,3], _identity);
filter([1,2,3], _identity);
orderBy(data, 'value');

const numbers = range(1, 10);
const chunks = chunk(numbers,3);

lodashMap(data);

lodashMap(data);

console.log(chunks);
