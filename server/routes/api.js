const express = require('express')
const router = express.Router()
const axios = require('axios')
const City = require("../model/City")

const apiKey = "f2d2c49051fb06b13f554f1bea9d785e"
const getUrl = function (cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
}

router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    try {
        const weatherData = await axios.get(getUrl(cityName))
        const citiesData = weatherData.data
        const mapedData =  {
            name: citiesData.name,
            temperature: citiesData.main.temp,
            condition : citiesData.weather[0].description ,
            icon : citiesData.weather[0].icon
        }
        console.log(mapedData)
        res.send(mapedData)

    } catch (error) {
        console.log(error)
    }
})

router.get("/cities", async function (req, res) {
    const cities = await City.find({})
    console.log(cities)
    res.send(cities)
})

router.post(`/city`, function (req, res) {
    const newCityDB = req.body
    const newCity = new City({...newCityDB})
    newCity.save()
    res.send(newCity)
})

router.delete('/city/:cityName', function (req, res) {
    const cityName = req.params.cityName
    City.find({ name: `${cityName}` }, { new: true }).remove().exec(function (err, deleted) {
        console.log(deleted)
        res.send(deleted)
    });
})

// Expense.findOneAndUpdate({ group: `${group1}` }, { group: `${group2}` }, { new: true }).exec(function (err, group) {
//     res.send(group)
//     console.log(group)
//  })
// router.get('/city/:cityName', async function (req, res) {
//     const cityName = req.params.cityName
//     try {
//         const weatherData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
//         console.log(weatherData.data)
//         res.send(weatherData.data)
//     } catch (error) {
//         console.error(error)
//     }
// })

module.exports = router