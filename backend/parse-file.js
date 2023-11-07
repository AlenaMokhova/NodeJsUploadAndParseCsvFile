const {parse} = require("csv-parse");
const fs = require('fs');

function readFile(fileName) {
    return new Promise((resolve, reject) => {
        let data = [];
        let stream = fs.createReadStream(fileName)
            .pipe(parse({delimiter: ",", from_line: 1}));
        stream.on("error", err => reject(err));
        stream.on("data", chunk => data.push(chunk));
        stream.on("end", () => resolve(data));
    });
}

module.exports.parse = readFile;