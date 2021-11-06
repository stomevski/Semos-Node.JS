const readFile = require('../homework/readTheFile');
const writeFile = require('../homework/writeTheFile');
const jsonDataDirectory = `${__dirname}/../data/user.json`;

const responseStatus = require('../util/responseStatus');

const { validateFunction, userRule, idRule } = require('../util/validator');



exports.getAll = async (req, res) => {
    const data = await readFile(jsonDataDirectory);

    res.status(responseStatus.OK).send(data);

}


exports.getOne = async (req, res) => {
    const { id } = req.params;

    const data = await readFile(jsonDataDirectory);

    const userSearch = data.find((user) => user.id === +id);

    if (!userSearch || id < 1 || id > data.length || +id === NaN) {
        return res.status(responseStatus.BAD_REQUEST).send({
            message: 'Invalid User'
        })
    }


    res.status(responseStatus.OK).send(userSearch);
}


exports.save = async (req, res) => {
    try {
        const data = await readFile(jsonDataDirectory);

        await validateFunction(req.body, userRule);

        data.push(req.body);
        writeFile(jsonDataDirectory, JSON.stringify(data));
        res.status(responseStatus.CREATED).send(req.body);

    } catch (err) {

        res.status(responseStatus.BAD_REQUEST).send(err);
    }




}


exports.update = async (req, res) => {

    try {

        const { id } = req.params;
        const data = await readFile(jsonDataDirectory);

        const userSearch = data.find((user) => user.id === +id);

        if (!userSearch || id < 1 || id > data.length || +id === NaN) {
            return res.status(responseStatus.BAD_REQUEST).send({
                message: 'Invalid User'
            })
        }


        await validateFunction(req.body, userRule);


        const findUserIndex = data.indexOf(userSearch);
        data[findUserIndex] = { ...req.body };
        writeFile(jsonDataDirectory, JSON.stringify(data));
        res.status(responseStatus.OK).send(req.body);

    } catch (error) {
        res.status(responseStatus.BAD_REQUEST).send(error);
    }


}



exports.remove = async (req, res) => {

    const { id } = req.params;
    const data = await readFile(jsonDataDirectory);


    const userSearch = data.find((user) => user.id === +id);

    if (!userSearch || id < 1 || id > data.length || +id === NaN) {
        return res.status(responseStatus.BAD_REQUEST).send({
            message: 'Invalid User'
        })
    }

    const filteredUsers = data.filter((user) => user.id !== +id);
    writeFile(jsonDataDirectory, JSON.stringify(filteredUsers));
    res.status(responseStatus.OK).send(userSearch);
}