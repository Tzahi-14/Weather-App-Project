const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const api = require('./server/routes/api')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/city', { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', api)

const port = 3030
app.listen(process.env.PORT || port, function () {
    console.log(`running server on port ${port}`)
})
