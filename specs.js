

const os = require("os"); // import inbuild package

console.log('Free Memory', os.freemem()/1024/1024/1024);
console.log('Total Memory', os.totalmem()/1024/1024/1024);
console.log('OS Version', os.version());
console.log('CPU Specs', os.cpus());


// 1024 bytes is 1KB
// dividing by 1024 3 times to get the result in GB



