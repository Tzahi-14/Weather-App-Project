class Model {
    constructor() {
        this.cityData = []
    }

    momentDateFormat (city){
       return moment(city.updatedAt).format('LLLL')
    }

    async getDataFromDB() {
        const fatch = await $.get("/cities")
        fatch.forEach(a => {
            a.updatedAt = moment(a.updatedAt).format('LLLL')
            this.cityData.push(a)
            console.log(a)
        });
    }
   
    async getCityData(cityName, lat, lon) {
        if (!cityName) {
            return
        }
        let exist = false
        this.cityData.forEach(a => {
            if (cityName === a.name.toLowerCase()) {
                exist = true
            }
        });
        if (exist) {
            return alert("City already exist on your Data base, you can update the data")
        }
        if (lat && lon) {
            const fatch = await $.get(`/city/${cityName}?lat=${lat}&lon=${lon}`)
            this.cityData.push({ ...fatch, saved: false })
            console.log(fatch)
        }
        else {
            const fatch = await $.get(`/city/${cityName}`)
            this.cityData.push({ ...fatch, saved: false })
            console.log(fatch)
        }
    }


    async getPosition() {
        return new Promise(function (resolve, reject) {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        });
    }

    async getCurrentCity() {
        let position = await this.getPosition()
        await this.getCityData("dummyCity", position.coords.latitude, position.coords.longitude)
    }
    
    async saveCity(city) {
        const findCity = this.cityData.find(a => a.name === city)
        const findCityID = this.cityData.findIndex(a => a.name === city)
        console.log(findCityID)
        await $.post("/city", findCity)
        this.cityData[findCityID].saved = true
    }

    async removeCity(cityName) {
        const CityNameToDelete = this.cityData.find(a => a.name === cityName)
        console.log(CityNameToDelete)
        await $.ajax({
            method: "DELETE",
            url: `/city/${CityNameToDelete.name}`,
            success: (data) => {
                this.cityData.data = data // don't need this line, data return that we deleted this city
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
                data.updatedAt = this.momentDateFormat(cityName)
                if (cityToUpdate.name === cityName) {
                    for (let i in this.cityData) {
                        if (this.cityData[i]["_id"] === data["_id"]) {
                            this.cityData[i] = data
                        }
                    }
                }

            }
        })
    }
    
     async checkLastUpadate () {
        if (this.cityData.length > 0) {
            console.log("tzahi")
            this.cityData.forEach(a => {
                let newTime = new moment()
                const diff = moment.duration(newTime.diff(a.updatedAt))._data.minutes
                // const diff = moment.duration(new moment().diff(a.updatedAt))
                console.log(diff)
                if (diff > 3) {
                      this.updateCity(a.name)
                }
            });

        }
    }
}



// const model = new Model()
// model.getDataFromDB()

