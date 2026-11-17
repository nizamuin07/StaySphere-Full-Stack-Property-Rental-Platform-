const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");

router.get("/", restaurantController.index);

module.exports = router;
