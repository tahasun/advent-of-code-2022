"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaxThreeSum = exports.findMax = exports.processInput = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
function processInput(filename) {
    const result = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, filename), 'utf-8');
    const calories = result.split(/\n/);
    return calories;
}
exports.processInput = processInput;
function totalCalories(calories) {
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
function findMax(calories) {
    const maximums = totalCalories(calories);
    return Math.max(...maximums);
}
exports.findMax = findMax;
function findMaxThreeSum(calories) {
    const maximums = totalCalories(calories);
    const sorted = maximums.sort((a, b) => b - a);
    return sorted[0] + sorted[1] + sorted[2];
}
exports.findMaxThreeSum = findMaxThreeSum;
const calories = processInput('./../input1.txt');
const max = findMax(calories);
console.log(max);
const sorted = findMaxThreeSum(calories);
console.log(sorted);
//# sourceMappingURL=day1.js.map