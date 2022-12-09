const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl = process.env.MONGO_DB_URL;
function connect_mongoose(){
    mongoose
        .connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((err) => {
            console.log("Database Not Connected Successfully : " + err);
        });
}

module.exports = connect_mongoose;