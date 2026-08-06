require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

// Database
connectDB();

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend/views"));

// Middleware
app.use(express.static(path.join(__dirname, "frontend/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



// Routes
app.use(userRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});