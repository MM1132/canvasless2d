import FountainManager from "./parkustica/fountainManager.js"
import { rainData, cloudData, fireData, fireworksData } from "./parkustica/particlePresets.js"
import { createSubCanvas } from "./canvaslessmenu/utils.js"
import CanvasContext from "./canvasless2d/canvascontext.js"

export default class Game {
    #active; #paused; #canvas; #gameCanvas; #fountainManager; #cc; 
    //#rect;

    constructor(canvas) {
        this.#active = false
        this.#paused = false

        // Mostly used for hide() and show()
        this.#canvas = canvas

        // This canvas shall receive all the shit we render in the game
        this.#gameCanvas = createSubCanvas(this.#canvas)

        // Pause menu thingy
        window.addEventListener("keydown", (e) => {
            if(this.#active) {
                if(e.key == "Escape") {
                    this.#paused = true
                }
            }
        });

        this.#fountainManager = new FountainManager(this.#gameCanvas)
        //this.#fountainManager.createNewFountain(JSON.parse(JSON.stringify(rainData)))
        //this.#fountainManager.createNewFountain(JSON.parse(JSON.stringify(cloudData)))
        //this.#fountainManager.createNewFountain(JSON.parse(JSON.stringify(fireData)))
        this.#fountainManager.createNewFountain(JSON.parse(JSON.stringify(fireworksData)))

        this.#cc = new CanvasContext(this.#canvas)
        this.#cc.style.color = "rgb(20, 50, 200)"
        //this.#rect = this.#cc.createRect(10, 10, 50, 50)
    }

    get particleCount() {
        return this.#fountainManager.particleCount
    }

    show = _ => {
        this.#canvas.appendChild(this.#gameCanvas)
        //this.#rect.show()
        this.#active = true
    }

    hide = _ => {
        this.#canvas.removeChild(this.#gameCanvas)
        //this.#rect.hide()
        this.#active = false
    }

    update = _ => {
        // Deal with the pausing
        if(this.#paused) {
            this.#paused = false
            return "paused"
        }
        
        // Update all the things of the game
        this.#fountainManager.update()
    }
}