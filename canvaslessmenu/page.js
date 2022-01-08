import FountainManager from "../parkustica/fountainManager.js";
import Button from "./button.js";
import { createSubCanvas } from "./utils.js";

export default class Page {
    #canvas; #buttons; #pageCanvas; #fountainManager;

    constructor(canvas, data) {
        this.#canvas = canvas

        // Contain all the buttons
        this.#buttons = new Array()

        this.#pageCanvas = createSubCanvas(this.#canvas)
        this.#canvas.appendChild(this.#pageCanvas)

        // Particle Fountain manager
        this.#fountainManager = new FountainManager(this.#pageCanvas)
        if("particleFountains" in data) {
            for(let i of data.particleFountains) {
                this.#fountainManager.createNewFountain(i)
            }
        }

        // Create the buttons for the page
        for(let i of data.buttons) {
            this.#buttons.push(new Button(this.#pageCanvas, i))
        }

        this.hide()
    }

    get particleCount() {
        return this.#fountainManager.particleCount
    }

    show = _ =>
        this.#canvas.appendChild(this.#pageCanvas)

    hide = _ => {
        this.#canvas.removeChild(this.#pageCanvas)

        this.#fountainManager.hide()
        this.#fountainManager.clear()
    }

    // Call updates of all the buttons
    update = _ => {
        // Buttons
        for(let i of this.#buttons) {
            let action = i.update()
            if(action) {
                return action
            }
        }

        // Particle Fountains
        this.#fountainManager.update()
    }
}