const express = require("express");
const app = express();
require("dotenv").config();
const connect_mongoose = require("./config/connectdb.js");
const adminRoute = require("./routes/admin_route.js");
const discoverRoute = require("./routes/discoverRoute.js");
connect_mongoose(); //Make a connection with mongoose

const category_model = require("./models/Categories.js"); //Get the category model. Basically gets a collection
const image_model = require("./models/galleryImages.js"); //get the images model. Basically gets a collection.

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/admin",adminRoute);
app.use("/api/discover",discoverRoute);

app.get("/api/health", (req, res) => {
    res.send(`Backend server is active status:active & time:${new Date()}`);
});

//404 not found middleware
app.use((req,res,next) => {
    //No route found
    const err = new Error("added 404 route not found middleware");
    err.status = 404;
    next(err);
});

//Error handling middleware
app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    });
});

app.listen(process.env.PORT || 3000,(req,res) => {
    console.log(`Server up and running on PORT ${process.env.PORT || 3000}.`);
});