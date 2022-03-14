const mongoose = require("mongoose");
const mongooseDateFormat = require('mongoose-date-format');


const NoteSchema = new mongoose.Schema ({

    title: {
        type: String,
        required: [true, "Title is required!" ],
    },

    content: {
        type: String,
        required: [true, "Note cannot be empty!" ],
        maxlength: [255, "Note may not exceed 255 characters"],
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

NoteSchema.plugin(mongooseDateFormat);  // format: YYYY-MM-DD HH:mm:ss
const Note = mongoose.model("Note", NoteSchema);


module.exports = Note;