const Drawing = require("../models/drawing.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


module.exports = {
    
    addNewDrawing: (req, res) => {
        const newDrawingObject = new Drawing(req.body);

        newDrawingObject.createdBy = req.jwtpayload.id

        newDrawingObject.save()
                .then((newDrawing) =>{
                    console.log(newDrawing);
                    res.json(newDrawing)
                })
                .catch((err) =>{ 
                    console.log("add drawing failed");
                    res.status(400).json(err);
                })
    },

    deleteDrawing: (req, res) => {
        Drawing.deleteOne({_id: req.params.id})
            .then((deletedDrawing) => {
                console.log(deletedDrawing);
                res.json(deletedDrawing)
            })
            .catch((err) => { 
                console.log("delete drawing failed");
                res.json({message: "Error in deleteDrawing", error: err})
            })
    },


    findAllDrawingsByUser: (req, res) => {{ 
        Drawing.find({createdBy: req.jwtpayload.id}).sort({date:-1})
            .then((allDrawingsByLoggedInUser) => {
                console.log(allDrawingsByLoggedInUser);
                res.json(allDrawingsByLoggedInUser)
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
        }
    }

}