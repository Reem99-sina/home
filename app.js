const express = require("express");
const app = express();
const path = require("path")
const indexRouter = require('./allRouters.js');
const { connectdb } = require("./DB/connect.js");
const bodyParser = require('body-parser');
const  mongoose  = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false);
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
app.use("/",express.static(path.join(__dirname, '../quezes')))
app.use('/api/v1/user', indexRouter.userRouter);
app.use('/api/v1/quize', indexRouter.quizeRouter);
app.use('/api/v1/announcement', indexRouter.announcementRouter);

connectdb();
app.listen(process.env.PORT, () => {
    console.log("good job");
});