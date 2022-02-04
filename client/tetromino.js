import { PIECES } from "./pieces.js"

export default class Tetromino {
    #pos
    #container

    #name
    #color
    #tiles

    constructor(container) {
        this.#container = container

        // Get a random piece
        let data = JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random() * PIECES.length)]))
        this.#name = data.name
        this.#color = data.color
        this.#tiles = data.tiles

        this.#pos = {
            x: 5,
            y: 0
        }
    }

    update = _ => {
        this.#pos.y++
    }
}