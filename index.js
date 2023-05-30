const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const routes = require("./routes/routes");

const app = express();

const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString)
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.use(express.json());

app.use('/teste', routes);

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})