const express = require('express')
const router = express.Router()
const axios = require('axios')
const City = require("../model/City")

const apiKey = "f2d2c49051fb06b13f554f1bea9d785e"
const getUrl = function (cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
}
const cityObj = function(cityData){
    let mapedData = {
        name: cityData.data.name,
        temperature: cityData.data.main.temp,
        condition: cityData.data.weather[0].description,
        icon: cityData.data.weather[0].icon
    }
    return mapedData
}

router.get('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    const lan = req.query.lan
    const lat = req.query.lat
    try {
        const weatherData = await axios.get(getUrl(cityName))
        const getData = cityObj(weatherData)
        console.log(getData)
        res.send(getData)

    } catch (error) {
        console.log(error)
    }
})
// router.get('/city/:cityName', async function (req, res) {
//     const cityName = req.params.cityName
//     try {
//         const weatherData = await axios.get(getUrl(cityName))
//         // const citiesData = weatherData.data
//         // const mapedData = {
//         //     name: citiesData.name,
//         //     temperature: citiesData.main.temp,
//         //     condition: citiesData.weather[0].description,
//         //     icon: citiesData.weather[0].icon
//         // }
//         const getData = cityObj(weatherData)
//         console.log(getData)
//         res.send(getData)

//     } catch (error) {
//         console.log(error)
//     }
// })

router.get("/cities", async function (req, res) {
    const cities = await City.find({})
    console.log(cities)
    res.send(cities)
})

router.post(`/city`, function (req, res) {
    const newCityDB = req.body
    const newCity = new City({ ...newCityDB })
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
router.put('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    try {
        const weatherData = await axios.get(getUrl(cityName))
        const citiesData = weatherData.data
        const mapedData = {
            name: citiesData.name,
            temperature: citiesData.main.temp,
            condition: citiesData.weather[0].description,
            icon: citiesData.weather[0].icon,
            timezone: citiesData.timezone
        }
        // const updatedData = await City.findOneAndUpdate({name: `${cityName}`},mapedData,{new:true})
        // if(updatedData){
        //     res.send(updatedData)
        // }
        // else{
        //     res.send("try again")
        // }
        const updatedData = await City.findOneAndUpdate({name: `${cityName}`},mapedData,{new:true}).exec(function(err,update){

        })
        if(updatedData){
            res.send(updatedData)
        }
        else{
            res.send("try again")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router