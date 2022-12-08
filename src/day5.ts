import {readFileSync} from 'fs';
import {join} from 'path';

class Stack {
  stack: string[];

  constructor(...crates: string[]) {
    this.stack = [];
    if (crates.length > 0) {
      this.stack = [...crates];
    }
  }

  push(crate: string): void {
    this.stack = [crate, ...this.stack];
  }

  pushUnit(crates: string[]): void {
    this.stack = [...crates, ...this.stack];
  }

  pop(): string {
    const [first, ...rest] = this.stack;
    this.stack = [...rest];

    return first;
  }

  popUnit(quantity: number): string[] {
    const len = this.stack.length;
    let n = quantity > len ? len : quantity;

    const unitToPop = this.stack.slice(0, n);
    this.stack = this.stack.slice(n, len);
    return unitToPop;
  }

  peek(): string {
    const [first, ...rest] = this.stack;
    return first;
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}

function move(quantity: number, from: Stack, to: Stack): void {
  for (let i = 0; i < quantity; i++) {
    const crate = from.pop();
    to.push(crate);
  }
}

function moveUnits(quantity: number, from: Stack, to: Stack): void {
  const crates = from.popUnit(quantity);
  to.pushUnit(crates);
}

function findFirstCrates(stacks: Stack[]): string[] {
  let firstCrates: string[] = [];
  stacks.forEach(stack => firstCrates.push(stack.peek()));
  return firstCrates;
}

function processInput(filename: string): string[] {
  const result = readFileSync(join(__dirname, filename), 'utf-8');
  const instructions = result.split(/\n/);

  return instructions;
}

let stack1 = new Stack('W', 'R', 'T', 'G');
let stack2 = new Stack('W', 'V', 'S', 'M', 'P', 'H', 'C', 'G');
let stack3 = new Stack('M', 'G', 'S', 'T', 'L', 'C');
let stack4 = new Stack('F', 'R', 'W', 'M', 'D', 'H', 'J');
let stack5 = new Stack('J', 'F', 'W', 'S', 'H', 'L', 'Q', 'P');
let stack6 = new Stack('S', 'M', 'F', 'N', 'D', 'J', 'P');
let stack7 = new Stack('J', 'S', 'C', 'G', 'F', 'D', 'B', 'Z');
let stack8 = new Stack('B', 'T', 'R');
let stack9 = new Stack('C', 'L', 'W', 'N', 'H');

const stackMapping: {[key: number]: Stack} = {
  1: stack1,
  2: stack2,
  3: stack3,
  4: stack4,
  5: stack5,
  6: stack6,
  7: stack7,
  8: stack8,
  9: stack9,
};

// move 3 from 4 to 3
// pop quantity = 3 items from stack4 and push it to stack3
const instructions = processInput('./../input5.txt');

// Reorganize Stacks
instructions.forEach(instruction => {
  const numerizedInstruction: string[] = instruction.match(/\d+/g)!;
  const n = Number(numerizedInstruction[0]);
  const stackA = stackMapping[Number(numerizedInstruction[1])];
  const stackB = stackMapping[Number(numerizedInstruction[2])];

//   move(n, stackA, stackB); // Part A
  moveUnits(n, stackA, stackB); // Part B
});

const reorganizedStacks: Stack[] = [
  stack1,
  stack2,
  stack3,
  stack4,
  stack5,
  stack6,
  stack7,
  stack8,
  stack9,
];
const firstRowOfCrates = findFirstCrates(reorganizedStacks);
console.log(firstRowOfCrates.join(''));
