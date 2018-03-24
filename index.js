const app = require("express")();
const helmet = require("helmet");
const AuthController = require('./auth/AuthController');
const PhotosController = require('./photos/PhotosController');

app.use(helmet());

app.use('/api/auth', AuthController);
app.use('/api/photos', PhotosController);

app.get("*", (req, res) => res.status(404).send("Page Not Found..."));

app.listen(process.env.PORT || 8080, () => console.log('Bootstrapped...'));