const express = require('express');
const app = express();
const path = require('path');
// databse connection
const connectDB = require('./config/db')
//frontend connection 
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.urlencoded({ extended: true }));
const userRoutes = require('./routes/userRoutes');
connectDB();
app.use('/user',userRoutes);
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("server is running...");
    }
})