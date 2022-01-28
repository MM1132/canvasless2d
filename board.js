import { emptyMatrix } from "./kangutil.js"
import Tetromino from "./tetromino.js"

export default class Board {
    #container
    #matrix
    #tetromino

    constructor(container) {
        this.#container = container

        this.#matrix = emptyMatrix(10, 20)
        this.#tetromino = new Tetromino(this.#container)
    }

    update = _ => {
        this.#tetromino.update()
    }
}