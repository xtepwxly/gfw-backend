const jwt = require('jsonwebtoken');
const config = require('../config');
const router = require('express').Router();

router.post('/login', function(req, res) {
    const reqToken = req.headers['X-Access-Token'];
    jwt.verify(reqToken, config.secret, function(err, decoded) {
        // token already issued
        if (!err) {
            return res.status(200).send({ auth: true, message: 'Success' });
        }
        //else
        // token has expired or was absent
        const uniqueId = new Date().valueOf();
        const token = jwt.sign({ id: uniqueId }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ auth: true, token: token });
    });
});

module.exports = router;