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
  const bread = Bread[req.params.arrayIndex]
  if (bread){
    res.render('show', {bread: bread})
  } else {
    res.status(404).send("404 - Page not found.")
  }
})
  

module.exports = breads