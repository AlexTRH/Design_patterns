class Computer { // Это Receiver - выполняет реализацию, основную работу.
    constructor() {
        console.log('Computer created')
    }

    start() {
        console.log('Computer (receiver): start!')
    }
    stop() {
        console.log('Computer (receiver): stop!')
    }
    reset() {
        console.log('Computer (receiver): reset!')
    }
}



class Invoker { // Отправитель, инициатор
    command;
    constructor() {
        console.log('Invoker created')
    }

    SetCommand(command) { // определяем какая команда будет выполняться при запуске Execute()
        this.command = command
    }
}




class Command { // это интерфейс для всех команд, обеспечивает единый интерфейс - Execute(), Undo()
    constructor() {
        if (this.constructor.name === 'Command') {
            throw new Error(`${this.constructor.name}: can not create instance of interface`);
        }
    }

    Execute() {
        throw new Error(`Не описан метод Execute() в классе ${this.constructor.name}`);
    }
    Undo() { // отмена действия
        throw new Error(`Не описан метод Execute() в классе ${this.constructor.name}`);
    }
}

class CommandsQueue extends Command { // набор команд, создает очередь, можно указать любые команды в любом количестве.
    constructor(receiver, ...commands) { // первый аргумент - receiver, последующие аргументы - команды.
        super();
        this.commands = commands;
        this.receiver = receiver;
    }
    Execute() {
        console.log('IT IS CommandsQueue:');
        for (let command of this.commands) {
            command.Execute(this.receiver);
        }
    }
    Undo() {
        console.log('IT IS CommandsQueue UNDO:');
        for (let command of this.commands) {
            command.Undo(this.receiver);
        }
    }
}

class StartCommand extends Command { // конкретная команда
    constructor(receiver, state) {
        super()
        this.receiver = receiver
        console.log('StartCommand created')
    }

    Execute() {
        console.log('StartCommand Execute')
        this.receiver.start();
    }
    Undo() {
        console.log('StartCommand undo')
        this.receiver.stop();
    }
}
class StopCommand extends Command { // конкретная команда
    constructor(receiver, state) {
        super()
        this.receiver = receiver
        console.log('StopCommand created')
    }

    Execute() {
        console.log('StopCommand Execute')
        this.receiver.stop();
    }
    Undo() {
        console.log('StopCommand undo')
        this.receiver.start();
    }
}
class ResetCommand extends Command { // конкретная команда
    constructor(receiver, state) {
        super()
        this.receiver = receiver
        console.log('ResetCommand created')
    }

    Execute() {
        console.log('ResetCommand Execute')
        this.receiver.reset();
    }
    Undo() {
        console.log('ResetCommand undo: отмена невозможна');
    }
}



let invoker = new Invoker() // передает команду клиента в receiver
let receiver = new Computer() // выполняет какую-то полезную работу, например запускает компьютер
let start = new StartCommand(receiver);
let stop = new StopCommand(receiver);
let reset = new ResetCommand(receiver);

// Вот это все можно обернуть в класс Client (решает что и когда выполнять.)
invoker.SetCommand(start); // клиент указывает invoker какую команду выполнить
invoker.command.Execute(); // выполняем команду, глобальная точка доступа (несколько клиентов могут запускать выполнение)
invoker.SetCommand(stop);
invoker.command.Execute();
invoker.command.Undo();
invoker.SetCommand(reset);
invoker.command.Execute();
invoker.command.Undo();

invoker.SetCommand(new CommandsQueue(receiver, start, reset));
invoker.command.Execute();
invoker.command.Undo();