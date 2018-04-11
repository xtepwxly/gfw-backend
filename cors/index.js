module.exports = function() {
    return function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://www.wfg.md");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        res.header("Access-Control-Allow-Headers", "Content-Type, X-Access-Token");
        next();
    }
}