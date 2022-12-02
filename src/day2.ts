import {readFileSync} from 'fs';
import {join} from 'path';

// GAME OF ROCK, PAPER & SCISSORS

// Strategy 1
// A = ROCK = X
// B = PAPER = Y
// C = SCISSORS = Z 
// LOSS = 0, DRAW = 3, WIN = 6
const choiceToPointMapping: {[key: string]: number} = {
  X: 1,
  Y: 2,
  Z: 3,
};

// My scores for each combination
const choiceToWinMapping: {[key: string]: number} = {
    'A X': 3,
    'A Y': 6,
    'A Z': 0,
    'B X': 0,
    'B Y': 3,
    'B Z': 6,
    'C X': 6,
    'C Y': 0,
    'C Z': 3,
}

// ROUND 2
// X = Loss = 0, Y = DRAW = 3, Z = WIN = 6
// A = Rock = 1, B = Paper = 2, C = Scissor = 3
const winToChoiceMapping: {[key: string]: number} = {
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

const gameToPointMapping: {[key: string]: number} = {
  X: 0,
  Y: 3,
  Z: 6,
};

function processInput(filename: string): string[] {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  const rounds = result.split(/\n/);

  return rounds;
}

function calcTotalScore1(rounds: string[]): number {
    const scores: number[] = [];
    for(const round of rounds){
        const myChoice: string = round.split(' ')[1];
        const myScore: number = choiceToPointMapping[myChoice];

        const game: number = choiceToWinMapping[round];
        scores.push(game + myScore);
    }

    const total = scores.reduce((acc, cur) => acc + cur, 0);
    return total;
}

function calcTotalScore2(rounds: string[]): number {
  const scores: number[] = [];
  for (const round of rounds) {
    const game: string = round.split(' ')[1];
    const gameScore: number = gameToPointMapping[game];
    const myChoiceScore: number = winToChoiceMapping[round];

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