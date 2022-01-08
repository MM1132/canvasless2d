import ParticleFountain from "./particlefountain.js"

export default class FountainManager {
    #canvas; #fountainList;

    constructor(canvas) {
        this.#canvas = canvas

        this.#fountainList = new Array()
    }

    createNewFountain = data => {
        let newFountain = new ParticleFountain(this.#canvas, data)
        this.#fountainList.push(newFountain)
        return newFountain
    }

    get particleCount() {
        let sum = 0
        this.#fountainList.forEach(i => { sum += i.particleCount })
        return sum
    }

    hide = _ => this.#fountainList.forEach(i => { i.hide() })

    clear = _ => this.#fountainList.forEach(i => { i.clear() })

    update = _ => {
        // Fountains
        for(let i = this.#fountainList.length - 1; i > -1; i--) {
            // Check if we have to remove it from the list
            let returnValue = this.#fountainList[i].update()
            if(returnValue) {
                if(returnValue.action == "delete") {
                    this.#fountainList.splice(i, 1)
                } else if(returnValue.action == "newfountains") {
                    returnValue.fountains.forEach(j => { this.createNewFountain(j) })
                }
            }
        }
    }
}

