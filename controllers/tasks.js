const { validateFunction, taskRule } = require('../util/validator');
const responseStatus = require('../util/responseStatus');
const Task = require('../models/taskModel');




exports.createTask = async (req, res) => {
    try {
        await validateFunction(req.body, taskRule);
        await Task.create({ ...req.body, author_id: req.user.id });

        res.status(responseStatus.CREATED).send(req.body);
    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err);
    }



}


exports.getSingleTask = async (req, res) => {

    const { id } = req.params;

    try {
        const singleTask = await Task.findOne({ _id: id, author_id: req.user.id });
        if (!singleTask) {
            return res.status(responseStatus.BAD_REQUEST).send({ message: "No task found" });
        }

        res.status(responseStatus.OK).send({ title: singleTask.title, body: singleTask.body, date: singleTask.date });

    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err);
    }


}



exports.getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({ author_id: req.user.id });
        res.status(responseStatus.OK).send(tasks);

    } catch (err) {
        res.status(responseStatus.BAD_REQUEST).send(err);
    }


}



exports.updateTask = async (req, res) => {

    const { id } = req.params;

    try {

        // await validateFunction(req.body, taskRule);
        // const findAndUpdate = await Task.findByIdAndUpdate(id, { ...req.body });
        const findAndUpdate = await Task.findOneAndUpdate({ _id: id, author_id: req.user.id }, { ...req.body });

        if (!findAndUpdate) {
            return res.status(responseStatus.BAD_REQUEST).send({ message: "No task found" })
        }

        res.status(responseStatus.CREATED).send(findAndUpdate);


    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
}


exports.removeTask = async (req, res) => {
    const { id } = req.params;

    try {

        const dataToRemove = await Task.findOneAndDelete({ _id: id, author_id: req.user.id });
        if (!dataToRemove) {
            return res.status(responseStatus.BAD_REQUEST).send({ message: "No task found" });
        }

        res.status(responseStatus.OK).send({ message: "Task removed" })
    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err);
    }


}