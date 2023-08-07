const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./errorHandler");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;


// db connection
const mongoString = process.env.DATABASE_URL;
// const mongoString = process.env.HOTSPOT_DB_URL;
mongoose.connect(mongoString)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));


// middleware
app.use(express.json());


// routes
app.use(authRoutes);
app.use(profileRoutes);


// error handling
app.use(errorHandler);


// connection
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})