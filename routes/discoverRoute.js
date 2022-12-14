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
        const shuffle = req.query.shuffle;
        var docs = "";
        if(shuffle){
            docs = await Image.aggregate([{$sample:{size:4}}]);
        }else if(sortByDate_order){
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

route.get("/:imageId/likeImage",async (req,res,next) => {
    try{
        const imageId = req.params.imageId;
        const image = await Image.findOne({_id:imageId});
        var no_likes = image.likes;
        no_likes++;
        await Image.updateOne({_id:imageId},{$set:{likes:no_likes}});
        res.send("Saved Image as a favourite!!");
    }catch(err){
        next(err);
    }
});

module.exports = route;