const express = require('express')
const Baker = require('../models/baker')
const bakerSeedData = require('../models/baker_seed')
const baker = express.Router()

// Index
baker.get('/', async (req, res) => {
    const foundBakers = await Baker.find().populate('breads')
    res.send(foundBakers)
})

// Show
baker.get('/:id', async (req,res) => {
    const foundBaker = await Baker.findById(req.params.id).populate({ path: 'breads', options: { limit: 5 }})
    res.render('bakerShow', {
        baker: foundBaker
    })
})

// Seed
baker.get('/data/seed', async (res, req) => {
    try {
        const newBakers = await Baker.insertMany(bakerSeedData)
        req.redirect('/breads')
    } catch(err) {
        console.log(err)
    }
})


// DELETE
baker.delete('/:id', async (req, res) => {
    try {
        const deletedBaker = await Baker.findByIdAndDelete(req.params.id)
        res.status(303).redirect('/breads')
    } catch(err) {
        console.log(err)
        res.status(404).render('404')
    }
})
  

// Export
module.exports = baker