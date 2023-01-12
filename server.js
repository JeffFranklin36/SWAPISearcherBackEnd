require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const planetRoutes = require('./routes/planets')
const peopleRoutes = require('./routes/people')
// const speciesRoutes = require('./routes/species')
// const starshipRoutes = require('./routes/starships')
// const vehicleRoutes = require('./routes/vehicles')

// express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
 console.log(req.path, req.method)
 next()
})

// routes
app.use('/api/planets', planetRoutes)
app.use('/api/people', peopleRoutes)
// app.use('/api/species', speciesRoutes)
// app.use('/api/starships', starshipRoutes)
// app.use('/api/vehicle', vehicleRoutes)

// connect to mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('DB is connected listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })