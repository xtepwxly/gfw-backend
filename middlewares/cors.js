module.exports = function() {
    return function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "https://www.wfg.md");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    }
}