module.exports = function() {
    return function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET, POST')
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Access-Token, Accept, Authorization, x-access-token')
        next()
    }
}