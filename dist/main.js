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
    // const cityValue = $("#city-input").val()
    // console.log(cityValue)
    model.getCityData(city) 
} 

$("#city-btn").on("click",function(){
    const cityValue = $("#city-input").val()
    // console.log(cityValue)
    handleSearch(cityValue)
})
// $("#team-btn").on("click", function () {
//     const inputTeamName = $("#team-input").val()
//     logic.fetchTeam(inputTeamName).then((data) => { render.renderAll(data) })
// })

loadPage()