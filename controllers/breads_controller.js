const express = require('express')
const Bread = require('../models/breads')
const seeds = require('../models/seeds')
const breads = express.Router()

// INDEX
breads.get('/', (req, res) => {
  Bread.find().then(foundBreads => {
    res.render('index', {
      title: 'Breads Page',
      breads: foundBreads
    })  
  })
})


// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})


// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body).then(createdBread => {
    res.redirect('/breads')
  })
  .catch(err => {
    res.send(`Uh oh! You can't do that! You must select one of the active bakers.`)
  })
})

// Create Many
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seeds)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

// Update Many
breads.get('/data/update', (req, res) => {
  Bread.updateMany({baker: null}, {baker: 'Joey'})
    .then(updatedBreads => {
      res.redirect('/breads')
    })
})


// SHOW
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
        Bread.getBakersItems(foundBread.baker).then(items => {
          const breads = items
          res.render('show', {
              bread: foundBread,
              bakersBreads: breads
          })
        })
      })
      .catch(err =>{
        res.status(404).render('404')
      })
})


// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
  .then(deletedBread => {
    res.status(303).redirect('/breads')
  })
  .catch(err => {
    res.status(404).render('404')
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(updatedBread => {
    res.redirect(`/breads/${req.params.id}`)
  })
  .catch(err => {
    res.status(404).render('404')
  })
})

// EDIT
breads.get('/:id/edit', (req, res) => {
  Bread.findById(req.params.id)
      .then(foundBread => {
          res.render('edit', {
              bread: foundBread
          })
      })
      .catch(err =>{
        res.status(404).render('404')
      })
})


module.exports = breads