import Particle from "./particle.js";
import { readParameter, rgbaChange, assignObject } from "./utils.js";
import { DEFAULT_DATA } from "./constants.js";

export default class ParticleFountain {
    #data; #canvas; #particleList;

    constructor(canvas, data) {
        // Initialize data from the constants
        this.#data = JSON.parse(JSON.stringify(DEFAULT_DATA))
        assignObject(this.#data, data)

        this.#canvas = canvas
        this.#particleList = new Array()

        // If the data is not of type fountain
        // assuming that the type exists
        // If the type doesn't exist, we also return
        if(data?.type != "fountain") {
            return
        }

        // If there is no "pre", don't spawn any at the start
        for(let i = 0; i < this.#data.pre?.count; i++) {
            this.createNewParticle()
        }
    }

    createNewParticle = (data = this.#data) => {
        // If there is the "pre" data, use it when creating the new particle
        if(data.fountain.const.chance < Math.random()) {
            return
        }

        // calcaute the starting values for the particle
        let spawn = {
            pos: {
                x: readParameter(data.particle.val.pos.x),
                y: readParameter(data.particle.val.pos.y)
            },
            size: readParameter(data.particle.val.size),
            life: readParameter(data.particle.val.life),
            blur: readParameter(data.particle.val.blur),
            color: rgbaChange(data.particle.val.color)
        };

        // If we have angle, do it with the angle / else do it without
        let angle = readParameter(data.particle.val?.angle)
        let speed = readParameter(data.particle.val?.speed)
        // If angle and speed both existed
        if(angle && speed) {
            spawn.velocity = {
                x: speed * Math.cos(angle),
                y: speed * Math.sin(angle)
            }
        } else {
            spawn.velocity = {
                x: readParameter(data.particle.val.velocity.x),
                y: readParameter(data.particle.val.velocity.y)
            }
        }

        let active = JSON.parse(JSON.stringify(data.particle.const))
        active.size = readParameter(data.particle.const.size)

        this.#particleList.push(new Particle(
            this.#canvas, 
            spawn,
            active,
            data?.newData // If there is no newData, just give "undefined"
        ));
    }

    get particleCount() {
        return this.#particleList.length
    }

    hide = _ => this.#particleList.forEach(i => { i.hide() })

    clear = _ => this.#particleList = new Array()

    update = _ => {
        // Check if we still need to spawn in new particles
        if(this.#data.fountain.val.spawnsLeft > 0 || this.#data.fountain.val.spawnsLeft == -1) {
            // Spawn in a new particle at the position
            for(let i = 0; i < this.#data.fountain.const.count; i++) {
                this.createNewParticle()
            }
        } else { // The data.spawnsLeft is 0, so check if we have any particles left
            if(this.#particleList.length == 0) {
                // Remove itself
                return { action: "delete" }
            }
        }

        // Make it smaller
        if(this.#data.fountain.val.spawnsLeft != -1 && this.#data.fountain.val.spawnsLeft > 0) {
            this.#data.fountain.val.spawnsLeft--
        }

        // Update all the particles
        let newFountainData = {
            action: "newfountains",
            fountains: new Array()
        }
        for(let i = this.#particleList.length - 1; i > -1; i--) {
            // The call for the particle returns true if the particle must be removed
            let returnValue = this.#particleList[i].update()
            if(returnValue && returnValue.action == "delete") {
                // If there is death data of type fountain
                if(this.#particleList[i].newData?.death?.type == "fountain") {
                    this.#particleList[i].newData.death.spawn.pos = this.#particleList[i].pos
                    newFountainData.fountains.push(JSON.parse(JSON.stringify(this.#particleList[i].newData.death)))
                } else if(this.#particleList[i].newData?.death?.type == "particle") {
                    this.#particleList[i].newData.death.spawn.pos = this.#particleList[i].pos
                    this.createNewParticle(this.#particleList[i].newData.death)
                }
                
                this.#particleList.splice(i, 1)
            } else { // If the particle is not deleted, check if we need to spawn in a trail
                if(this.#particleList[i].newData?.trail?.type == "fountain") {
                    this.#particleList[i].newData.trail.spawn.pos = this.#particleList[i].pos
                    newFountainData.fountains.push(JSON.parse(JSON.stringify(this.#particleList[i].newData.trail)))
                } else if(this.#particleList[i].newData?.trail?.type == "particle") {
                    this.#particleList[i].newData.trail.spawn.pos = this.#particleList[i].pos
                    this.createNewParticle(this.#particleList[i].newData.trail)
                }
            }
        }

        // There are new fountains to be spawned in
        if(newFountainData.fountains.length > 0)
            return newFountainData

        return false
    }
}