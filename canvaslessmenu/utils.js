export const createSubCanvas = canvas => {
    let subCanvas = document.createElement("div")
    subCanvas.style.height = `${canvas.clientHeight}px`
    subCanvas.style.width = `${canvas.clientWidth}px`
    subCanvas.style.overflow = "hidden"
    subCanvas.style.position = "absolute"
    return subCanvas
}