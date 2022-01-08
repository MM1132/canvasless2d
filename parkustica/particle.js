import ParticleFountain from "./particlefountain.js"
import { readParameter, dictToRgbaString } from "./utils.js"

export default class Particle {
    // Here, we need many things
    // As such:
    // Particle shapes/sizes
    // Different color options
    // The way colors change
    // The way position changes
    // The chance of shapes/sizes

    #canvas
    #newData
    #pos
    #life
    #size
    #velocity
    #color
    #colorChange
    #blur
    
    #active
    #particle

    constructor(canvas, spawn, active, newData) {
        this.#canvas = canvas

        this.#newData = newData

        this.#pos = spawn.pos
        this.#life = spawn.life
        this.#size = spawn.size
        this.#velocity = spawn.velocity
        this.#color = spawn.color.start
        this.#colorChange = spawn.color.change
        this.#blur = spawn.blur

        // DeepCopy all the data
        this.#active = active

        // Create the particle in html
        this.#particle = document.createElement("div")
        this.#particle.style.position = "absolute"
        this.#particle.style.borderRadius = "100%"
        this.#canvas.appendChild(this.#particle)
    }

    hide = _ =>
        this.#canvas.removeChild(this.#particle)
    
    get pos() {
        return this.#pos
    }

    get newData() {
        return this.#newData
    }

    update = _ => {
        // Update color
        this.#color.r += this.#colorChange.r
        this.#color.g += this.#colorChange.g
        this.#color.b += this.#colorChange.b
        this.#color.a += this.#colorChange.a

        // Update velocity
        this.#velocity.x += readParameter(this.#active.velocity.x)
        this.#velocity.y += readParameter(this.#active.velocity.y)

        // Change position
        this.#pos.x += readParameter(this.#active.pos.x) + this.#velocity.x
        this.#pos.y += readParameter(this.#active.pos.y) + this.#velocity.y

        // Update the life
        this.#life--

        this.#blur += readParameter(this.#active.blur)

        // Update the size
        this.#size += readParameter(this.#active.size)

        // Check if needed to delete
        if(this.#life <= 0 || this.#size <= 0) {
            // Just remove ourselves from the html
            this.#particle.parentNode.removeChild(this.#particle)
            return { action: "delete" }
        }

        this.#particle.style.backgroundColor = dictToRgbaString(this.#color)
        this.#particle.style.filter = `blur(${this.#blur}px)`
        this.#particle.style.width = `${this.#size}px`
        this.#particle.style.height = `${this.#size}px`
        this.#particle.style.left = `${this.#pos.x-this.#size/2}px`
        this.#particle.style.top = `${this.#pos.y-this.#size/2}px`

        // Everything went well, particle still remains existing
        return false
    }
}