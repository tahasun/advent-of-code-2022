"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
// GAME OF ROCK, PAPER & SCISSORS
// Strategy 1
// A = ROCK = X
// B = PAPER = Y
// C = SCISSORS = Z 
// LOSS = 0, DRAW = 3, WIN = 6
const choiceToPointMapping = {
    X: 1,
    Y: 2,
    Z: 3,
};
// My scores for each combination
const choiceToWinMapping = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3,
};
// ROUND 2
// X = Loss = 0, Y = DRAW = 3, Z = WIN = 6
// A = Rock = 1, B = Paper = 2, C = Scissor = 3
const winToChoiceMapping = {
    'A X': 3,
    'A Y': 1,
    'A Z': 2,
    'B X': 1,
    'B Y': 2,
    'B Z': 3,
    'C X': 2,
    'C Y': 3,
    'C Z': 1,
};
const gameToPointMapping = {
    X: 0,
    Y: 3,
    Z: 6,
};
function processInput(filename) {
    const result = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, filename), 'utf-8');
    const rounds = result.split(/\n/);
    return rounds;
}
function calcTotalScore1(rounds) {
    const scores = [];
    for (const round of rounds) {
        const myChoice = round.split(' ')[1];
        const myScore = choiceToPointMapping[myChoice];
        const game = choiceToWinMapping[round];
        scores.push(game + myScore);
    }
    const total = scores.reduce((acc, cur) => acc + cur, 0);
    return total;
}
function calcTotalScore2(rounds) {
    const scores = [];
    for (const round of rounds) {
        const game = round.split(' ')[1];
        const gameScore = gameToPointMapping[game];
        const myChoiceScore = winToChoiceMapping[round];
        scores.push(gameScore + myChoiceScore);
    }
    const total = scores.reduce((acc, cur) => acc + cur, 0);
    return total;
}
const rounds = processInput('./../input2.txt');
const totalScore1 = calcTotalScore1(rounds);
const totalScore2 = calcTotalScore2(rounds);
console.log(totalScore1);
console.log(totalScore2);
//# sourceMappingURL=day2.js.map