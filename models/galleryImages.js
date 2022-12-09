const mongoose = require("mongoose");
const imageSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        category:[String],
        likes:Number,
        imageUrl:String
    },
    {timestamps:true}
);

const Image = new mongoose.model("Image",imageSchema);
module.exports = Image;