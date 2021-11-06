const fs = require('fs');

module.exports = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {

            if (err) {
                reject('Cannot read data....');
            }
            console.log("********************READING DATA FROM FILE****************************")
            resolve(JSON.parse(data));

        })
    })
}