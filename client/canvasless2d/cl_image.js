export default class CL_Image {
    #canvas
    #image
    #pos = {
        x: 0,
        y: 0
    }
    constructor(canvas, url) {
        this.#canvas = canvas

        this.#image = document.createElement('div')
        this.#image.style.backgroundImage = url
        this.#image.style.position = 'absolute'
        this.#image.style.top = `${this.#pos.y}px`
        this.#image.style.left = `${this.#pos.x}px`
    }

    setPos = (x, y) => {
        this.#pos = {
            x: x,
            y: y
        }
    }

    show = _ => {
        this.#canvas.appendChild(this.#image)
    }

    hide = _ => {
        this.#canvas.removeChild(this.#canvas)
    }
}