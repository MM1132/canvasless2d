import FountainManager from "../parkustica/fountainManager.js";
import Page from "./page.js";
import { createSubCanvas } from "./utils.js";

export default class Menu {
    #canvas; #menuCanvas; #fountainManager; #activePage; #pages;

    constructor(canvas, config) {
        this.#canvas = canvas

        this.#menuCanvas = createSubCanvas(this.#canvas)
        this.#menuCanvas.style.background = config.global.background
        this.#canvas.appendChild(this.#menuCanvas)

        // Now let's also create the global particle thingies
        this.#fountainManager = new FountainManager(this.#menuCanvas)
        /* if("particleFountains" in config.global) {
            for(let i of config.global.particleFountains) {
                this.#fountainManager.createNewFountain(i)
            }
        } */

        this.#activePage = "main"
        this.#pages = new Object()

        // Create pages for the menu
        for(let page in config.pages) {
            this.#pages[page] = new Page(this.#menuCanvas, config.pages[page])
        }
        
        this.hide()
    }

    get particleCount() {
        let sum = 0
        sum += this.#fountainManager.particleCount
        for(let i of Object.keys(this.#pages)) {
            sum += this.#pages[i].particleCount
        }
        return sum
    }

    switchPage = newPage => {
        this.#pages[this.#activePage].hide()
        this.#activePage = newPage
        this.#pages[this.#activePage].show()
    }

    show = _ => {
        this.#pages[this.#activePage].show()
        this.#canvas.appendChild(this.#menuCanvas)
    }

    hide = _ =>
        this.#canvas.removeChild(this.#menuCanvas)

    update = _ => {
        let action = this.#pages[this.#activePage].update()
        if(action) {
            switch(action.type) {
                case 0: // Close off the menu to another screen
                    return action.value
                case 1: // Change the menu page
                    this.switchPage(action.value)
                    break
            }
        }

        // Also, update the fountain manager
        this.#fountainManager.update()
    }
}