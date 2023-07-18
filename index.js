const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//sets the canvas size
canvas.width = innerWidth
canvas.height = innerWidth

//sets the limit
class Boundary {
  static width = 40
  static height = 40
  constructor({ position }) {
    this.position = position
    this.width = 40
    this.height = 40
  }

  //draw a filled rectangle on the canvas
  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

class Player {
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }
  
}

const map = [
  ['-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', '-', '-', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-']
]
const boundaries = []

const player = new Player({
  position: {
    x: Boundary.width+ Boundary.width/2,
    y: Boundary.height + Boundary.height/2
  },
  
})

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
            }
          })
        )
        break
    }
  })
})


boundaries.forEach(boundary => {
  boundary.draw();
});

player.draw()



//34:28