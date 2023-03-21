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
    let bread = Bread[req.params.arrayIndex]
    res.render('bread', bread);
  })
  

module.exports = breads