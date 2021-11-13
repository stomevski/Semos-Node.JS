const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'topSecret');

        req.user = verifyToken;
        next();

    } catch (err) {
        res.status(401).send({ message: 'Authorization failed !!!' });
    }


}