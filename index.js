require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Database
const connectDB = require("./config/db");

// Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require('./routes/adminRoute');
const app = express();

// Database Connection
connectDB();
app.use(express.json());
// Middleware
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/user", userRoute);
app.use('/admin', adminRoute);
// Server
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running...");
    }
});