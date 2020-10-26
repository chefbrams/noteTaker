var express = require("express");
var path = require("path");

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

app.listen(PORT, () => {
    console.log("listening on Port", PORT)
})