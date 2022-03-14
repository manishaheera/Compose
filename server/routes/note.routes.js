const NoteController = require("../controllers/note.controller");
const {authenticate} = require("../config/jwt.config");


module.exports = (app) => {

    app.post("/api/notes", authenticate, NoteController.createNewNote);
    // app.get("/api/notes",  NoteController.findAllNotes);
    app.get("/api/notes/:username", authenticate, NoteController.findAllNotesByUser);
    app.get("/api/notes/:id", NoteController.findOneNote);
    // app.put("/api/notes/:id", NoteController.updateNote);
    app.delete("/api/notes/:id", NoteController.deleteNote);
    
}
