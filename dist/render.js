class Renderer {
    constructor() {
        
    }
    renderAll(data) {
        const source = $("#weather-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template({ data })
        $(".container").empty().append(newHtml)
    }
}

