import { PORT } from "../config/env"

export default function (app) {

    var server = app.listen(PORT, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("App listening at http://%s:%s", host, port)
    })

}