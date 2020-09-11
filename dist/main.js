const model = new Model()
const renderer = new Renderer()

const loadPage = function(){
    model.getDataFromDB()
}
loadPage()

$("#load").on("click",function(){
    // model.getDataFromDB().then((data)=>{renderer.renderAll(data)})
    model.getDataFromDB()
    renderer.renderAll(model.cityData)
})

const handleSearch = async function(city){

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

$("#city-btn").on("click",function(){
    const cityValue = $("#city-input").val()
    // const checkExist = document.body.textContent.search(`${cityValue}`)
    // console.log(cityValue)
    handleSearch(cityValue)
    $("#city-input").val("")
})
$(".container").on("click","#saved-btn", async function(){
    console.log("hello")
    const cityName = $(this).closest(".city").find("#name").text()
    // const checkExist = document.body.textContent.search(`${cityName}`)
    const checkExist = $(`body:contains(${cityName})`)
    if(!checkExist){
        await model.saveCity(cityName)   
        renderer.renderAll(model.cityData) 
    }
    // console.log(cityData)
})

// $(".container").on("click","#saved-btn", async function(){
//     console.log("hello")
//     const cityName = $(this).closest(".city").find("#name").text()
//     console.log(cityName)
//     // const cityId = $(this).closest(".city").data().id
//     await model.saveCity(cityName)   
//     renderer.renderAll(model.cityData) 
//     // console.log(cityData)
// })

$(".container").on("click","#removed-btn", async function(){
    console.log("hey")
    const cityName =  $(this).closest(".city").find("#name").text()
    console.log(cityName)
    // const cityId = $(this).closest(".city").data().id
    await model.removeCity(cityName)
    renderer.renderAll(model.cityData)
})
$(".container").on("click","#updated-btn", async function(){
    console.log("updated")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
    await model.updateCity(cityName)
    renderer.renderAll(model.cityData)
})

