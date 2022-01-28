import Game from "./game.js"

export default class Engine {
    #container
    #stack
    #game

    constructor(container) {
        // This is the container where all the action is going to be taking place in
        this.#container = container

        this.#stack = new Array()

        // The game itself, that we are creating inside the container
        this.#game = new Game(this.#container)
        // And then we are switching the screen to the game

        // This does not only append the element to the canvas, 
        // but it also pushes the reference to that element to the stack
        this.switchScreen(this.#game)
    }

    // Add an element to the stack and also show it
    addScreen = screen => {
        this.#stack.push(screen)
        screen.show()
    }

    // Hide everything else other than the screen passed
    switchScreen = screen => {
        // Hide everything that is currently in the stack
        for(let i of this.#stack) {
            i.hide()
        }
        
        // Then just empty the stack
        this.#stack = new Array()
        
        // And add the element to the screen that was passed
        this.addScreen(screen)
    }

    // Update is being called all the time in the game loop
    update = _ => {
        // Always update the last element
        let actionValue = this.#stack[this.#stack.length-1].update()
        if(actionValue) {
            switch(actionValue) {
                case "start": // New game
                    this.#game = new Game(this.#container)
                    this.switchScreen(this.#game)
                    break
                /* case "paused": // Just pausing
                    this.addScreen(this.#pauseMenu)
                    break */
                case "resume": // Return to the already existing game
                    this.switchScreen(this.#game)
                    break
                /* case "exit":
                    this.switchScreen(this.#mainMenu)
                    break */
            }
        }

        // And for the simple overview
        //this.#counterText.textContent = `${this.#stack[this.#stack.length-1].particleCount}`
    }
}