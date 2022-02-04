const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Plant = require("../models/Plant")

exports.addPlant = asyncHandler(async (req, res, next) => {
     const plant = await Plant.create(req.body);
     res.json({ success: true, data: plant })
})

exports.getPlants = asyncHandler(async (req, res, next) => {
     const query = {}
     const plants = await Plant.find(query);
     res.json({ success: true, data: plants })
})

exports.editPlant = asyncHandler(async (req, res, next) => {
     let plant = await Plant.findById(req.params.id);
     plant = Object.assign(plant, req.body);
     await plant.save();
     res.json({ success: true, data: plant })
})

exports.getPlantById = asyncHandler(async (req, res, next) => {
     const plant = await Plant.findById(req.params.id);
     res.json({ success: true, data: plant })
})

exports.removePlant = asyncHandler(async (req, res, next) => {
     await Plant.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

