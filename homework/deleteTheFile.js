const fs = require('fs');

module.exports = (file) => {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) {
                reject('Cannot delete data...')
            }

            resolve(`${file} has been deleted !!!`);
        })
    })
}