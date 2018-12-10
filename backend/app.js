const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Post = require('./models/post');
const app = express();
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const User = require("./models/user");
mongoose.connect('mongodb+srv://Nagarjuna:PMVYeJ8KTh6FCNVy@cluster0-z0tll.mongodb.net/node-angular')
.then(() =>{
  console.log('mongoose connected to database');
})
.catch(()=>{
  console.log('connection not established');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT,PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

app.use("/api/user", userRoutes);

module.exports = app;
