"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const LOWER_OFFSET = 96;
const UPPER_OFFSET = 38;
function processInput(filename) {
    const result = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, filename), 'utf-8');
    const runsacks = result.split(/\n/);
    return runsacks;
}
// Part 1
function runsackToCompartmentsMapping(_runsacks) {
    let runsacks = [];
    _runsacks.forEach(runsack => {
        const compartmentLen = runsack.length / 2;
        const compartments = {
            compartmentA: runsack.slice(0, compartmentLen),
            compartmentB: runsack.slice(compartmentLen, runsack.length),
        };
        runsacks.push(compartments);
    });
    return runsacks;
}
// Part 2
function runsackToGroupMapping(_runsacks) {
    let groups = [];
    for (let i = 0; i < _runsacks.length; i++) {
        const runsack = _runsacks[i];
        const n = groups.length - 1;
        i % 3 ? groups[n].push(runsack) : groups.push([runsack]);
    }
    return groups;
}
// Part 1
function findCommonChar(str1, str2) {
    let commonChar = '';
    for (let char of str1) {
        if (str2.includes(char)) {
            commonChar = char;
        }
    }
    return commonChar;
}
//part 2
function findCommonChars(str1, str2) {
    let commonChar = [];
    for (let char of str1) {
        if (str2.includes(char)) {
            commonChar.push(char);
        }
    }
    return commonChar;
}
const runsacks = processInput('./../input3.txt');
const sacks = runsackToCompartmentsMapping(runsacks);
function charToPriority(char) {
    if (char.toLowerCase() === char) {
        return char.charCodeAt(0) - LOWER_OFFSET;
    }
    return char.charCodeAt(0) - UPPER_OFFSET;
}
function sumPriorityCommonChars(sacks) {
    let sum = 0;
    sacks.forEach(sack => {
        const commonChar = findCommonChar(sack.compartmentA, sack.compartmentB);
        sum += charToPriority(commonChar);
    });
    return sum;
}
//Answer to Part 1
console.log(sumPriorityCommonChars(sacks));
// Part 2
const groups = runsackToGroupMapping(runsacks);
function sumBadgePriority(groups) {
    let sum = 0;
    groups.forEach(group => {
        const commonItems1 = findCommonChars(group[0], group[1]);
        const commonItems2 = findCommonChars(group[1], group[2]);
        const badge = findCommonChar(commonItems1.join(''), commonItems2.join(''));
        sum += charToPriority(badge);
    });
    return sum;
}
// Answer to Part 2
console.log(sumBadgePriority(groups));
//# sourceMappingURL=day3.js.map