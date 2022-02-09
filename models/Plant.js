const mongoose = require('mongoose')

const Plant = mongoose.Schema({
    commonName: {
        type: String,
        required: [true, "Please provide the common name for this entry"]
    },
    scientificName: String,
    lighting: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    description: {
        type: String,
        maxLength: 1000
    }
})

module.exports = mongoose.model("Plant", Plant)