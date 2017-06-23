const FB = require("fb");
const express = require("express");
const helmet = require("helmet");
const app = express();
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const { callFbApi } = require("./lib");
const { client_id, client_secret, page_id, grant_type, access_token, gallery_id, after } = require("./credentials");
const port = process.env.PORT || 8080;
// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(helmet());
app.use(cors());

app.get("/api/photos/", (req, res) => {
    const fbApiUrl = `/${gallery_id}/?fields=photos.limit(10){images,comments,likes,link},description`;
    return callFbApi(fbApiUrl)
        .then(json => res.send(json))
        .catch(({ message }) => res.json({ error: message }));
});

app.post("/api/photos/pagination/", urlencodedParser, (req, res) => {
    const { after } = req.body || "";
    const fbApiUrl = `/${gallery_id}/photos?pretty=0&fields=images,comments,likes,link&limit=10&after=${after}`;
    return callFbApi(fbApiUrl)
        .then(json => res.json(json))
        .catch(({ message }) => res.json({ error: message }));
})

app.get("*", (req, res) => res.send("Page Not Found..."));

app.listen(port, () => console.log("bootstrapped"));