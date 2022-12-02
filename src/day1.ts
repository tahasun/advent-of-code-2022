import { readFileSync } from 'fs';
import { join } from 'path';

export function processInput(filename: string): string[] {
    const result = readFileSync(join(__dirname, filename), 'utf-8');
    const calories = result.split(/\n/);

    return calories;
}

function totalCalories(calories: string[]): number[] {
    let maximums = [];
    let acc = 0;
    for (let calorie of calories) {
      if (calorie === '') {
        maximums.push(acc);
        acc = 0;
      }
      acc += Number(calorie);
    }
    
    return maximums;
}

export function findMax(calories: string[]): number {
    const maximums = totalCalories(calories);
    return Math.max(...maximums);
}

export function findMaxThreeSum(calories: string[]): number {
    const maximums = totalCalories(calories);
    const sorted = maximums.sort((a, b) => b-a);
    
    return sorted[0]+sorted[1]+sorted[2];
}

const calories = processInput('./../input1.txt');

const max = findMax(calories);
console.log(max);

const sorted = findMaxThreeSum(calories);
console.log(sorted);


