export default class Rect {
    #canvas; #rect;

    constructor(canvas, style, x, y, width, height) {
        this.#canvas = canvas

        this.#rect = document.createElement("div")

        this.#rect.style.backgroundColor = style.color

        this.#rect.style.position = "absolute"
        this.#rect.style.left = `${x}px`
        this.#rect.style.top = `${y}px`
        this.#rect.style.width = `${width}px`
        this.#rect.style.height = `${height}px`
    }

    show = _ =>
        this.#canvas.appendChild(this.#rect)

    hide = _ =>
        this.#canvas.removeChild(this.#rect)
}