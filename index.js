// creating canvas functionality
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// setting canvas properties
canvas.width = 1024
canvas.height = 576

// rect API
c.fillRect(0, 0, canvas.width, canvas.height)
// gravity variable 
// speed @ which sprite descends on Y-axis
const gravity = 0.7
// sprite constructor/ OOP 
class Sprite {
    constructor({ position, velocity, color = `red` }) {
        this.position = position
        this.velocity = velocity
        // sprite height property
        this.height = 150
        // sprite width property
        this.width = 50
        // enemy lastKey functionality aka Player Two
        this.lastKey
        // Sprite attack box
        // Hit points
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color


    }
    // Sprite Rect
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        // attack box Rect
        c.fillStyle = 'green'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
    // fall / animation loop for player/enemy
    updater() {
        this.draw()
        // animation loop
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        // canvas block for player extending beyond canvas height
        // prevention for player going beyonde the canvas width
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else this.velocity.y += gravity
        // Gravity variable that brings the sprite down to where it is sitting adjacent to the x-axis of the canvas⬆️
        // attack mechanics . Sword retraction

    };

};

// new player creation
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: `white`
})

player.draw()
// new enemy creation
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 1
    },
    color: `blue`
})

enemy.draw()
// animation function
// Key functionality a,d,w,Up,Down,Left,Right
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

// let lastKey
function animate() {
    window.requestAnimationFrame(animate)
    // loop test
    // refactor fill color for rect differentiate between first fillStyle argument
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.updater()
    enemy.updater()
    // sets default value. Allows the player to be stationary character x-axis position
    player.velocity.x = 0
    enemy.velocity.x = 0
    // key functionality
    // first instance : player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    }

}

// second instance : enemy movement
if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
}


animate()

// event listeners for player and enemy 
// keyup and keydown functionality for mobility
// sets condition of key activity based on true || false statements
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            // jump height of player
            player.velocity.y = -15
            // player.lastKey = 'w'
            break
        // arrow key functionality ifor Player Two/Enemy.
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            // Jump height of enemy
            enemy.velocity.y = -15

            break
    }
    console.log(event.key)
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'w':
            keys.w.pressed = false
            lastKey = 'w'
            break

        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            enemy.lastKey = 'ArrowUp'
            break
    }
    console.log(event.key)
})
