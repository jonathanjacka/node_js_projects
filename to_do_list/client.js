const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new EventEmitter();
const server = require('./server.js')(client);

server.on('response', (response) => {
  //clear terminal
  process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');
  console.clear();
  process.stdout.write(response);
  process.stdout.write('\n> ');
});

let command, args;

rl.on('line', (input) => {
  console.log('Sending Command: ', input);
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});
