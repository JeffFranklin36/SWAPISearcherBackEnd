const router = require('express').Router()

const {
    getPeople,
    getPerson,
    createPerson,
    deletePerson,
    updatePerson
} = require('../controllers/peopleController')

// GET all recipes
router.get('/', getPeople)

// GET a single recipe
router.get('/:id', getPerson)

// POST new recipe
router.post('/', createPerson)

// DELETE a recipe
router.delete('/:id', deletePerson)

// UPDATE a recipe
router.patch('/:id', updatePerson)

module.exports = router