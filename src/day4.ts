import {readFileSync} from 'fs';
import {join} from 'path';

function processInput(filename: string): string[][] {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  const pairs = result.split(/\n/);

  const intervals: string[][] = [];
  pairs.forEach(pair => {
    const pairSeperated = pair.split(',');
    intervals.push(pairSeperated);
  });

  return intervals;
}

function intervalContains(interval1: string, interval2: string): boolean {
  const [x, y] = interval1.split('-');
  const [a, b] = interval2.split('-');

  if(Number(x) < Number(a)) {
    return Number(b) <= Number(y);
  } else if(Number(x) === Number(a)){
    return Number(y) <= Number(b) || Number(b) <= Number(y);
  } else {
    return Number(y) <= Number(b);
  }
}

function noOverlap(interval1: string, interval2: string): boolean {
  const [x, y] = interval1.split('-');
  const [a, b] = interval2.split('-');

  if (Number(x) < Number(a)) {
    return Number(y) < Number(a);
  } else if (Number(x) === Number(a)) {
    return false;
  } else {
    return Number(b) < Number(x);
  }
}

// Sum Pairs according to given callback function
function sumPairs(pairs: string[][], callback: Function): number{
  let sum = 0;
  pairs.forEach(pair => {
    sum = callback(pair[0], pair[1]) ? sum + 1 : sum;
  });
  return sum;
}

const intervals = processInput('./../input4.txt');
const sumContainsFully = sumPairs(intervals, intervalContains);

console.log(sumContainsFully);

const totalPairs = intervals.length;
const sumNoOverlap = sumPairs(intervals, noOverlap);
const sumSomeOverlap = totalPairs-sumNoOverlap;

console.log(sumSomeOverlap);
