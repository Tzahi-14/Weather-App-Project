class Model {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        const fatch = await $.get("/cities")
        this.cityData = fatch
        // console.log(fatch)
        // console.log(this.cityData)
    }
    async getCityData(cityName) {
        console.log(this.cityData.length)
        const fatch = await $.get(`/city/${cityName}`)
        this.cityData += fatch
        console.log(fatch)
        console.log(this.cityData.length)
    }
    saveCity(saveCity) {
        $.post("/city")
        const findCity = this.cityData.find(a => a.name === saveCity)
        console.log(findCity)
        return findCity
    }

    removeCity(cityName) {
        $.ajax({
            method: "DELETE",
            url: `city/${cityName}`,
            success: (data) => {
                this.cityData.data = data
            },
            error: function (xhr, text, error) {
                console.log(text)
            }
        })
    }
    // async removeCity(cityName) {
    //     const deleteCity = await $.ajax({
    //         method: "DELETE",
    //         url: `city/${cityName}`,
    //         success: (data)=>{
    //             this.cityData.data= data
    //         },
    //         error: function (xhr,text,error){
    //             console.log(text)
    //         }
    //     })
    // }
}


// const model = new Model()
// model.getDataFromDB()

