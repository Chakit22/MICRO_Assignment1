const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
    {
        name:String,
        category:[String],
        likes:Number,
        imageUrl:String
    },
    {timestamps:true}
);

const Category = new mongoose.model("Image",imageSchema);
module.exports = Category;