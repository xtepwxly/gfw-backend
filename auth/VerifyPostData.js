function verifyPostData(requiredParams) {
    return (req, res, next) => {
        const requestedParams = Object.keys(req.body)
        
        if (requestedParams.sort().toString() !== requiredParams.sort().toString()) {
            return res.status(500).json({error: 'One or more params are missing'})
        }
        // else
        
        const requestedParamEntries = Object.entries(req.body)

        for(let [key, value] of requestedParamEntries) {
            res.locals[key] = value
        }

        next()
    }
}

module.exports = verifyPostData