const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");

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
app.use('/teste', routes);
app.use(authRoutes);

// connection
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})