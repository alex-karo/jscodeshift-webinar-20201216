import chunk from "lodash/chunk";
import filter from "lodash/filter";
import identity from "lodash/identity";
import map from "lodash/map";
import orderBy from "lodash/orderBy";
import range from "lodash/range";

const data: any = [
  {value: 1},
  {value: 2},
  {value: 3},
];

filter([1,2,3], identity);
filter([1,2,3], identity);
orderBy(data, 'value');

const numbers = range(1, 10);
const chunks = chunk(numbers,3);

map(data);

console.log(chunks);
