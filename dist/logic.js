class Model {
    constructor() {
        this.cityData = []
    }

    momentDateFormat(city) {
        return moment(city.updatedAt).format('LLLL')
    }

    async getDataFromDB() {
        const cities = await $.get("/cities")
        cities.forEach(city => {
            city.updatedAt = moment(city.updatedAt).format('LLLL')
            this.cityData.push(city)
        });
    }

    async getCityData(cityName, lat, lon) {
        if (!cityName&&!lat&&!lon) {
            return alert("try again")
        }
        let exist = false
        this.cityData.forEach(a => {
            if (cityName === a.name.toLowerCase()) {
                exist = true
            }
        });
        if (exist) {
            return alert("City already exist, you can update your data")
        }
        const params = lat && lon ? `?lat=${lat}&lon=${lon}` : ''
        const fatch = await $.get(`/city/${cityName}${params}`)
        this.cityData.push({ ...fatch, saved: false })
    }


    async getPosition() {
        return new Promise(function (resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        });
    }

    async getCurrentCity() {
        let position = await this.getPosition()
        await this.getCityData(null, position.coords.latitude, position.coords.longitude)
    }


    async saveCity(city) {
        const findCity = this.cityData.find(a => a.name === city)
        const findCityID = this.cityData.findIndex(a => a.name === city)
        await $.post("/city", findCity)
        findCity.saved = true
    }

    async removeCity(cityName) {
        const CityNameToDelete = this.cityData.find(a => a.name === cityName)
        console.log(CityNameToDelete)
        await $.ajax({
            method: "DELETE",
            url: `/city/${CityNameToDelete.name}`,
            success: (data) => {
                this.cityData.data = data // don't need this line, data return that we deleted this city
                const cityIndex = this.cityData.findIndex(a => a.name === cityName)
                console.log(cityIndex)
                this.cityData[cityIndex].saved = false
            },
            error: function (xhr, text, error) {
                console.log("city not on DB")
            }
        })

    }
    async updateCity(cityName) {
        const cityToUpdate = this.cityData.find(a => a.name === cityName)
        console.log(cityToUpdate)
        const data = await $.ajax({
            method: "PUT",
            url: `/city/${cityToUpdate.name}`
        })
        data.updatedAt = this.momentDateFormat(cityName)
        if (cityToUpdate.name === cityName) {
            for (let i in this.cityData) {
                if (this.cityData[i]["_id"] === data["_id"]) {
                    this.cityData[i] = data
                }
            }
        }
    }

    async checkLastUpadate() {
        if (this.cityData.length > 0) {
            for (let a of this.cityData) {
                let newTime = new moment()
                const diff = moment.duration(newTime.diff(a.updatedAt))._data.hours
                console.log(diff)
                if (diff > 3) {
                    await this.updateCity(a.name)
                }
            }
        }
    }
}

