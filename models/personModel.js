const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    eyeColor: {
        type: String,
    }, 
    weight: {
        type: Number,
    },
    birthYear: {
        type: Number,
    },
    hairColor: {
        type: Number,
    },
    height: {
        type: Number,
    },
    skinColor: {
        type: String,
    }
}, { timestamps: true })



module.exports = mongoose.model('Person', personSchema)