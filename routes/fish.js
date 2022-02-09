const express = require('express')

const { getAllFish, addFish, getFishById, editFish, removeFish } = require("../controllers/fish")

const Fish = require("../models/Fish");
const advancedResults = require('../middleware/advancedResults')
const router = express.Router();

router.route("/")
    .get(advancedResults(Fish, "fish"), getAllFish)
    .post(addFish)
router.route("/:id")
    .get(getFishById)
    .put(editFish)
    .delete(removeFish)

module.exports = router;