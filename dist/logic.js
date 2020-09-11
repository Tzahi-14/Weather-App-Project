class Model {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        const fatch = await $.get("/cities")
        this.cityData = fatch
        console.log(fatch)
        // console.log(this.cityData)
    }
    // works
    async getCityData(cityName) {
        const fatch = await $.get(`/city/${cityName}`)
        this.cityData.push({ ...fatch, saved: false })
        console.log(fatch)
    }

    // async getCityData(cityName) {
    //     const fatch = await $.get(`/city/${cityName}`)
    //     this.cityData.push({...fatch, saved: false })
    //     console.log(fatch)
    // }
    // async getCityData(cityName) {
    //     if(!cityName)
    //     const fatch = await $.get(`/city/${cityName}`)
    //     this.cityData.push({ ...fatch, saved: false })
    //     console.log(fatch)
    // }

    // async saveCity(saveCity) {
    //     for (let i in this.cityData) {
    //         console.log(this.cityData[i].name)
    //         console.log(saveCity)
    //         if (saveCity !== this.cityData[i].name) {
    //             const findCity = this.cityData.find(a => a.name === saveCity)
    //             await $.post("/city", findCity)
    //         }
    //         else{
    //             console.log("city on DB")
    //         }
    //     }
    //     // this.cityData[0].saved =true
    // }
    // const cityName = $(this).closest(".city").find("#name").text()

    async saveCity(city) {
        const findCity = this.cityData.find(a => a.name === city)
        const findCityID = this.cityData.findIndex(a => a.name === city)
        console.log(findCityID)
        await $.post("/city", findCity)
        this.cityData[findCityID].saved = true
    }
    // async saveCity(city){
    //     const findCity = this.cityData.find(a => a.name === city)
    //     await $.post("/city", findCity)
    // }

    // saveCity(saveCity) {
    //     for (let i in this.cityData) {
    //         if (saveCity === this.cityData[i].name) {
    //             $.post(`/city`, this.cityData[i], () => {
    //                 const cityy = this.cityData.find(c => c.name === saveCity)
    //                 if (!cityy) {
    //                     this.cityData.push(cityy)
    //                 } else {
    //                     console.log(`city is already saved`);
    //                 }
    //             })
    //         } else {
    //             console.log(`city already in data-base`);
    //         }
    //     }
    // }

    async removeCity(cityName) {
        const CityNameToDelete = this.cityData.find(a => a.name === cityName)
        console.log(CityNameToDelete)
        await $.ajax({
            method: "DELETE",
            url: `/city/${CityNameToDelete.name}`,
            success: (data) => {
                this.cityData.data = data
                const findCityID = this.cityData.findIndex(a => a.name === cityName)
                console.log(findCityID)
                this.cityData[findCityID].saved = false
            },
            error: function (xhr, text, error) {
                console.log("city not on DB")
            }
        })

    }
    async updateCity(cityName) {
        const cityToUpdate = this.cityData.find(a => a.name === cityName)
        console.log(cityToUpdate)
        await $.ajax({
            method: "PUT",
            url: `/city/${cityToUpdate.name}`,
            success: (data) => {
                this.cityData.data = data
            }
        })
    }
}



// const model = new Model()
// model.getDataFromDB()

