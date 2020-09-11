class Renderer {
    constructor() {
        
    }
    renderAll(data) {
        $(".container").empty()
        const source = $("#weather-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template({ data })
        $(".container").append(newHtml)
    }
}

