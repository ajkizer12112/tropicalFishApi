const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

const Fish = require("../models/Fish")

exports.addFish = asyncHandler(async (req, res, next) => {
     const fish = await Fish.create(req.body);
     res.json({ success: true, data: fish })
})

exports.getAllFish = asyncHandler(async (req, res, next) => {
     res.status(200).json(res.advancedResults)
})

exports.editFish = asyncHandler(async (req, res, next) => {
     let fish = await Fish.findById(req.params.id);
     fish = Object.assign(fish, req.body);
     await fish.save();
     res.json({ success: true, data: fish })
})

exports.getFishById = asyncHandler(async (req, res, next) => {
     const fish = await Fish.findById(req.params.id);
     res.json({ success: true, data: fish })
})

exports.removeFish = asyncHandler(async (req, res, next) => {
     await Fish.findByIdAndRemove(req.params.id);
     res.json({ success: true })
})

