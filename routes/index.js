const express = require("express");
const router = express.Router();

require("dotenv").config();

// Home Page
router.get("/", (req, res) => res.render("index", {layout: false}));

module.exports = router;
