const express = require("express");
const app = express();
const path = require("path")
const indexRouter = require('./allRouters.js');
const { connectdb } = require("./DB/connect.js");
const bodyParser = require('body-parser');
const cors=require("cors")
const  mongoose  = require("mongoose");
require('dotenv').config();
mongoose.set('strictQuery', false);
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))
app.use('/uploads', express.static(path.join(__dirname, './services/uploads/picture')))
app.use('/api/v1/user', indexRouter.userRouter);
app.use('/api/v1/quize', indexRouter.quizeRouter);
app.use('/api/v1/announcement', indexRouter.announcementRouter);
// app.use('/signup', express.static(path.join(__dirname, '../quezes/src/component/logup/Signup.jsx')));

connectdb();
app.listen(process.env.PORT||3000, () => {
    console.log("good job");
});