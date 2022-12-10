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

route.get("/getImages/:categoryId",(req,res,next) => {
    const categoryId = req.params.categoryId;
    const four_images = [];
    Image.find({},function(err,images){
        images.forEach((ele) => {
            if(four_images.length < 4){
                const image_categories = ele.category;
                image_categories.forEach((catg) => {
                    if(categoryId == catg.substr(catg.length - 1))
                        four_images.push(ele);
                });
            }
        });
        res.send(four_images);
    });
});

module.exports = route;