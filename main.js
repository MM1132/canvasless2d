import Engine from "./engine.js"

// To the engine we just pass the element to which we are passing the entire game to
let container = document.getElementById('game-container')
let engine = new Engine(container)

// The engine always calculates everything as 1000px high
// So every time we resize, we calculate the % multipler for the rize we are actually at
window.addEventListener('resize', _ => {
    // Screen height
    let sh = window.innerHeight - 40

    // Calculate the multiplier
    let multiplier = sh / 640

    let chh = ((multiplier * 640) / 2)

    // Set the transforms
    container.style.transform = `scale(${multiplier})`
})
window.dispatchEvent(new Event('resize'))

const mainLoop = () => {
    engine.update()

    window.requestAnimationFrame(mainLoop)
}
mainLoop()