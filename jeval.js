#!/usr/bin/env node

// Example of map - Print out each line with an @ symbol appended
// echo "hey\nthere\n" | jeval "console.log(this.l + \"@\")"  
// Example of filter - filtering for only strings including "there"
// echo "hey\nthere\n" | jeval "this.l.includes(\"there\") && console.log(this.l + \"@\")"  
// Example of reduce - Start with an empty array, push each line onto the array, when done iterating over everything run the last line
// The final eval string occurs so that you can figure out how to want to return the accumulator. As JSON for example or maybe line by line to be mapped over again
// echo "hey\nthere\n" | jeval "([])" "console.log(this.l + \"@\"); this.a.push(this.l);" "console.log(this);"
// A demo showing map then reduce
// echo "hey\nthere\nmy\nname\nis\nbrad" | jeval "console.log(this.l.toUpperCase())" | jeval "([])" "this.l.length > 3 && this.a.push(this.l);" "console.log(this);"

   
const readline = require('readline');
const u = require('util');
const p = require('path');
const cl = console.log;

let acc = {};
let evalString = '';
let finalEvalString = '';

if (process.argv.length === 5) {
  // Reduce
  acc = eval(process.argv[process.argv.length - 3]);
  evalString =  process.argv[process.argv.length - 2];
  finalEvalString =  process.argv[process.argv.length - 1];
} else if (process.argv.length === 3) {
  // Map
  evalString =  process.argv[process.argv.length - 1];
} else if (process.argv.length === 2) {
  console.log(`Usage:`);
  console.log(`jeval String2`);
  console.log(`jeval String1 String2 String3`);
  console.log(`String1: "A String to be evaled and the return value is the accumulator, [] or {} for example."`); 
  console.log(`String2: "A string to be evaled with this as an object {l: line, a: accumulator i: index} "`);
  console.log(`String3: "A string "`);
  console.log(`\nExample of map then reduce:\necho "hey\\nthere\\nmy\\nname\\nis\\nBrad" | jeval "console.log(this.l.toUpperCase())" | jeval "[]" "this.l.length > 3 && this.a.push(this.l);" "console.log(this);"`);
  console.log(`\n\nI have aliased u to util, p to path, and cl to console.log. which would make the example above:`);
  console.log(`\nExample of map then reduce:\necho "hey\\nthere\\nmy\\nname\\nis\\nBrad" | jeval "cl(this.l.toUpperCase())" | jeval "[]" "this.l.length > 3 && this.a.push(this.l);" "cl(this);"`);
  process.exit(1);
}

function evalInContext(stringToEval) {
    eval(stringToEval);
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let i = 0;

rl.on('line', function (line) {
  i += 1;
  line.length && evalInContext.call({l: line, a: acc, i}, evalString);
});

rl.on('close', function (line) {
  if (process.argv.length === 5) {
    evalInContext.call(acc, finalEvalString);
  }
});
