export default class Button {
    #canvas; #action; #clicked; #button;

    constructor(canvas, data) {
        this.#canvas = canvas

        this.#action = data.action
        this.#clicked = false

        // Create the element and add styles to it
        this.#button = document.createElement("div")
        this.#button.style.fontSize = "40px"
        this.#button.style.color = "black"
        this.#button.style.userSelect = "none"
        this.#button.style.position = "absolute"
        this.#button.style.cursor = "pointer"
        this.#button.style.transition = "0.2s"
        this.#button.textContent = data.label

        // Positioning things
        this.#canvas.appendChild(this.#button)
        this.#button.style.top = `${data.pos.y}px`
        if(data.pos.x == "center") {
            this.#button.style.left = `${this.#canvas.clientWidth/2-this.#button.clientWidth/2}px`
        } else {
            this.#button.style.left = `${data.pos.x}px`
        }

        // Event listeners for hovering color
        this.#button.addEventListener("mouseenter", (e) => {
            this.#button.style.color = "rgb(170, 50, 120)"
        });
        this.#button.addEventListener("mouseleave", (e) => {
            this.#button.style.color = "black"
        });

        // Add a click listener for the button
        this.#button.addEventListener("click", (e) => {
            this.#clicked = true
        });
    }

    update = _ => {
        if(this.#clicked) {
            // Change the color back to default
            this.#button.style.color = "black"

            this.#clicked = false
            return this.#action
        }
        return false
    }
}