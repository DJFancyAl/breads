// Dependencies
const mongoose = require('mongoose')
const Bread = require('./breads')
const { Schema } = mongoose

// Schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe'],
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { toJSON: { virtuals: true }})


// Virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})


// Hooks
bakerSchema.post('findOneAndDelete', async function() {
    Bread.deleteMany({ baker: this._conditions._id})
    .then(deleteStatus => {
        console.log(deleteStatus)
    })
})


//Export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
