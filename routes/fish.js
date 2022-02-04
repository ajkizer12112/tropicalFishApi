const express = require('express')

const {getFishs, addFish, getFishById, editFish, removeFish} = require("../controllers/fish")

const router = express.Router();

router.route("/")
            .get(getFishs)
            .post(addFish)
router.route("/:id")
            .get(getFishById)
            .put(editFish)
            .delete(removeFish)

module.exports = router;