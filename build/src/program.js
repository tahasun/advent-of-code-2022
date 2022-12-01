"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day1_1 = require("./day1");
const calories = (0, day1_1.processInput)('./../input1.txt');
const max = (0, day1_1.findMax)(calories);
console.log(max);
const sorted = (0, day1_1.findMaxThreeSum)(calories);
console.log(sorted);
//# sourceMappingURL=program.js.map