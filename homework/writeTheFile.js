const fs = require('fs');

module.exports = (file, dataToWrite) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, dataToWrite, (err) => {

            if (err) {
                reject('Cannot write data....');
            }

            resolve(`Data written to file: ${file}!!!`);

        })
    })
}