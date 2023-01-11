const router = require('express').Router()

const {
    getPlanets,
    getPlanet,
    createPlanet,
    deletePlanet,
    updatePlanet
} = require('../controllers/planetController')

// GET all recipes
router.get('/', getPlanets)

// GET a single recipe
router.get('/:id', getPlanet)

// POST new recipe
router.post('/', createPlanet)

// DELETE a recipe
router.delete('/:id', deletePlanet)

// UPDATE a recipe
router.patch('/:id', updatePlanet)

module.exports = router