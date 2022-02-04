// RAIN
export let rainData = {
    type: "fountain",
    pre: {
        amount: 1,
        chance: 0.2,
        spawnsLeft: -1,
        startAmount: 0
    },
    spawn: {
        size: {
            min: 15,
            max: 20
        },
        pos: {
            x: {
                min: 100,
                max: 400
            },
            y: {
                min: 75,
                max: 150
            }
        },
        life: {
            min: 1000,
            max: 1000
        },
        velocity: {
            x: 0.5,
            y: 2.5
        },
        color: {
            start: "rgb(37, 124, 255)",
            end: "rgb(0, 23, 126)",
            speed: 0.001
        },
        blur: 0
    },
    active: {
        size: {
            min: -0.1,
            max: -0.05
        },
        pos: {
            x: {
                min: -0.5,
                max: 0.5
            },
            y: 0
        },
        velocity: {
            x: {
                min: -0.02,
                max: 0.02
            },
            y: {
                min: 0,
                max: 0.05
            }
        },
        blur: 0
    }
};

// FIRE
export let fireData = {
    type: "fountain",
    pre: {
        amount: 1,
        chance: 0.5,
        spawnsLeft: -1,
        startAmount: 0
    },
    spawn: {
        size: {
            min: 12,
            max: 18
        },
        pos: {
            x: {
                min: 900,
                max: 910
            },
            y: 600
        },
        life: {
            min: 100,
            max: 200
        },
        velocity: {
            x: 0,
            y: {
                min: -3,
                max: -2.8
            }
        },
        color: {
            start: "rgb(255, 232, 27)",
            end: "rgb(185, 53, 0)",
            speed: {
                min: 0.005,
                max: 0.01
            }
        },
        blur: 0
    },
    active: {
        size: {
            min: -0.2,
            max: -0.1
        },
        pos: {
            x: {
                min: -0.5,
                max: 0.5
            },
            y: 0
        },
        velocity: {
            x: 0,
            y: {
                min: 0,
                max: 0
            }
        },
        blur: 0
    }
};

// Cloud
export let cloudData = {
    type: "fountain",
    pre: {
        amount: 1,
        chance: 0.06,
        spawnsLeft: -1,
        startAmount: 0
    },
    spawn: {
        size: 30,
        pos: {
            x: {
                min: 100,
                max: 400
            },
            y: {
                min: 0,
                max: 150
            }
        },
        life: {
            min: 1000,
            max: 1000
        },
        velocity: {
            x: 0,
            y: 0
        },
        color: {
            start: "rgb(157, 126, 126)",
            end: "rgb(59, 20, 73)",
            speed: 0.005
        },
        blur: 0
    },
    active: {
        size: {
            min: -0.05,
            max: 0
        },
        pos: {
            x: {
                min: -0.4,
                max: 0.4
            },
            y: {
                min: -0.1,
                max: 0.1
            }
        },
        velocity: {
            x: 0,
            y: 0
        },
        blur: 0
    }
};

// Arch
export let archData = {
    type: "fountain",
    pre: {
        amount: 1,
        chance: 1,
        spawnsLeft: -1,
        startAmount: 0
    },
    spawn: {
        size: 20,
        pos: {
            x: 0,
            y: 600
        },
        life: {
            min: 150,
            max: 220
        },
        velocity: {
            x: {
                min: 3.5,
                max: 4.5
            },
            y: {
                min: -5.5,
                max: -4.5
            }
        },
        color: {
            start: "rgb(255, 70, 156)",
            end: "rgb(200, 200, 73)",
            speed: 0.005
        },
        blur: 0
    },
    active: {
        size: {
            min: -0.2,
            max: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0.05
        },
        blur: 0
    }
};

// EXPLOSION
export let explosionData = {
    type: "fountain",
    pre: {
        count: 25
    },
    fountain: {
        val: {
            spawnsLeft: 0
        }
    },
    particle: {
        val: {
            size: {
                min: 10,
                max: 15
            },
            pos: {
                x: 500,
                y: 550
            },
            life: {
                min: 30,
                max: 50
            },
            angle: {
                min: 0,
                max: 360
            },
            speed: {
                min: 0.2,
                max: 7
            },
            color: [
                {
                    start: "rgb(255, 220, 60)",
                    end: "rgb(75, 255, 160)",
                    speed: {
                        min: 0.03,
                        max: 0.06
                    }
                },
                {
                    start: "rgb(200, 10, 100)",
                    end: "rgb(255, 160, 250)",
                    speed: {
                        min: 0.03,
                        max: 0.06
                    }
                }
            ]
        },
        con: {
            size: -0.4,
            velocity: {
                x: 0,
                y: 0.05
            }
        }
    }
}

// FIREWORKS TRAIL
export let fireworkTrailData = {
    type: "particle",
    // Things that get read only once
    // At the very start when the particle/or/fountain is created
    pre: {
        // How many particles we start with
        count: 0
    },
    // This is the information about the fountain, before it gets spawned
    // Includes the information about the rate at which the particles get spawned
    fountain: {
        // Things that get read every time we are about to spawn a new particle
        con: {
            // The chance tha the particle would indeed get spawned
            chance: 1,
            // How many particles get spawned each time we get through the chance
            count: 1
        },
        // These variables get assigned to the fountain at the start of its life
        // Those values can be changed by the fountain itself
        val: {
            // How many more times can this fountain spawn a new particle
            spawnsLeft: 0
        }
    },
    // Shit that the particle needs to know about its own existance
    particle: {
        // Variables that get assigned to the particle at the start of its life
        val: {
            size: 5,
            life: {
                min: 10,
                max: 60,
            },
            pos: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: [
                {
                    start: "rgb(255, 230, 50, 1)",
                    end: "rgb(20, 170, 0, 0)",
                    speed: 0.02
                },
                {
                    start: "rgb(100, 160, 50, 1)",
                    end: "rgb(20, 170, 0, 0)",
                    speed: 0.02
                }
            ],
            blur: 0
        },
        // Variables used to change the variables that were assigned to the particle at the start
        con: {
            size: 0,
            pos: {
                x: {
                    min: -0.5,
                    max: 0.5
                },
                y: {
                    min: -0.5,
                    max: 0.5
                }
            },
            velocity: {
                x: 0,
                y: 0.02
            },
            blur: 0
        }
    }
};

// FIREWORKS
export let fireworksData = {
    type: "fountain",
    fountain: {
        con: {
            chance: 0.02
        }
    },
    particle: {
        val: {
            size: 10,
            life: {
                min: 70,
                max: 90
            },
            pos: {
                x: {
                    min: 100,
                    max: 150
                },
                y: 600
            },
            speed: {
                min: 8,
                max: 10
            },
            angle: {
                min: Math.PI + Math.PI / 2 - Math.PI / 16,
                max: Math.PI + Math.PI / 2 + Math.PI / 16
            },
            color: [
                {
                    start: "rgb(190, 80, 30, 0)",
                    end: "rgb(220, 180, 40, 0)",
                    speed: 0
                }
            ]
        },
        con: {
            velocity: {
                y: 0.1
            }
        },
        newData: {
            death: explosionData,
            trail: fireworkTrailData
        }
    }
};