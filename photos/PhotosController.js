const router = require('express').Router();
const bodyParser = require("body-parser");
const { callFbApi } = require("./../lib");
const { gallery_id } = require('./../config');
const VerifyToken = require('../auth/VerifyToken');
// parse `application/x-www-form-urlencoded`
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", VerifyToken, (req, res) => {
    const fbApiUrl = `/${gallery_id}/?fields=photos.limit(10){images,comments,likes,link},description`;
    return callFbApi(fbApiUrl)
        .then(json => res.send(json))
        .catch(({ message }) => res.json({ error: message }));
});

router.post("/pagination", VerifyToken, urlencodedParser, (req, res) => {
    const { after } = req.body || '';
    const fbApiUrl = `/${gallery_id}/photos?pretty=0&fields=images,comments,likes,link&limit=10&after=${after}`;
    return callFbApi(fbApiUrl)
        .then(json => res.json(json))
        .catch(({ message }) => res.json({ error: message }));
})

module.exports = router;