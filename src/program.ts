import {processInput, findMax, findMaxThreeSum} from './day1';

const calories = processInput('./../input1.txt');

const max = findMax(calories);
console.log(max);

const sorted = findMaxThreeSum(calories);
console.log(sorted);
