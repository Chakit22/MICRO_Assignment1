const {Router} = require("express");
const route = Router();
const Category = require("../models/Categories.js");
const Image = require("../models/galleryImages.js");

route.get("/getAll",(req,res,next) => {
    try{
        Category.find({},function(categories){
            res.send(categories);
        });
    }catch(err){
        next(err);
    }
});

route.get("/getImages/:category",async (req,res,next) => {
    try{
        const sortByDate_order = (!req.query.sortByDate?undefined:(req.query.sortByDate === "asc")?1:-1);
        const sortByLikes = (req.query.sortByLikes?1:0);
        const category_name = req.params.category;
        var docs = "";
        if(sortByDate_order){
            if(sortByLikes){
                docs = await Image.find({category:category_name}).sort({createdAt:sortByDate_order,likes:-1}).limit(4);
            }else{
                docs = await Image.find({category:category_name}).sort({createdAt:sortByDate_order}).limit(4);
            }
        }else{
            if(sortByLikes){
                docs = await Image.find({category:category_name}).sort({likes:-1}).limit(4);
            }else{
                docs = await Image.find({category:category_name}).limit(4);
            }
        }
        res.send(docs);
    }catch(err){
        next(err);
    }
});



module.exports = route;