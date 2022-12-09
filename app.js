const express = require("express");
const app = express();
require("dotenv").config();
const connect_mongoose = require("./config/connectdb.js");
const adminRoute = require("./routes/admin_route.js");
connect_mongoose(); //Make a connection with mongoose

const category_model = require("./models/Categories.js"); //Get the category model. Basically gets a collection
const image_model = require("./models/galleryImages.js"); //get the images model. Basically gets a collection.

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/admin",adminRoute);

app.get("/api/health", (req, res) => {
    res.send(`Backend server is active status:active & time:${new Date()}`);
});

app.listen(process.env.PORT || 3000,(req,res) => {
    console.log(`Server up and running on PORT ${process.env.PORT || 3000}.`);
});