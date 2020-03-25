const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

// MongoDB Connection
// const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test-cluster1-kppwc.mongodb.net/test?retryWrites=true&w=majority`;

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log("Mongo Connected!");

// EJS Middleware
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
// home
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
