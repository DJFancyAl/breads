const express = require('express')
const Bread = require('../models/breads')
const breads = express.Router()
// INDEX
breads.get('/', (req, res) => {
  res.render('index',
  {
    title: 'Breads Page',
    breads: Bread
  }
  )
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  const id = req.params.arrayIndex
  const bread = Bread[id]
  if (bread){
    res.render('show', {bread: bread, index: id})
  } else {
    res.status(404).render('404')
  }
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
  Bread.splice(req.params.indexArray, 1)
  res.status(303).redirect('/breads')
})

  

module.exports = breads