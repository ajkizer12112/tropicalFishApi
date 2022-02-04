const mongoose = require('mongoose')

const Fish = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    scientificName: {
        type: String,
        required: [true, "scientific name is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    tempMin: Number,
    tempMax: Number,
    minLifespan: Number,
    maxLifespan: Number,
    minpH: Number,
    maxpH: Number,
    minKH: Number,
    maxKH: Number,
    minGH: Number,
    maxGH: Number,
    perGallon: Number,
    isLivebearer: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Fish", Fish)