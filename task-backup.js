const fs = require("fs");

const quote2 = 'Live more worry less';


for(var i = 1; i < 11; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
        if(err) {console.log(err)};
        console.log('Saved file');
    });
}
