const express = require("express");
const app = express();

app.listen(process.env.PORT,(req,res) => {
    console.log(`Server up and running on PORT ${process.env.PORT},`);
});