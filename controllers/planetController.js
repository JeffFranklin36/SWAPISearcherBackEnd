const Planet = require('../models/planetModel')
const mongoose = require('mongoose')
const axios = require('axios')

// get all planets
const getPlanets = async (req, res) => {
    const myPlanets = await Planet.find({}).sort({ createAt: -1 });
    const swapiPlanets = await axios.get('https://swapi.dev/api/planets/').then(response => response.data.results);
    const planets = [...myPlanets, ...swapiPlanets];
    res.status(200).json(planets);
}



// get a single planet
const getPlanet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    const planet = await Planet.findById(id)

    if (!planet) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    res.status(200).json(planet)
}

// create new planet
const createPlanet = async (req, res) => {
    const { name, climate, diameter, terrain, orbitalPeriod, rotationPeriod, population, surfaceWater } = req.body
    // add doc to DB
    try {
        const planet = await Planet.create({ name, climate, diameter, terrain, orbitalPeriod, rotationPeriod, population, surfaceWater })
        res.status(200).json(planet)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a planet
const deletePlanet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    const planet = await Planet.findOneAndDelete({ _id: id })

    if (!planet) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    res.status(200).json(planet)
}

// update a planet
const updatePlanet = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    const planet = await Planet.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!planet) {
        return res.status(404).json({ error: 'This is not the planet your looking for' })
    }

    res.status(200).json(planet)
}

module.exports = {
    getPlanets,
    getPlanet,
    createPlanet,
    deletePlanet,
    updatePlanet
}