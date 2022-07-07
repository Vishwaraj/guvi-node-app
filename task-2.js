const fs = require("fs");

const quote3 = "We are the champions!";

const [, , iVal] = process.argv;

// ------------------to write file-----------------------------------

// for( var i = 0; i < +iVal; i++) {
//     fs.writeFile(`./backup/newText-${i}.html`, quote3, (err) => {
//         if(err) {console.log(err)};
//         console.log('Success');
//     })
// }

// -----------------to read file--------------------

// fs.readFile('./test.txt', 'utf-8', (err, data) => {
//     if(err) console.log(err);
//     console.log(data);
// })


// --------------to update or append a file-----------------

const quote4 = 'Carpe Diem';

// fs.appendFile("./somefile.txt", "\n" + quote4, (err) => {
//     if(err) console.log(err);
//     console.log('updated');
// })


// ---------to update a paragraph--------------------------

const para = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`

// --------the below method helps in formatting--------------------------- 
// --------the way our para is added to somefile.txt----------------------

// fs.appendFile("./somefile.txt", 

// `

// ${para}

// `, 

// (err) => {
//     if(err) console.log(err);
//     console.log('updated');
// })