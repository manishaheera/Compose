const DrawingController = require("../controllers/Drawing.controller");
const {authenticate} = require("../config/jwt.config");


module.exports = (app) => {

    app.post("/api/drawings/:username", authenticate, DrawingController.addNewDrawing);
    app.get("/api/drawings/:username", authenticate, DrawingController.findAllDrawingsByUser);
    app.delete("/api/drawings/:id", DrawingController.deleteDrawing);
}

