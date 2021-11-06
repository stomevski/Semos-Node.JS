const responseStatus = require('../util/responseStatus');
const bookModel = require('../models/bookModel');





exports.getAll = async (req, res) => {
    try {

        const data = await bookModel.find({});
        res.status(responseStatus.OK).send(data);

    } catch (error) {

        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(error.message);

    }



}


exports.getOne = async (req, res) => {

    try {
        const { id } = req.params;

        const findById = await bookModel.findById({ _id: id });

        res.status(responseStatus.OK).send(findById);
    } catch (error) {
        res.status(responseStatus.BAD_REQUEST).send({ error: error.message });
    }

}


exports.save = async (req, res) => {
    try {
        const newBook = await bookModel.create({
            ...req.body
        })

        res.status(responseStatus.CREATED).send(newBook);

    } catch (err) {

        res.status(responseStatus.BAD_REQUEST).send({ error: err.message });
    }




}


exports.update = async (req, res) => {

    try {

        const { id } = req.params;

        const findAndUpdate = await bookModel.findByIdAndUpdate({ _id: id }, { $set: { ...req.body } });

        res.status(responseStatus.OK).send(findAndUpdate);


    } catch (error) {
        res.status(responseStatus.BAD_REQUEST).send({ error: error.message });
    }


}



exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const removeBook = await bookModel.findByIdAndRemove({ _id: id });

        res.status(responseStatus.OK).send(removeBook);
    } catch (error) {
        res.status(responseStatus.BAD_REQUEST).send({ error: error.message });
    }
}