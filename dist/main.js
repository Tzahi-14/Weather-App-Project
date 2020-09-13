const model = new Model()
const renderer = new Renderer()

const loadPage = async function () {
    model.getDataFromDB()
    await model.getCurrentLocationData()
    console.log(model.cityData)
    renderer.renderAll(model.cityData)
}
loadPage()
const current = async function () {
    debugger
    await model.getCityData()

}
debugger
current()
// model.getCurrentLocationData()
// renderer.renderAll(model.cityData)


$("#load").on("click", function () {
    // model.getDataFromDB().then((data)=>{renderer.renderAll(data)})
    model.getDataFromDB()
    renderer.renderAll(model.cityData)
})

const handleSearch = async function (city, lat, lon) {
    // debugger
    await model.getCityData(city)
    renderer.renderAll(model.cityData)
}

// $(".container").on("click", "#img", function () {
//     const firstAndLast = $(this).closest("div").data().id
//     const playerStatsDivId = render.getStatsDivId(firstAndLast)
//     const getPlayer = document.getElementById(playerStatsDivId)
//     if (!getPlayer) {
//         logic.playerStats(firstAndLast).then((stats) => { render.renderStats(stats, this) }).catch((error) => {
//             alert("This player doesn't have stats")
//         })
//     }
// })

$("#city-btn").on("click", function () {
    const cityValue = $("#city-input").val()
    // const checkExist = document.body.textContent.search(`${cityValue}`)
    // console.log(cityValue)
    handleSearch(cityValue)
    $("#city-input").val("")
})
// $(".container").on("click","#saved-btn", async function(){
//     console.log("hello")
//     const cityName = $(this).closest(".city").find("#name").text()
//     // const checkExist = document.body.textContent.search(`${cityName}`)
//     const checkExist = $(`body:contains(${cityName})`)
//     if(!checkExist){
//         await model.saveCity(cityName)   
//         renderer.renderAll(model.cityData) 
//     }
//     // console.log(cityData)
// })

$(".container").on("click", "#saved-btn", async function () {
    console.log("hello")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
    // const cityId = $(this).closest(".city").data().id
    await model.saveCity(cityName)
    renderer.renderAll(model.cityData)
    // console.log(cityData)
})

$(".container").on("click", "#removed-btn", async function () {
    console.log("hey")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
    // const cityId = $(this).closest(".city").data().id
    await model.removeCity(cityName)
    renderer.renderAll(model.cityData)
})
$(".container").on("click", "#updated-btn", async function () {
    console.log("updated")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
    await model.updateCity(cityName)
    renderer.renderAll(model.cityData)
})

// const getCurrentLocationData = function (city,) {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             this.getCityData("dummyCity", position.coords.latitude, position.coords.longitude)
//         });
//     }
// }