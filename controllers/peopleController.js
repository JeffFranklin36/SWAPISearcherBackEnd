const Person = require('../models/personModel')
const mongoose = require('mongoose')
const axios = require('axios')

// get all People
const getPeople = async (req, res) => {
    const myPeople = await Person.find({}).sort({ createAt: -1 });
    const swapiPeople = await axios.get('https://swapi.dev/api/people/').then(response => response.data.results);
    const people = [...myPeople, ...swapiPeople];
    res.status(200).json(people);
}



// get a single Person
const getPerson = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    const person = await Person.findById(id)

    if (!person) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    res.status(200).json(person)
}

// create new person
const createPerson = async (req, res) => {
    const { name, gender, eyeColor, weight, birthYear, hairColor, height, skinColor } = req.body
    // add doc to DB
    try {
        const person = await Person.create({ name, gender, eyeColor, weight, birthYear, hairColor, height, skinColor })
        res.status(200).json(person)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a person
const deletePerson = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    const person = await Person.findOneAndDelete({ _id: id })

    if (!person) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    res.status(200).json(person)
}

// update a person
const updatePerson = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    const person = await Person.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!person) {
        return res.status(404).json({ error: 'This is not the person your looking for' })
    }

    res.status(200).json(person)
}

module.exports = {
    getPeople,
    getPerson,
    createPerson,
    deletePerson,
    updatePerson
}