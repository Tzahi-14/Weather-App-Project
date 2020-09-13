const model = new Model()
const renderer = new Renderer()

const loadPage = async function () {
    await model.getDataFromDB()
    await model.getCurrentCity()
    await model.checkLastUpadate()
    console.log(model.cityData.length)
    renderer.renderAll(model.cityData)
}
loadPage()
const current = async function () {
    debugger
    await model.getCityData()
}


const handleSearch = async function (city) {
    await model.getCityData(city)
    renderer.renderAll(model.cityData)
}

$("#city-btn").on("click", function () {
    const cityValue = $("#city-input").val()
    handleSearch(cityValue)
    $("#city-input").val("")
})

$(".container").on("click", "#saved-btn", async function () {
    console.log("hello")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
    await model.saveCity(cityName)
    renderer.renderAll(model.cityData)
})

$(".container").on("click", "#removed-btn", async function () {
    console.log("hey")
    const cityName = $(this).closest(".city").find("#name").text()
    console.log(cityName)
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

// const t= new moment()
// const t1= new moment()
// const t3= moment.duration(t.diff(t1))
// console.log(t3);
// const checkLastUpadate = async function(){
//     if(model.cityData.length>0){
//         console.log("tzahi")
//         model.cityData.forEach(a => {
//             const diff =  moment.duration(new moment().diff(a.date))
//             if(diff>3){
//                await model.updateCity(a.name)
//             }
//         });

//     }
// }

