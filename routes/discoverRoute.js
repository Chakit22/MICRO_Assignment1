const {Router} = require("express");
const route = Router();
const Category = require("../models/Categories.js");
const Image = require("../models/galleryImages.js");

route.get("/getAll",(req,res,next) => {
    Category.find({},function(err,categories){
        if(err){
            next(err);
            return;
        }
        res.send(categories);
    });
});

module.exports = route;