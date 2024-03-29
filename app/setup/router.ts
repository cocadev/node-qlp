import express from 'express'
import auth_route from '../route/auth.route.js'
import initial_route from '../route/init.route.js'

const router = express.Router();

export default function (app) {

    initial_route(app)
    auth_route(app)

    router.use(function (req, res, next) { console.log("/" + req.method); next(); });

    router.get("/", function (req, res) {
        res.status(200).json({
            "success": true,
            "message": "Welcome Node Mysql!"
          });
    });

    app.use("/", router);
    app.use("*", function (req, res) {
        // res.sendFile(path.join(__dirname, '..', '..', 'views', '404.html'))
        res.status(404).json({
            "success": false,
            "message": "This URL is not exist."
          });
    });

}