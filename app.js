const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const  route  = require("./routes/web");
require("dotenv").config();

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo db connected"));

app.set("view engine","ejs")

app.use("/",route)

app.listen(3000,()=>{
    console.log(`Server running at http://localhost:3000`);
})


