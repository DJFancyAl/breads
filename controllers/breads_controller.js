const express = require('express')
const Bread = require('../models/breads')
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
  Bread.insertMany([
      {
        name: 'Rye',
        hasGluten: true,
        image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      },
      {
        name: 'French',
        hasGluten: true,
        image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
      },
      {
        name: 'Gluten Free',
        hasGluten: false,
        image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
      },
      {
        name: 'Pumpernickel',
        hasGluten: true,
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
      }
    ])
    .then(createdBreads => {
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