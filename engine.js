import { mainMenu, pauseMenu } from "./canvaslessmenu/menuConfig.js"
import Menu from "./canvaslessmenu/menu.js"

import Game from "./game.js"

export default class Engine {
    #canvas; #stack; #game; #mainMenu; #pauseMenu; #particleCounter; #counterText;

    constructor(canvas) {
        this.#canvas = canvas

        this.#stack = new Array()

        this.#mainMenu = new Menu(this.#canvas, mainMenu)
        this.#pauseMenu = new Menu(this.#canvas, pauseMenu)

        this.switchScreen(this.#mainMenu)

        this.#counterText = document.createElement("div")
        this.#counterText.textContent = `${this.#stack[this.#stack.length-1].particleCount}`
        document.querySelector("body").appendChild(this.#counterText)
    }

    addScreen = screen => {
        this.#stack.push(screen)
        screen.show()
    }

    // Hide everything else other than the screen passed
    switchScreen = screen => {
        for(let i of this.#stack) {
            i.hide()
        }
        this.#stack = new Array()
        
        this.addScreen(screen)
    }

    update = _ => {
        // Always update the last element
        let actionValue = this.#stack[this.#stack.length-1].update()
        if(actionValue) {
            switch(actionValue) {
                case "start": // New game
                    this.#game = new Game(this.#canvas)
                    this.switchScreen(this.#game)
                    break
                case "paused": // Just pausing
                    this.addScreen(this.#pauseMenu)
                    break
                case "resume": // Return to the already existing game
                    this.switchScreen(this.#game)
                    break
                case "exit":
                    this.switchScreen(this.#mainMenu)
            }
        }

        // And for the simple overview
        this.#counterText.textContent = `${this.#stack[this.#stack.length-1].particleCount}`
    }
}