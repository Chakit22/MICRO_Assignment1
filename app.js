const express = require("express");
const app = express();
require("dotenv").config();
const mongo = require("./config/connectdb.js");

app.get("/api/health", (req, res) => {
    res.send(`Backend server is active status:active & time:${new Date()}`);
});

app.listen(process.env.PORT || 3000,(req,res) => {
    console.log(`Server up and running on PORT ${process.env.PORT || 3000}.`);
});