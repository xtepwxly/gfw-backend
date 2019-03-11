const router = require('express').Router()
const bodyParser = require('body-parser')
const TelegramChat = require('./../chat/Telegram')
const VerifyToken = require('./../auth/VerifyToken')
const VerifyPostData = require('./../auth/VerifyPostData')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', VerifyToken, urlencodedParser, VerifyPostData(['name', 'phone', 'message']), TelegramChat)

module.exports = router;