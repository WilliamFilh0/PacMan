const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//sets the canvas size
canvas.width = innerWidth
canvas.height = innerWidth

//sets the limit
class Boundary {
  static width = 40
  static height = 40
  constructor({ position, image }) {
    this.position = position
    this.width = 40
    this.height = 40
    this.image = image
  }

  //draw a filled rectangle on the canvas
  draw() {
    /* 
   c.fillStyle = 'blue'
   c.fillRect(this.position.x, this.position.y, this.width, this.height)
   */

    c.drawImage(this.image, this.position.x, this.position.y)
  }

}

//the player object in the game
class Player {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }
  //draw a yellow circle
  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'yellow'
    c.fill()
    c.closePath()
  }

  //is responsible for updating the player's state every frame of game rendering
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

//A propriedade "ultimaTecla" é usada para evitar mudanças bruscas na direção do jogador se várias teclas forem pressionadas simultaneamente.
let lastKey = ''

//array representing the game map
//'-' represents a limit
const map = [
  ['1', '-', '-', '-', '-', '-', '2'],
  ['|', ' ', ' ', ' ', ' ', ' ', '|'],
  ['|', ' ', 'b', ' ', 'b', ' ', '|'],
  ['|', ' ', ' ', ' ', ' ', ' ', '|'],
  ['|', ' ', 'b', ' ', 'b', ' ', '|'],
  ['|', ' ', ' ', ' ', ' ', ' ', '|'],
  ['4', '-', '-', '-', '-', '-', '3'],
]

function createImage(src) {
  const image = new Image();
  image.src = src
  return image
}

//An empty array called boundaries is created to store instances of the Boundary class.
const boundaries = []

const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
})

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
}

/*The code iterates over the map using the forEach methods 
to traverse each line and each symbol in a line. In case of finding the '-' symbol,
a new instance of the Boundary class is created with the position calculated 
from the row and column index*/
map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    console.log(symbol)
    switch (symbol) {
      case '-':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeHorizontal.png')
          })
        )
        break

      case '|':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeVertical.png')
          })
        )
        break

      case '1':
        boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image: createImage('./img/pipeCorner1.png')
          })
        )
        break

     
    }
  })
})

//funçâo de colisão reaproveitada
function circleCollidesWithRectangle({ circle, rectangle
}) {
  return (
    circle.position.y - circle.radius + circle.velocity.y
    <= rectangle.position.y + rectangle.height &&
    circle.position.x + circle.radius + circle.velocity.x
    >= rectangle.position.x &&
    circle.position.y + circle.radius + circle.velocity.y
    >= rectangle.position.y &&
    circle.position.x - circle.radius + circle.velocity.x
    <=
    rectangle.position.x + rectangle.width
  )

}

////serves to traverse the array boundaries and call the draw method for each boundary object within the array.
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  if (keys.w.pressed && lastKey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: -5
            }
          },
          rectangle: boundary
        })
      ) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = -5
      }
    }

  } else if (keys.a.pressed && lastKey === 'a') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: -5,
              y: 0
            }
          },
          rectangle: boundary
        })
      ) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = -5
      }
    }

  } else if (keys.s.pressed && lastKey === 's') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 0,
              y: 5
            }
          },
          rectangle: boundary
        })
      ) {
        player.velocity.y = 0
        break
      } else {
        player.velocity.y = 5
      }
    }

  } else if (keys.d.pressed && lastKey === 'd') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        circleCollidesWithRectangle({
          circle: {
            ...player,
            velocity: {
              x: 5,
              y: 0
            }
          },
          rectangle: boundary
        })
      ) {
        player.velocity.x = 0
        break
      } else {
        player.velocity.x = 5
      }
    }
  }

  boundaries.forEach(boundary => {
    boundary.draw()

    //função quando ele colide
    if (
      circleCollidesWithRectangle({
        circle: player,
        rectangle: boundary
      })
    ) {
      console.log('we are colliding')
      player.velocity.x = 0
      player.velocity.y = 0
    }

  })


  player.update()

}

animate()



window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true
      lastKey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastKey = 'a'
      break
    case 's':
      keys.s.pressed = true
      lastKey = 's'
      break
    case 'd':
      keys.d.pressed = true
      lastKey = 'd'
      break
  }

  console.log(keys.d.pressed)
  console.log(keys.s.pressed)
})

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
  }

  console.log(keys.d.pressed)
  console.log(keys.s.pressed)
})


//1:27:00