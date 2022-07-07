const fs = require("fs");


const data = 'Hi my name is Vishwaraj';

fs.writeFile("./test.txt", data, (err) => {
    if(err) {console.log(err)};
    console.log('Saved');
})