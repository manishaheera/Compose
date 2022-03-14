const mongoose = require("mongoose");
const mongooseDateFormat = require('mongoose-date-format');


const DrawingSchema = new mongoose.Schema ({

    image:{
        type: String,
    },

    date: {
        type: Date,
        default: Date.now,
    }
    ,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


}, {timestamps: true}) 

DrawingSchema.plugin(mongooseDateFormat);  // format: YYYY-MM-DD HH:mm:ss
const Drawing = mongoose.model("Drawing", DrawingSchema);


module.exports = Drawing;