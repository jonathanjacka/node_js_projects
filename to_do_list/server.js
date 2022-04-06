const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(client) {
    super();
    this.tasks = {};
    this.taskId = 1;
    process.nextTick(() =>
      this.emit('response', "Type a command (type 'help' to list commands):")
    );

    client.on('command', (command, args) => {
      console.log('Command received: ', command);

      switch (command) {
        case 'help':
        case 'ls':
        case 'add':
        case 'delete':
          this[command](args);
          break;
        default:
          this.emit('response', 'Command unknown...');
      }
    });
  }

  tasksString() {
    return Object.keys(this.tasks)
      .map((key) => `${key}: ${this.tasks[key]}`)
      .join('\n');
  }

  help() {
    this.emit(
      'response',
      `Available Commands: \nadd {your task}\nls\ndelete {task ID}`
    );
  }

  ls() {
    this.emit('response', `Tasks: \n${this.tasksString()}`);
  }

  add(args) {
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', `Added task: ${this.taskId}`);
    this.taskId++;
  }

  delete(args) {
    delete this.tasks[args[0]];
    this.emit('response', `Deleted task: ${args[0]}`);
  }
}

module.exports = (client) => new Server(client);
