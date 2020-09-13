const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/city', { useNewUrlParser: true })
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    icon: String,
    saved:Boolean,
    updatedAt:Date
})

const City = mongoose.model("City", citySchema)

module.exports = City