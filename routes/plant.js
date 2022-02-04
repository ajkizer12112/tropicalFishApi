const express = require('express')

const {getPlants, addPlant, getPlantById, editPlant, removePlant} = require("../controllers/plant")

const router = express.Router();

router.route("/")
            .get(getPlants)
            .post(addPlant)
router.route("/:id")
            .get(getPlantById)
            .put(editPlant)
            .delete(removePlant)

module.exports = router;