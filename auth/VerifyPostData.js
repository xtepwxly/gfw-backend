function verifyPostData(req, res, next) {
    const { year, after } = req.body || {}
    if (!after || !year) {
        return res.status(404).json({ error: "One or more are wrong are missed" })
    }
    // else
    
    res.locals.year = year
    res.locals.after = after
    
    next()
}

module.exports = verifyPostData