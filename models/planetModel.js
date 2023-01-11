const mongoose = require('mongoose')

const Schema = mongoose.Schema

const planetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    climate: {
        type: String
    },
    terrain: {
        type: String,
        required: true
    }, 
    diameter: {
        type: Number,
    },
    population: {
        type: Number,
        required: true,
    },
    orbitalPeriod: {
        type: Number,
    },
    rotationPeriod: {
        type: Number,
    },
    surfaceWater: {
        type: Number,
    }
}, { timestamps: true })



module.exports = mongoose.model('Planet', planetSchema,)