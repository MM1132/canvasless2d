import { PIECES } from "./pieces.js"

export default class Tetromino {
    #piece
    #pos
    #container

    constructor(container) {
        this.#container = container

        // Initialize the piece
        /* let data = JSON.parse(JSON.stringify(PIECES[Math.floor(Math.random() * PIECES.length)]))
        for(let i of data.tiles) {
            for(let j of i) {
                
            }
        } */

        this.#pos = {
            x: 5,
            y: 0
        }
    }

    update = _ => {
        this.#pos.y++
    }
}