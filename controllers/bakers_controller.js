const express = require('express')
const Baker = require('../models/baker')
const bakerSeedData = require('../models/baker_seed')
const baker = express.Router()

// Index
baker.get('/', (req, res) => {
    Baker.find()
    .populate('breads')
    .then(foundBakers => {
        res.send(foundBakers)
    })
})

// Show
baker.get('/:id', (req,res) => {
    Baker.findById(req.params.id)
    .populate({
        path: 'breads',
        options: { limit: 5 }
    })
    .then(foundBaker => {
        res.render('bakerShow', {
            baker: foundBaker
        })
    })
})

// Seed
baker.get('/data/seed', (res, req) => {
    Baker.insertMany(bakerSeedData)
    .then(newBakers => {
        req.redirect('/breads')
    })
    .catch(err => {
        console.log(err)
    })
})


// DELETE
baker.delete('/:id', (req, res) => {
    Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker => {
      res.status(303).redirect('/breads')
    })
    .catch(err => {
      res.status(404).render('404')
    })
})
  

// Export
module.exports = baker