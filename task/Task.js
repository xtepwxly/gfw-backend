const config = require('./../config')
const galleryIds = [ config[2017], config[2018] ]

const onResult = (res) => (result) => res.json(result)
const onError = (res) => ({ message }) => res.status(300).json({ error: message })

const formatGalleries = (json) => {
    if (!Array.isArray(json) || json.length !== 2) { return [] }
    // else
    return {
        2017: json[0],
        2018: json[1],
        // 2019: json[2]
    } 
}

const formatResult = (year) => {
    return (json) => {
        const { photos, after } = json
        return {
            [year]: { 
                photos: photos,
                after: after
            },
        }
    }
}

const one = (callback) => (req, res) => {
    const { year, after } = res.locals
    return callback(config[year], after)
        .then(formatResult(year))
        .then(onResult(res))
        .catch(onError(res))
}

const parallel = (callback) => (req, res) => {
    const galleries = galleryIds.map((id) => callback(id))
    return Promise.all(galleries)
        .then(formatGalleries)
        .then(onResult(res))
        .catch(onError(res))
}

module.exports = { one, parallel }