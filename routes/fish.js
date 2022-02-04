const express = require('express')

const { getAllFish, addFish, getFishById, editFish, removeFish } = require("../controllers/fish")

const router = express.Router();

router.route("/")
    .get(getAllFish)
    .post(addFish)
router.route("/:id")
    .get(getFishById)
    .put(editFish)
    .delete(removeFish)

module.exports = router;