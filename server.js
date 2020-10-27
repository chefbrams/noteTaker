var express = require("express");
var path = require("path");
const fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// script files
require("./routes/apiRoutes")(app);
require(".routes/htmlRoutes")(app);

module.exports = function (app) {

    // route for index.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //  route for notes.html
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

}

app.listen(PORT, () => {
    console.log("listening on Port", PORT)
})