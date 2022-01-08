import Engine from "./engine.js"

let canvas = document.getElementById("canvas")

let engine = new Engine(canvas)

const mainLoop = () => {
    engine.update()

    window.requestAnimationFrame(mainLoop)
}
mainLoop()