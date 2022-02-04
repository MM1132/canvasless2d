import FountainManager from "./parkustica/fountainManager.js"
import { rainData, cloudData, fireData, fireworksData } from "./parkustica/particlePresets.js"
import CL_Canvas from "./canvasless2d/cl_canvas.js";
import Board from "./board.js"

export default class Game {
    #container
    #canvas
    #board
    
    #paused
    #timer

    constructor(container) {
        this.#timer = 0

        // The element in which the canvas is going to be in
        this.#container = container

        // Create the canvas
        this.#canvas = new CL_Canvas(this.#container)
        this.show()

        this.#paused = false

        this.#board = new Board(this.#canvas)
    }

    show = _ => this.#canvas.show()
    hide = _ => this.#canvas.hide()

    update = _ => {
        // Deal with the pausing
        if(this.#paused) {
            this.#paused = false
            return "paused"
        }

        this.#timer++
        if(this.#timer > 60) {
            this.#timer = 0

            this.#board.update()
        }
    }
}