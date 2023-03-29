require("dotenv").config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => { console.log('connected to mongo: ', process.env.MONGO_URI) })


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