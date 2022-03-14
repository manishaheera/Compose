const mongoose = require("mongoose");


mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    //used to handle deprecation warnings in our terminal
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => (
        console.log(`You are now connected to the ${process.env.DB_NAME} database!`)
    ))
    .catch((err) => {
        console.log(`Error connecting to the ${process.env.DB_NAME} database! Here is your error:`, err)
        console.log(err)
    })
