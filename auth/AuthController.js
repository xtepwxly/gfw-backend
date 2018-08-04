const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { secret } = require('../config')
const router = require('express').Router()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/login', urlencodedParser, function(req, res) {
    const reqToken = req.headers['x-access-token']
    console.log(reqToken)
    jwt.verify(reqToken, secret, function(err, decoded) {
        // token already issued
        if (!err) {
            return res.status(200).json({ auth: true, token: reqToken })
        }
        // else
        // token has expired or was absent
        const uniqueId = new Date().valueOf()
        const token = jwt.sign({ id: uniqueId }, secret, {
            expiresIn: 86400 // expires in 24 hours
        })
        return res.status(200).json({ auth: true, token: token })
    })
})

module.exports = router