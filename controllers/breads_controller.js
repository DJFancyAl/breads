const express = require('express')
const Bread = require('../models/breads')
const Baker = require('../models/baker')
const seeds = require('../models/seeds')
const breads = express.Router()

// INDEX
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(5).populate('baker')

  res.render('index', {
    title: 'Breads Page',
    breads: foundBreads,
    bakers: foundBakers
  })
})


// NEW
breads.get('/new', async (req, res) => {
  const foundBakers = await Baker.find()
  res.render('new', { bakers: foundBakers })
})

// All Breads
breads.get('/all', async (req, res) => {
  const foundBreads = await Bread.find().populate('baker')

  res.render('all', {
    title: 'Breads Page',
    breads: foundBreads,
  })
})


// CREATE
breads.post('/', async (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  try {
    const createdBread = await Bread.create(req.body)
    res.redirect('/breads')
  } catch(err) {
    res.send(`Uh oh! You can't do that! You must select one of the active bakers.`)
  }
})

// Create Many
breads.get('/data/seed', async (req, res) => {
  const createBreads = await Bread.insertMany(seeds)
  res.redirect('/breads')
})

// Update Many
breads.get('/data/update', async (req, res) => {
  const updatedBreads = await Bread.updateMany({baker: null}, {baker: 'Joey'})
  res.redirect('/breads')
})


// SHOW
breads.get('/:id', async (req, res) => {
  try {
    const foundBread = await Bread.findById(req.params.id).populate('baker')
    const foundBaker = await Baker.findById(foundBread.baker).populate('breads')

    res.render('show', {
        bread: foundBread,
        baker: foundBaker
    })
  } catch(err) {
    res.status(404).render('404')
  }
})


// DELETE
breads.delete('/:id', async (req, res) => {
  try {
    const deletedBread = await Bread.findByIdAndDelete(req.params.id)
    res.status(303).redirect('/breads')
  } catch(err) {
    res.status(404).render('404')
  }
})

// UPDATE
breads.put('/:id', async (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  try {
    const updatedBread = await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.redirect(`/breads/${req.params.id}`)
  } catch(err) {
    res.status(404).render('404')
  }
})

// EDIT
breads.get('/:id/edit', async (req, res) => {
  try {
    const foundBakers = await Baker.find()
    const foundBread = await Bread.findById(req.params.id)
    res.render('edit', {
        bread: foundBread,
        bakers: foundBakers
    })
  } catch(err){
    res.status(404).render('404')
  }
})


module.exports = breads