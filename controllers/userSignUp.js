const { validateFunction, userLoginRule, userRegisterRule } = require('../util/validator');
const User = require('../models/userModel');
const responseStatus = require('../util/responseStatus');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {
        await validateFunction(req.body, userRegisterRule);

        await User.create(req.body);

        res.status(responseStatus.CREATED).send({ message: 'Successfully registered' });
    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err);
    }



}


exports.login = async (req, res) => {

    try {
        await validateFunction(req.body, userLoginRule);

        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(responseStatus.INTERNAL_SERVER_ERROR).send({ message: "User or password incorrect" });
        }


        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(responseStatus.INTERNAL_SERVER_ERROR).send({ message: "User or password incorrect" });
        }

        const token = jwt.sign({ id: user._id, userName: user.userName }, 'topSecret', {
            expiresIn: '1h'
        })

        res.status(responseStatus.OK).send({ token });
    } catch (err) {
        res.status(responseStatus.INTERNAL_SERVER_ERROR).send(err);
    }


}