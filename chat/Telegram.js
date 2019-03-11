const util = require('util')
const http = require('request')
const { chat, token } = require('../config/telegram')

module.exports = (req, res) => {
    const { name, phone, message } = res.locals
    
    const fields = [
        '<b>Name</b>: ' + name,
        '<b>Phone</b>: ' + phone,
        '<b>Message</b>: ' + message
    ]
    
    const parts = fields.map(field => `${field}\n`)
    const msg = encodeURI(parts.join(''))
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat}&parse_mode=html&text=${msg}`
    
    const httpRequest = util.promisify(http.post)

    return httpRequest(url)
        .then(payload => res.status(200).json({message: 'Your message was sent successfully!'}))
        .catch(err => res.status(500).json({error: 'Internal Server Error'}))
}