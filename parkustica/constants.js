// All the default values for the particle and the fountain
export const DEFAULT_DATA = {
    pre: {
        chance: 1,
        count: 0
    },
    fountain: {
        con: {
            chance: 1,
            count: 1
        },
        val: {
            spawnsLeft: -1
        }
    },
    particle: {
        val: {
            size: 5,
            life: 100,
            pos: {
                x: 500,
                y: 300
            },
            velocity: {
                x: 0,
                y: 0
            },
            angle: 0,
            speed: 0,
            color: [
                {
                    start: "rgb(0, 0, 0)",
                    end: "rgb(0, 0, 0)",
                    speed: 0
                }
            ],
            blur: 0
        },
        con: {
            size: 0,
            pos: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            blur: 0
        },
        newData: null
    }
}