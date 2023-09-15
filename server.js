const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require('colors')
const connectDB = require("./config/db");

//Load env vars
dotenv.config({path: "./config/config.env"});

//Route files
const bootcamps = require("./routes/bootcamps");

//Connect to Database
connectDB();

const app = express();

// app.use(logger)
// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Body Parser (middleware)
app.use(express.json())  //to get the req.body in the controller

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`.red.italic.bold);
    //close server & exit process
    server.close(() => process.exit(1)); //exit with failure
})

