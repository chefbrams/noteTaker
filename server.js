var express = require("express");
var path = require("path");
const fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

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
savedNote = require("../db/db.json");

module.exports = function (app) {

    //create a function that writes the notes to the db file
    const savesToDB = (notes) => {
        // create variable that takes the json and converts it to a string
        notes = JSON.stringify(notes);
        // write the string back to the db file
        fs.writeFileSync("./db/db.json", notes, (error) => {
            if (error) {
                return console.log(error);
            }
        });
    }

    //GET request that sends json data
    app.get("/api/notes", (req, res) => {
        res.json(savedNote);
    })

    //POST request
    app.post("/api/notes", (req, res) => {
        //set an id to each new post
        if (savedNote.length === 0) {
            req.body.id = "0";
        }
        else {
            req.body.id = JSON.stringify(JSON.parse(savedNote[savedNote.length - 1].id) + 1);
        }
        console.log("id:" + req.body)
        //push the body of the note to JSON file
        savedNote.push(req.body);

        //use function above to write to file
        saveToDB(savedNote);

        //respond with the note in JSON
        res.json(req.body);
    })


    // Delete note with certain id
    app.delete("/api/notes/:id", (req, res) => {
        //convert the data of that id from json to string
        let id = req.params.id.toString();

        //iterate through the notes data array and find matching id
        for (i = 0; i < savedNote.length; i++) {
            if (savedNote[i].id === id) {
                //respond note to be deleted
                res.send(noteData[i]);
                //remove note from array
                savedNote.splice(i, 1);
                break;
            }
        }

        // write entire note array to db again
        writeToDB(noteData);

    })


}

app.listen(PORT, () => {
    console.log("listening on Port", PORT)
})