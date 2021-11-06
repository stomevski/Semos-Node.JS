const fs = require('fs');

module.exports = (file, dataToAppend) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(file, dataToAppend, (err) => {

            if (err) {
                reject('Cannot append data....');
            }

            resolve(`Data appended to file: ${file} !!!`);

        })
    })
}