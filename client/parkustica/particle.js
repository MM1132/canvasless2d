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

    #val
    #con
    #newData

    #particle

    constructor(canvas, val, con, newData) {
        this.#canvas = canvas

        this.#val = val
        this.#con = con

        this.#newData = newData

        // Create the particle in html
        this.#particle = document.createElement("div")
        this.#particle.style.position = "absolute"
        this.#particle.style.borderRadius = "100%"
        this.#canvas.getCanvas().appendChild(this.#particle)
    }

    hide = _ => this.#canvas.getCanvas().removeChild(this.#particle)
    
    get pos() {
        return this.#val.pos
    }

    get newData() {
        return this.#newData
    }

    update = _ => {
        // Update color
        this.#val.color.r += this.#val.color.change.r
        this.#val.color.g += this.#val.color.change.g
        this.#val.color.b += this.#val.color.change.b
        this.#val.color.a += this.#val.color.change.a

        // Update velocity
        this.#val.velocity.x += readParameter(this.#con.velocity.x)
        this.#val.velocity.y += readParameter(this.#con.velocity.y)

        // Change position
        this.#val.pos.x += readParameter(this.#con.pos.x) + this.#val.velocity.x
        this.#val.pos.y += readParameter(this.#con.pos.y) + this.#val.velocity.y
        // Update the life
        this.#val.life--

        this.#val.blur += readParameter(this.#con.blur)

        // Update the size
        this.#val.size += readParameter(this.#con.size)

        // Check if needed to delete
        if(this.#val.life <= 0 || this.#val.size <= 0) {
            // Just remove ourselves from the html
            this.#particle.parentNode.removeChild(this.#particle)
            return { action: "delete" }
        }

        this.#particle.style.backgroundColor = dictToRgbaString(this.#val.color)
        this.#particle.style.filter = `blur(${this.#val.blur}px)`
        this.#particle.style.width = `${this.#val.size}px`
        this.#particle.style.height = `${this.#val.size}px`
        this.#particle.style.left = `${this.#val.pos.x-this.#val.size/2}px`
        this.#particle.style.top = `${this.#val.pos.y-this.#val.size/2}px`

        // Everything went well, particle still remains existing
        return false
    }
}