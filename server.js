require("dotenv").config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));


// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Wildcard Route
app.get('*', (req,res) => {
  res.status(404).render('404');
})

// LISTEN
app.listen(PORT, () => {
  console.log('Listening on port:', PORT);
})  