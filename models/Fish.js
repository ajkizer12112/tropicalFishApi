const mongoose = require('mongoose')

const Fish = mongoose.Schema({
    commonName: {
        type: String,
        required: [true, "name is required"]
    },
    scientificName: String,
    family: String,
    origin: [String],
    temperment: String,
    tankArea: String,
    minTankSize: Number,
    diet: String,
    breeding: String,
    care: String,
    phRange: [Number],
    hardnessRange: [Number],
    temperatureRange: [Number],
    lifespanRange: [Number],
    description: {
        type: String,
        maxLength: 1000
    },
    source: String
})

module.exports = mongoose.model("Fish", Fish)