
let notesData = require("../db/db.json");
const fs = require("fs");
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(err, res) {
    try {
      // reads the notes from json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log("hello!");
      // parse it so notesData is an array of objects
      notesData = JSON.parse(notesData);
  
      // error handling
    } catch (err) {
      console.log("\n error (in app.get.catch):");
      console.log(err);
    }
    //   send objects to the browser
    res.json(notesData);
  });
  
  app.post("/api/notes", function(req, res) {
    try {
      // reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log(notesData);
  
      // parse the data to get an array of objects
      notesData = JSON.parse(notesData);
      // Set new notes id
      req.body.id = notesData.length;
      // add the new note to the array of note objects
      notesData.push(req.body); // req.body - user input
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);
      // writes the new note to file
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
      // changeit back to an array of objects & send it back to the browser(client)
      res.json(JSON.parse(notesData));
  
      // error Handling
    } catch (err) {
      throw err;
      console.error(err);
    }
  });

  app.delete("/api/notes/:id", function(req, res) {
    try {
      //  reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      // parse the data to get an array of the objects
      notesData = JSON.parse(notesData);
      // delete the old note from the array on note objects
      notesData = notesData.filter(function(note) {
        return note.id != req.params.id;
      });
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);
      // write the new notes to the file
      fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
        // error handling
        if (err) throw err;
      });
  
      // change it back to an array of objects & send it back to the browser (client)
      res.send(JSON.parse(notesData));
  
      // error handling
    } catch (err) {
      throw err;
      console.log(err);
    }
  });

}