const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/city', { useNewUrlParser: true })
const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    icon: String,
    saved:Boolean
})

const City = mongoose.model("City", citySchema)

// let s = new City({
//     name: "Tel-Aviv",
//     temperature: 30,
//     condition:"good",
//     conditionPic:"nice"
// })

// s.save()

module.exports = City