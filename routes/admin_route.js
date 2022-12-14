const Category = require("../models/Categories.js");
const Image = require("../models/galleryImages.js");
const {Router} = require("express");
const route = Router();

route.post("/addCategory",async (req,res,next) => {
    try{ 
        if(!req.body.name){
            throw new Error("name field is required!!. Please try again!!");
        }
        const no_docs = await Category.countDocuments({name:req.body.name});
        console.log("No of indexes matching this key:value pair are : ",no_docs);
        if(no_docs != 0){
            throw new Error("Duplicate value entered!!.Please try again!!");
        }
        
        const newCategory = new Category({
            name:req.body.name
        });
        newCategory.save();
        res.send("Category Added successfully!!");
    }catch(err){
        next(err);
    }
});

route.post("/addImage",(req,res,next) => {
    try{
        if(!req.body.name){
            throw new Error("name field is required!!. Please try again!!");
        }
        
        const newImage = new Image({
            name:req.body.name,
            category:req.body.category,
            likes:req.body.likes,
            imageUrl:req.body.imageUrl
        });
        newImage.save();
        res.send("Image Added successfully!!");
    }catch(err){
        next(err);
    }
});

module.exports = route;