const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Database
const connectDB = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/user", userRoutes);

// Server
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server is running...");
    }
});