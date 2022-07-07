const dbl = (n) => n * 2;

const trpl = (n) => n * 3;

const name = 'Vishwaraj';

const greet = (data) => `Hello ${data}`;

// console.log('Hello World!' ,dbl(5), trpl(5), greet(name));

// console.log(global);

// console.log(process.argv);

console.log(dbl(process.argv[2]));