const readFile = require('./readTheFile');
const writeFile = require('./writeTheFile');


module.exports = (file, userToAdd) => {

    readFile(file).then((data) => {
        let objData = JSON.parse(data);

        objData.push(userToAdd);

        return objData;
    }).then((data) => {
        return writeFile(file, JSON.stringify(data))
    }).then(() => {
        return readFile(file)
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        err;
    })


}