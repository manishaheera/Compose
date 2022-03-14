// ORDER IS IMPORTANT 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();


app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.use(cors({
    credentials: true, 
    origin: "http://localhost:3000",
}))

// Configures server to accept and update cookies
app.use(cookieParser());

require("./config/mongoose.config"); 
require("./routes/note.routes")(app);
require("./routes/user.routes")(app);
require("./routes/drawing.routes")(app);

app.listen(process.env.MY_PORT, ()=> console.log(`Server connected to port ${process.env.MY_PORT}`))
