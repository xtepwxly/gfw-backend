const router = require('express').Router()
const bodyParser = require('body-parser')
const { callFbApi } = require('./../lib')
const VerifyToken = require('../auth/VerifyToken')
const VerifyPostData = require('../auth/VerifyPostData')
const Task = require('./../task/Task')

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// first 10 images from facebook page
const init = (galleryId) => callFbApi(`/${galleryId}/?fields=photos.limit(10){images,comments,likes,link},description`)
// next 10 images from facebook page
const page = (galleryId, after) => callFbApi(`/${galleryId}/photos?pretty=0&fields=images,comments,likes,link&limit=10&after=${after}`)

// get initial images
router.get('/', VerifyToken, Task.parallel(init))
// get next 10 images 
router.post('/pagination', urlencodedParser, VerifyToken, VerifyPostData, Task.one(page))

module.exports = router;