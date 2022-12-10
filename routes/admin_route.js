const mongoose = require("mongoose");
const Category = require("../models/Categories.js");
const Image = require("../models/galleryImages.js");
const {Router} = require("express");
const route = Router();

route.post("/addCategory",(req,res,next) => {
    if(!req.body.name)
        return next(new Error("Name category Required!!"));
    const newCategory = new Category({
        name:req.body.name
    });
    newCategory.save();
    res.send("Category Added successfully!!");
});

route.post("/addImage",(req,res,next) => {
    if(!req.body.name)
        return next(new Error("Name category Required!!"));
    const newImage = new Image({
        name:req.body.name,
        category:req.body.category,
        likes:req.body.likes,
        imageUrl:req.body.imageUrl
    });
    newImage.save();
    res.send("Image Added successfully!!");
});

module.exports = route;