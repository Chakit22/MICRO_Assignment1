const mongoose = require("mongoose");
const Category = require("../models/Categories.js");
const Image = require("../models/galleryImages.js");
const {Router} = require("express");
const route = Router();

route.post("/addCategory",(req,res) => {
    const newCategory = new Category({
        name:req.body.name
    });
    newCategory.save();
    res.send("Category Added successfully!!");
});

module.exports = route;