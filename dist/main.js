const model = new Model()
const renderer = new Renderer()

const loadPage = async function () {
    await model.getDataFromDB()
    await model.getCurrentCity()
    await model.checkLastUpadate()
    renderer.renderAll(model.cityData)
}
loadPage()
const current = async function () {
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
    const cityName = $(this).closest(".city").find("#name").text()
    await model.saveCity(cityName)
    renderer.renderAll(model.cityData)
})

$(".container").on("click", "#removed-btn", async function () {
    const cityName = $(this).closest(".city").find("#name").text()
    await model.removeCity(cityName)
    renderer.renderAll(model.cityData)
})
$(".container").on("click", "#updated-btn", async function () {
    const cityName = $(this).closest(".city").find("#name").text()
    await model.updateCity(cityName)
    renderer.renderAll(model.cityData)
})


