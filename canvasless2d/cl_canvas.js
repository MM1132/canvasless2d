import Rect from "./rect.js";
import CL_Image from './cl_image.js'

export default class CL_Canvas {
    #container
    #canvas

    constructor(container) {
        this.#container = container

        // Create the canvas
        this.#canvas = document.createElement('div')
        this.#canvas.setAttribute('class', 'canvas')
    }

    getCanvas = _ => this.#canvas

    // Smiles
    show = _ => this.#container.appendChild(this.#canvas)
    hide = _ => this.#container.removeChild(this.#canvas)

    // createRect = (x, y, width, height) => new Rect(this.#canvas, this.style, x, y, width, height)

    // createImage = (url) => new CL_Image(url)
}