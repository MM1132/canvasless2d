import Rect from "./rect.js";

export default class CanvasContext {
    #canvas;

    constructor(canvas) {
        this.#canvas = canvas

        this.style = {
            color: "black"
        }
    }

    createRect = (x, y, width, height) => new Rect(this.#canvas, this.style, x, y, width, height)
}