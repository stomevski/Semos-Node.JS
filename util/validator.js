const { Validator } = require('node-input-validator');



exports.validateFunction = async (data, rule) => {

    const validate = new Validator(data, rule)


    const match = await validate.check()
    if (!match) {
        throw validate.errors;
    }
}


exports.userRule = {
    id: 'required|integer',
    name: ['required', 'regex:^[a-zA-Z ]+$', 'length:30,3'],
    userName: 'required|string|alphaNumeric|length:30,3',
    age: 'required|integer|between:0,120',
    email: 'required|email',
    gender: 'in:male,female'
}


exports.idRule = {
    id: 'required|integer'
}


exports.bookRule = {
    name: 'required|string|length:50,3',
    author: 'required|string|length:30,3',
    pages: 'required|integer|between:10,1500',
    yearReleased: 'required|integer'
}