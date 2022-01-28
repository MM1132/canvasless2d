let fireData1 = {
    type: "fountain",
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
            size: 28,
            life: {
                min: 80,
                max: 120
            },
            pos: {
                x: 100,
                y: 600
            },
            velocity: {
                x: 0,
                y: -3.5
            },
            color: [
                {
                    start: "rgb(155, 0, 255)",
                    end: "rgb(255, 255, 0)",
                    speed: 0.01
                }
            ]
        },
        con: {
            pos: {
                x: {
                    min: -3,
                    max: 3
                },
                y: {
                    min: -3,
                    max: 3
                }
            }
        }
    }
}

let fireData2 = JSON.parse(JSON.stringify(fireData1));
fireData2.particle.val.pos.x = 900;

export let mainMenu = {
    global: {
        background: "url(./brickwall.jpg)",
        particleFountains: [
            fireData1,
            fireData2
        ]
    },
    pages: {
        main: {
            buttons: [
                { label: "Start Game", action: { type: 0, value: "start" }, pos: { x: "center", y: 150 } },
                { label: "Settings", action: { type: 1, value: "settings" }, pos: { x: "center", y: 200 } }
            ]
        },
        settings: {
            buttons: [
                { label: "Back", action: { type: 1, value: "main" }, pos: { x: "center", y: 400 } }
            ]
        }
    }
};

export let pauseMenu = {
    global: {
        background: "#aaa5"
    },
    pages: {
        main: {
            buttons: [
                { label: "Resume Game", action: { type: 0, value: "resume" }, pos: { x: "center", y: 150 } },
                { label: "Settings", action: { type: 1, value: "settings" }, pos: { x: "center", y: 200 } },
                { label: "Exit Game", action: { type: 0, value: "exit" }, pos: { x: "center", y: 250 } }
            ],
            particleFountains: []
        },
        settings: {
            buttons: [
                { label: "Back", action: { type: 1, value: "main" }, pos: { x: "center", y: 400 } }
            ],
            particleFountains: []
        }
    }
};